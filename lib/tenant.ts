import { auth } from "@/auth";
import { getTenantById, getUserTenants } from "@/data/tenant";

/**
 * Obtém o tenant atual baseado na sessão do usuário autenticado
 * @returns O tenant atual ou null se não estiver disponível
 */
export const currentTenant = async () => {
  const session = await auth();
  
  if (!session?.user?.currentTenantId) {
    return null;
  }
  
  const tenant = await getTenantById(session.user.currentTenantId);
  return tenant;
};

/**
 * Obtém todos os tenants aos quais o usuário autenticado tem acesso
 * @returns Array de relações usuário-tenant ou array vazio
 */
export const userTenants = async () => {
  const session = await auth();
  
  if (!session?.user?.id) {
    return [];
  }
  
  return getUserTenants(session.user.id);
}; 