"use client";

import { useEffect } from "react";
import { useCompanyStore } from "@/store/use-company-store";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Building, Briefcase } from "lucide-react";

export default function ProtectedHomePage() {
  const { selectedCompanyId, availableCompanies, openCompanyDrawer } = useCompanyStore();

  // Se houver company selecionada, vai para o dashboard
  useEffect(() => {
    if (selectedCompanyId) {
      redirect("/dashboard");
    }
  }, [selectedCompanyId]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Building className="h-10 w-10 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold">Bem-vindo ao Gestão Simples</h1>
        
        <p className="text-muted-foreground">
          {availableCompanies.length > 0 
            ? "Selecione uma empresa para começar a usar o sistema."
            : "Você não tem acesso a nenhuma empresa. Entre em contato com o administrador do sistema."}
        </p>
        
        {availableCompanies.length > 0 && (
          <Button 
            onClick={openCompanyDrawer}
            className="mt-6"
            size="lg"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            Selecionar Empresa
          </Button>
        )}
      </div>
    </div>
  );
} 