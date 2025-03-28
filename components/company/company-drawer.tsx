"use client";

import { useEffect } from "react";
import { UserCompany } from "@/types";
import { useCompanyStore } from "@/store/use-company-store";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar } from "@/components/ui/avatar";
import { Building } from "lucide-react";

export const CompanyDrawer = () => {
  const {
    isCompanyDrawerOpen,
    closeCompanyDrawer,
    availableCompanies,
    setSelectedCompany,
    selectedCompanyId,
  } = useCompanyStore();

  // Fechamos o drawer quando não há companies disponíveis
  useEffect(() => {
    if (availableCompanies.length === 0 && isCompanyDrawerOpen) {
      closeCompanyDrawer();
      toast.info("Você não tem acesso a nenhuma empresa.", {
        description: "Entre em contato com o administrador do sistema."
      });
    }
  }, [availableCompanies, isCompanyDrawerOpen, closeCompanyDrawer]);

  // Se houver apenas uma company, selecionamos automaticamente
  useEffect(() => {
    if (availableCompanies.length === 1 && !selectedCompanyId) {
      const company = availableCompanies[0];
      setSelectedCompany(company.companyId, company.tenantId);
      toast.success(`Você foi conectado à ${company.company.name}`);
    }
  }, [availableCompanies, selectedCompanyId, setSelectedCompany]);

  return (
    <Sheet open={isCompanyDrawerOpen} onOpenChange={(open) => {
      // Só permitimos fechar o drawer se houver uma company selecionada
      if (!open && !selectedCompanyId && availableCompanies.length > 0) {
        return;
      }
      closeCompanyDrawer();
    }}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Selecione uma empresa</SheetTitle>
          <SheetDescription>
            Escolha uma empresa para acessar o sistema
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {availableCompanies.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p>Você não tem acesso a nenhuma empresa.</p>
              <p className="text-sm mt-2">Entre em contato com o administrador do sistema.</p>
            </div>
          ) : (
            availableCompanies.map((userCompany) => (
              <CompanyItem
                key={userCompany.companyId}
                userCompany={userCompany}
                isSelected={userCompany.companyId === selectedCompanyId}
                onSelect={() => {
                  setSelectedCompany(userCompany.companyId, userCompany.tenantId);
                  toast.success(`Empresa ${userCompany.company.name} selecionada`);
                }}
              />
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface CompanyItemProps {
  userCompany: UserCompany;
  isSelected: boolean;
  onSelect: () => void;
}

const CompanyItem = ({ userCompany, isSelected, onSelect }: CompanyItemProps) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "bg-primary/10 border border-primary/30"
          : "hover:bg-muted"
      }`}
    >
      <Avatar className="h-12 w-12">
        {userCompany.company.logo ? (
          <img
            src={userCompany.company.logo}
            alt={userCompany.company.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
            <Building className="h-6 w-6" />
          </div>
        )}
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{userCompany.company.name}</p>
        <p className="text-xs text-muted-foreground">
          {userCompany.role === "ADMIN"
            ? "Administrador"
            : userCompany.role === "MANAGER"
            ? "Gerente"
            : "Usuário"}
        </p>
      </div>
      {isSelected && (
        <div className="h-3 w-3 rounded-full bg-primary mr-2" />
      )}
    </div>
  );
}; 