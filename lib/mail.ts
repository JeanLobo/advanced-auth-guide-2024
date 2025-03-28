import PasswordResetEmail from "@/emails/password-reset";
import TwoFactorEmail from "@/emails/two-factor";
import VerificationEmail from "@/emails/verification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string, name: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Gestão Simples <onboarding@resend.dev>",
      to: email,
      subject: "[Gestão Simples] Por favor, verifique seu email",
      react: VerificationEmail({ confirmLink: confirmLink, name: name })
    });
    
    if (error) {
      console.error("Erro ao enviar email de verificação:", error);
      return { error };
    }
    
    console.log("Email de verificação enviado com sucesso:", data);
    return { data };
  } catch (error) {
    console.error("Exceção ao enviar email de verificação:", error);
    return { error };
  }
}

export const sendPasswordResetEmail = async (email: string, token: string, name: string) => {
  const resetPasswordLink = `${domain}/auth/new-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Gestão Simples <onboarding@resend.dev>",
      to: email,
      subject: "[Gestão Simples] Redefinição de senha",
      react: PasswordResetEmail({ resetPasswordLink: resetPasswordLink, name: name })
    });
    
    if (error) {
      console.error("Erro ao enviar email de redefinição de senha:", error);
      return { error };
    }
    
    return { data };
  } catch (error) {
    console.error("Exceção ao enviar email de redefinição de senha:", error);
    return { error };
  }
}

export const sendTwoFactorTokenEmail = async (email: string, token: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Gestão Simples <onboarding@resend.dev>",
      to: email,
      subject: "[Gestão Simples] Verificação de tentativa de login",
      react: TwoFactorEmail({ token, name })
    });
    
    if (error) {
      console.error("Erro ao enviar email de código 2FA:", error);
      return { error };
    }
    
    return { data };
  } catch (error) {
    console.error("Exceção ao enviar email de código 2FA:", error);
    return { error };
  }
}