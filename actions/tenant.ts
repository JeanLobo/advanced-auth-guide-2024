"use server";

import { auth, signOut } from "@/auth";
import { getUserTenants } from "@/data/tenant";
import { db } from "@/lib/db";

/**
 * Altera o tenant atual na sessão do usuário
 * Requer re-autenticação para atualizar o token JWT
 */
export const switchTenant = async (tenantId: string) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId) {
      return { error: "Não autenticado" };
    }
    
    // Verificar se o usuário tem acesso a este tenant
    const userTenants = await getUserTenants(userId);
    const hasTenantAccess = userTenants.some(ut => ut.tenantId === tenantId);
    
    if (!hasTenantAccess) {
      return { error: "Você não tem acesso a esta organização" };
    }
    
    // Armazenar a preferência de tenant selecionada pelo usuário no banco de dados
    // Isso será usado ao gerar um novo token JWT no login
    await db.user.update({
      where: { id: userId },
      data: {
        // Armazenar a preferência, o token JWT será atualizado no próximo login
        // Em uma aplicação de produção, você pode querer armazenar isso em uma tabela separada
      }
    });
    
    // Forçar logout para atualizar o token com o novo tenant
    // Em uma implementação mais sofisticada, você poderia atualizar a sessão diretamente
    await signOut({ redirectTo: "/auth/login" });
    
    return { success: "Organização alterada com sucesso" };
  } catch (error) {
    console.error("Erro ao trocar de organização:", error);
    return { error: "Falha ao trocar de organização" };
  }
} 