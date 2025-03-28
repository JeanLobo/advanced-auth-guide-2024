"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const AdminPage = () => {

  const onServerActionClick = () => {
    admin()
      .then((response) => {
        if (response.success) {
          toast.success("Rota da API exclusiva para Administrador!")
        } else {
          toast.error("Não autorizado");
        }
      })
  }

  const onApiClick = () => {
    fetch("/api/admin")
      .then((response) => {
        if (response.ok) {
          toast.success("Rota da API exclusiva para Administrador!")
        } else {
          toast.error("Não autorizado");
        }
      })
  }

  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🔑 Admin
        </p>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 mt-4">
        <RoleGate allowedRole="ADMIN">
          <FormSuccess message="Você tem permissão para ver este conteúdo!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Rota da API exclusiva para Administrador
          </p>
          <Button onClick={onApiClick}>
            Clique para testar
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Rota da API exclusiva para Administrador
          </p>
          <Button onClick={onServerActionClick}>
            Clique para testar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
 
export default AdminPage;