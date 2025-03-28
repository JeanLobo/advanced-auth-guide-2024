"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Building, User, CheckCircle, Loader2, ChevronLeft, ChevronRight, MailCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  RegisterSchema,
  RegisterStep1Schema,
  RegisterStep2Schema
} from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  // Formulário principal que contém todos os campos
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      // Usuário
      email: "",
      password: "",
      name: "",
      
      // Identificação da empresa
      tenantName: "",
      registration_type: "CNPJ",
      registration_number: "",
      
      // Dados da empresa
      legal_name: "",
      state_registration: "",
      municipal_registration: "",
      suframa_registration: "",
      tax_regime: "Simples Nacional",
      
      // Endereço
      address_street: "",
      address_number: "",
      address_complement: "",
      address_neighborhood: "",
      address_city: "",
      address_state: "",
      address_zip_code: "",
      
      active: true
    }
  });

  // Verifica o estado do formulário atual
  const currentStepValid = () => {
    if (step === 1) {
      const step1Data = {
        name: form.getValues("name"),
        email: form.getValues("email"),
        password: form.getValues("password"),
        registration_number: form.getValues("registration_number")
      };
      
      return RegisterStep1Schema.safeParse(step1Data).success;
    } else {
      const step2Data = {
        name: form.getValues("tenantName"), // Nome fantasia
        legal_name: form.getValues("legal_name"),
        tax_regime: form.getValues("tax_regime"),
        address_street: form.getValues("address_street"),
        address_number: form.getValues("address_number"),
        address_complement: form.getValues("address_complement"),
        address_neighborhood: form.getValues("address_neighborhood"),
        address_city: form.getValues("address_city"),
        address_state: form.getValues("address_state"),
        address_zip_code: form.getValues("address_zip_code")
      };
      
      return RegisterStep2Schema.safeParse(step2Data).success;
    }
  };

  // Avança para o próximo passo
  const nextStep = async () => {
    let isValid = true;
    
    // Validar os campos do passo 1
    if (step === 1) {
      // Validar campos do primeiro passo
      isValid = await form.trigger("name") && 
                await form.trigger("email") && 
                await form.trigger("password") && 
                await form.trigger("registration_number");
    } else {
      // Validar campos do segundo passo
      isValid = await form.trigger("tenantName") && 
                await form.trigger("legal_name") && 
                await form.trigger("address_zip_code") && 
                await form.trigger("address_street") && 
                await form.trigger("address_number") &&
                await form.trigger("address_neighborhood") && 
                await form.trigger("address_city") && 
                await form.trigger("address_state");
    }

    if (isValid) {
      if (step === 1) {
        // Ao avançar para o passo 2, sugerimos um nome fantasia com base no CNPJ
        // Aqui você pode fazer uma chamada para buscar dados do CNPJ se desejar
        const userFullName = form.getValues("name");
        
        // Se o campo estiver vazio, sugerimos o nome do usuário como base
        if (!form.getValues("tenantName")) {
          form.setValue("tenantName", "Empresa de " + userFullName);
        }
        
        setStep(2);
      } else if (step === 2) {
        onSubmit(form.getValues());
      }
    }
  };

  const prevStep = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            return;
          }
          
          // Guardar o email para o passo de confirmação
          setRegisteredEmail(values.email);
          setSuccess(data.success);
          setStep(3);
        });
    });
  };

  // Formatar CNPJ enquanto digita
  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  // Formatar CEP enquanto digita
  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    })
  };
  
  const [slideDirection, setSlideDirection] = useState(0);

  const goToNextStep = () => {
    setSlideDirection(1);
    nextStep();
  };

  const goToPrevStep = () => {
    setSlideDirection(-1);
    prevStep();
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Criar sua conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Cadastre-se para acessar todas as ferramentas
        </p>
      </div>

      {/* Indicador de progresso */}
      <div className="mb-8 flex justify-between">
        <div className="flex flex-col items-center">
          <div className={cn(
            "h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center border-2",
            step >= 1 ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-muted-foreground/30"
          )}>
            <User className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          <span className="mt-1 text-[10px] sm:text-xs">Seus dados</span>
        </div>
        
        <div className="flex-1 mx-1 sm:mx-2 mt-4">
          <div className={cn(
            "h-1 w-full rounded",
            step > 1 ? "bg-primary" : "bg-muted"
          )} />
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            "h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center border-2",
            step >= 2 ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-muted-foreground/30"
          )}>
            <Building className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          <span className="mt-1 text-[10px] sm:text-xs">Empresa</span>
        </div>

        <div className="flex-1 mx-1 sm:mx-2 mt-4">
          <div className={cn(
            "h-1 w-full rounded",
            step > 2 ? "bg-primary" : "bg-muted"
          )} />
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            "h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center border-2",
            step >= 3 ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-muted-foreground/30"
          )}>
            <MailCheck className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
          <span className="mt-1 text-[10px] sm:text-xs">Confirmação</span>
        </div>
      </div>
      
      <Form {...form}>
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={step}
            custom={slideDirection}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
              {/* Passo 1: Dados do usuário */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Usuário</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="João Silva"
                              autoComplete="name"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="joao.silva@exemplo.com" 
                              type="email"
                              autoComplete="email"
                              disabled={isPending}
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
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="******" 
                              type="password"
                              autoComplete="new-password"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="registration_number"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>CNPJ da Empresa</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              onChange={(e) => {
                                onChange(formatCNPJ(e.target.value));
                              }}
                              placeholder="00.000.000/0001-00"
                              maxLength={18}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              {/* Passo 2: Dados da empresa */}
              {step === 2 && (
                <div className="space-y-4">
                  <Card className="bg-muted/30 border-0">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Dados da Empresa</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="tenantName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Fantasia</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Empresa XYZ"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="legal_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Razão Social</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Empresa XYZ Ltda"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="tax_regime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Regime Tributário</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={isPending}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o regime tributário" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Simples Nacional">Simples Nacional</SelectItem>
                                <SelectItem value="Lucro Presumido">Lucro Presumido</SelectItem>
                                <SelectItem value="Lucro Real">Lucro Real</SelectItem>
                                <SelectItem value="MEI">MEI</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/30 border-0">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base">Endereço</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <FormField
                        control={form.control}
                        name="address_zip_code"
                        render={({ field: { onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                onChange={(e) => {
                                  onChange(formatCEP(e.target.value));
                                }}
                                placeholder="00000-000"
                                maxLength={9}
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <FormField
                            control={form.control}
                            name="address_street"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Rua</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="Rua das Flores"
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="address_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="123"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="address_complement"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Complemento</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Sala 101"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address_neighborhood"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bairro</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="Centro"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name="address_city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="São Paulo"
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="address_state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                disabled={isPending}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="UF" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", 
                                    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", 
                                    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map((state) => (
                                    <SelectItem key={state} value={state}>{state}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Passo 3: Confirmação de cadastro */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <div className="rounded-full bg-primary/10 p-6 mb-2">
                      <MailCheck className="h-12 w-12 text-primary" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Cadastro realizado com sucesso!</h3>
                      <p className="text-muted-foreground">
                        Enviamos um email de confirmação para 
                        <span className="font-medium text-foreground"> {registeredEmail}</span>
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm text-muted-foreground space-y-3 max-w-md">
                      <p className="leading-relaxed">
                        Para completar seu cadastro, por favor acesse o link enviado
                        para seu email. O email pode levar alguns minutos para chegar.
                      </p>
                      <p className="leading-relaxed">
                        Confira também sua pasta de <strong>spam</strong> ou <strong>lixo eletrônico</strong> caso não encontre o email na caixa de entrada.
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full max-w-xs">
                      <Button 
                        variant="default" 
                        className="w-full"
                        asChild
                      >
                        <Link href="/auth/login">
                          Ir para o login
                        </Link>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          form.reset();
                          setStep(1);
                        }}
                      >
                        Cadastrar nova conta
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              <FormError message={error} />
              {step !== 3 && <FormSuccess message={success} />}
              
              <div className="flex flex-col gap-2">
                {step === 2 && (
                  <div className="text-xs text-muted-foreground mb-4">
                    Ao criar sua conta, você concorda com nossos{" "}
                    <Link href="/termos-de-servico" className="text-primary hover:underline">
                      Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link href="/politica-de-privacidade" className="text-primary hover:underline">
                      Política de Privacidade
                    </Link>, incluindo o processamento de seus dados conforme nossa política.
                  </div>
                )}
                
                <div className="flex justify-between gap-2">
                  {step === 2 && (
                    <Button
                      type="button"
                      onClick={goToPrevStep}
                      variant="outline"
                      disabled={isPending}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Voltar
                    </Button>
                  )}
                  
                  {step === 1 && (
                    <Button
                      type="submit"
                      className="ml-auto"
                      disabled={isPending}
                    >
                      Próximo
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                  
                  {step === 2 && (
                    <Button
                      type="submit"
                      className="ml-auto"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          Criar conta
                          <CheckCircle className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </Form>

      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Faça login
        </Link>
      </div>
    </div>
  );
};