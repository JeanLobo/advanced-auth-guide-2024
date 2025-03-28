"use client";

import { useEffect, useState } from "react";
import { MainHeader } from "@/components/layout/main-header";
import { CompanyDrawer } from "@/components/company/company-drawer";
import { useCompanyStore } from "@/store/use-company-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getUserCompaniesAction } from "@/actions/company";

export const MainLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const user = useCurrentUser();
  const { setAvailableCompanies } = useCompanyStore();
  const [isLoading, setIsLoading] = useState(true);
  
  // Carrega as empresas disponíveis para o usuário ao montar o componente
  useEffect(() => {
    const loadCompanies = async () => {
      if (user && user.id) {
        try {
          setIsLoading(true);
          // Buscar as empresas do banco de dados com server action
          const companies = await getUserCompaniesAction();
          setAvailableCompanies(companies);
        } catch (error) {
          console.error("Erro ao carregar empresas:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadCompanies();
  }, [user, setAvailableCompanies]);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <MainHeader />
      <CompanyDrawer />
      <main className="flex-1 p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}; 