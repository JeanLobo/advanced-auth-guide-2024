"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Social } from "./social";

interface LoginFormProps {
  hideSocial?: boolean;
}

export const LoginForm = ({ hideSocial = false }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email já está em uso com outro provedor!"
    : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const values = form.getValues();
    console.log("Iniciando login direto com:", values);
    
    setError("");
    setSuccess("");
    setIsLoggingIn(true);
    
    startTransition(() => {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        redirect: true,
      })
      .catch(error => {
        console.error("Erro no login:", error);
        setError("Credenciais inválidas ou erro no servidor");
        setIsLoggingIn(false);
      });
      
      // Timeout para garantir que o estado de carregamento permaneça 
      // visível por tempo suficiente para o usuário perceber
      setTimeout(() => {
        // Este código só executa se o redirecionamento não ocorrer
        setIsLoggingIn(false);
      }, 5000);
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Bem-vindo de volta
        </h1>
        <p className="text-sm text-muted-foreground">
          Entre com suas credenciais para acessar sua conta
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="jsilva@exemplo.com"
                      type="email"
                      disabled={isPending || isLoggingIn}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Senha</FormLabel>
                    <Button 
                      size="sm" 
                      variant="link" 
                      asChild
                      className="px-0 font-normal text-xs sm:text-sm"
                    >
                      <Link href="/auth/reset">
                        Esqueceu a senha?
                      </Link>
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending || isLoggingIn}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button 
            type="submit" 
            disabled={isPending || isLoggingIn} 
            className="w-full"
          >
            {isPending || isLoggingIn ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Fazendo login...
              </>
            ) : "Login"}
          </Button>
        </form>
      </Form>

      {!hideSocial && (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>
          <Social />
        </div>
      )}

      <div className="text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="/auth/register" className="text-primary hover:underline">
          Criar conta
        </Link>
      </div>
      
      <div className="text-center text-xs text-muted-foreground mt-4">
        Ao fazer login, você concorda com nossos{" "}
        <Link href="/termos-de-servico" className="text-primary hover:underline">
          Termos de Serviço
        </Link>{" "}
        e{" "}
        <Link href="/politica-de-privacidade" className="text-primary hover:underline">
          Política de Privacidade
        </Link>.
      </div>
    </div>
  );
};
