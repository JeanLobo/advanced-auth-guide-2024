"use server";

import { db } from "@/lib/db";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" }
  }

  const {
    email,
    password,
    name: userName,
    name: companyName,
    legal_name,
    registration_type,
    registration_number,
    tax_regime,
    state_registration,
    municipal_registration,
    suframa_registration,
    address_street,
    address_number,
    address_complement,
    address_neighborhood,
    address_city,
    address_state,
    address_zip_code,
    tenantName,
    active
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email já está em uso" };
  }

  try {
    // Use a transaction to ensure all operations succeed or fail together
    await db.$transaction(async (tx) => {
      // 1. Create tenant
      const tenant = await tx.tenant.create({
        data: {
          name: tenantName,
        }
      });

      // 2. Create company
      const company = await tx.company.create({
        data: {
          name: companyName,
          legal_name,
          registration_type,
          registration_number,
          state_registration,
          municipal_registration,
          suframa_registration,
          tax_regime,
          address_street,
          address_number,
          address_complement,
          address_neighborhood,
          address_city,
          address_state,
          address_zip_code,
          active,
          tenantId: tenant.id,
        }
      });

      // 3. Create user
      const user = await tx.user.create({
        data: {
          name: userName,
          email,
          password: hashedPassword,
          role: "ADMIN", // First user is admin by default
        }
      });

      // 4. Link user to tenant with admin role
      await tx.userTenant.create({
        data: {
          userId: user.id,
          tenantId: tenant.id,
          role: "ADMIN",
        }
      });

      // 5. Link user to company with admin role
      await tx.userCompany.create({
        data: {
          userId: user.id,
          companyId: company.id,
          role: "ADMIN",
        }
      });
    });

    // Generate verification token
    const verificationToken = await generateVerificationToken(email);

    // Send verification email
    const emailResult = await sendVerificationEmail(
      verificationToken.email, 
      verificationToken.token, 
      userName
    );

    if (emailResult?.error) {
      console.error("Erro ao enviar email de verificação:", emailResult.error);
      return { 
        success: "Conta criada! Houve um problema ao enviar o email de confirmação. Entre em contato com o suporte."
      };
    }

    return { success: "Conta criada! Email de confirmação enviado!" };
  } catch (error) {
    console.error("Erro no registro:", error);
    return { error: "Falha ao criar conta. Por favor, tente novamente." };
  }
}