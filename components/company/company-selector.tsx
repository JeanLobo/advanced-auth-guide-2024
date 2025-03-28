"use client";

import {
  Building,
  ChevronDown
} from "lucide-react";
import { useCompanyStore } from "@/store/use-company-store";
import { Button } from "@/components/ui/button";

export const CompanySelector = () => {
  const { 
    selectedCompanyId, 
    availableCompanies, 
    getCurrentCompany,
    openCompanyDrawer 
  } = useCompanyStore();

  const currentCompany = getCurrentCompany();

  if (!selectedCompanyId || !currentCompany) {
    return (
      <Button
        onClick={openCompanyDrawer}
        variant="outline"
        className="flex items-center gap-x-2"
        size="sm"
      >
        <Building className="h-4 w-4" />
        <span>Selecionar empresa</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
    );
  }

  return (
    <Button
      onClick={openCompanyDrawer}
      variant="outline"
      className="flex items-center gap-x-2"
      size="sm"
    >
      {currentCompany.company.logo ? (
        <img 
          src={currentCompany.company.logo} 
          alt={currentCompany.company.name}
          className="h-4 w-4 rounded-full"
        />
      ) : (
        <Building className="h-4 w-4" />
      )}
      <span className="max-w-[150px] truncate">
        {currentCompany.company.name}
      </span>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Button>
  );
}; 