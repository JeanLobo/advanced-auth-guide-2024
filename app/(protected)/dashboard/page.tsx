"use client";

import { useEffect } from "react";
import { useCompanyStore } from "@/store/use-company-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { selectedCompanyId, getCurrentCompany, isCompanyDrawerOpen, openCompanyDrawer } = useCompanyStore();
  const currentCompany = getCurrentCompany();

  // Se não houver company selecionada, redireciona para a raiz
  // Isso força o middleware a verificar se o usuário está logado
  useEffect(() => {
    if (!selectedCompanyId && !isCompanyDrawerOpen) {
      openCompanyDrawer();
    }
  }, [selectedCompanyId, isCompanyDrawerOpen, openCompanyDrawer]);

  if (!currentCompany) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-muted-foreground">
          Selecione uma empresa para continuar...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao painel da {currentCompany.company.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Vendas</CardTitle>
            <CardDescription>
              Resumo das vendas mensais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">R$ 15.420,00</p>
            <p className="text-sm text-green-600">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>
              Total de clientes ativos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">127</p>
            <p className="text-sm text-green-600">+5 novos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estoque</CardTitle>
            <CardDescription>
              Produtos com estoque baixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8</p>
            <p className="text-sm text-amber-600">Atenção necessária</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 