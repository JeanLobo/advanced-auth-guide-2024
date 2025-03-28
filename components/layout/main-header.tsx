"use client";

import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";
import { CompanySelector } from "@/components/company/company-selector";
import { useCompanyStore } from "@/store/use-company-store";

export const MainHeader = () => {
  const { selectedCompanyId } = useCompanyStore();

  return (
    <header className="h-14 border-b px-4 flex items-center justify-between">
      <div className="flex items-center gap-x-6">
        <Link href="/" className="font-semibold text-lg">
          Gestão Simples
        </Link>
        {selectedCompanyId && (
          <nav className="hidden md:flex items-center gap-x-4">
            <Link
              href="/dashboard"
              className="text-sm hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/vendas"
              className="text-sm hover:text-primary transition-colors"
            >
              Vendas
            </Link>
            <Link
              href="/estoque"
              className="text-sm hover:text-primary transition-colors"
            >
              Estoque
            </Link>
            <Link
              href="/financeiro"
              className="text-sm hover:text-primary transition-colors"
            >
              Financeiro
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-x-4">
        <CompanySelector />
        <UserButton />
      </div>
    </header>
  );
}; 