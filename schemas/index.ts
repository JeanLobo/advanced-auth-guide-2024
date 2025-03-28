import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string().min(1)),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(1, {
        message: "A senha atual é necessária para redefinir a senha",
      })
    ),
    newPassword: z.optional(
      z
        .string()
        .min(8, {
          message: "A senha deve ter pelo menos 8 caracteres",
        })
        .regex(
          new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,32}"),
          {
            message:
              "A senha deve conter uma letra maiúscula, uma letra minúscula, um número e um dos seguintes caracteres: * . ! @ $ % &",
          }
        )
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "A nova senha é obrigatória!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "A senha atual é obrigatória!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres",
    })
    .regex(
      new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,32}"),
      {
        message:
          "A senha deve conter uma letra maiúscula, uma letra minúscula, um número e um dos seguintes caracteres: * . ! @ $ % &",
      }
    ),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatório",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatório",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatória",
  }),
  code: z.optional(
    z
      .string()
      .min(1, { message: "Código é obrigatório" })
      .max(6, { message: "Código não pode ter mais de seis caracteres" })
  ),
});

// Schema para a etapa 1 do registro (dados do usuário e CNPJ)
export const RegisterStep1Schema = z.object({
  email: z.string().email({
    message: "Email é obrigatório",
  }),
  password: z
    .string()
    .min(8, {
      message: "A senha deve ter pelo menos 8 caracteres",
    })
    .regex(
      new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,32}"),
      {
        message:
          "A senha deve conter uma letra maiúscula, uma letra minúscula, um número e um dos seguintes caracteres: * . ! @ $ % &",
      }
    ),
  name: z.string().min(1, {
    message: "Nome é obrigatório",
  }),
  registration_number: z.string().min(14, {
    message: "CNPJ deve ter pelo menos 14 dígitos",
  }).max(18, {
    message: "CNPJ não pode ter mais de 18 caracteres",
  }),
});

// Schema para a etapa 2 do registro (dados da empresa)
export const RegisterStep2Schema = z.object({
  name: z.string().min(1, {
    message: "Nome Fantasia é obrigatório",
  }),
  legal_name: z.string().min(1, {
    message: "Razão Social é obrigatória",
  }),
  tax_regime: z.string().optional(),
  address_street: z.string().min(1, {
    message: "Rua é obrigatória",
  }),
  address_number: z.string().min(1, {
    message: "Número é obrigatório",
  }),
  address_complement: z.string().optional(),
  address_neighborhood: z.string().min(1, {
    message: "Bairro é obrigatório",
  }),
  address_city: z.string().min(1, {
    message: "Cidade é obrigatória",
  }),
  address_state: z.string().length(2, {
    message: "Estado deve ter 2 caracteres",
  }),
  address_zip_code: z.string().min(8, {
    message: "CEP deve ter pelo menos 8 dígitos",
  }).max(9, {
    message: "CEP não pode ter mais de 9 caracteres",
  }),
});

// Schema completo para o registro
export const RegisterSchema = RegisterStep1Schema.merge(RegisterStep2Schema).extend({
  tenantName: z.string().min(1, {
    message: "Nome da organização é obrigatório",
  }),
  registration_type: z.string().default("CNPJ"),
  state_registration: z.string().optional(),
  municipal_registration: z.string().optional(),
  suframa_registration: z.string().optional(),
  active: z.boolean().default(true),
});
