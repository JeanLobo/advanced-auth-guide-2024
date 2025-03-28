"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  console.log("[SERVER] Início do processo de login", { email: values.email, callbackUrl });
  
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("[SERVER] Falha na validação dos campos", validatedFields.error);
    return { error: "Campos inválidos!" }
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  console.log("[SERVER] Usuário encontrado?", !!existingUser);

  if (!existingUser || !existingUser.email) {
    return { error: "Credenciais inválidas!" }
  }

  if (!existingUser.password) {
    return { error: "Faça login com um provedor OAuth." }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token, existingUser.name!);

    return { success: "Email de confirmação enviado!" }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    console.log("[SERVER] Autenticação de dois fatores ativada");
    if (code) {
      // Verify code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Código inválido!" }
      }

      if (twoFactorToken.token !== code) {
        return { error: "Código inválido!" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Código expirado!" }
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token, existingUser.name!);
      return { twoFactor: true };
    }
  }

  try {
    console.log("[SERVER] Autenticação validada, retornando sucesso para cliente iniciar login");
    
    // Não tentamos mais fazer o login no server side
    // Retornamos dados para o cliente fazer o login
    return { 
      success: "Credenciais validadas!",
      redirectUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      credentials: {
        email,
      }
    };
  } catch (error) {
    console.log("[SERVER] Erro na autenticação:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": 
          return { error: "Credenciais inválidas!" }
        default: 
          return { error: "Algo deu errado!" }
      }
    }

    throw error;
  }
}