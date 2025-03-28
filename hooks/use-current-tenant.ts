import { useSession } from "next-auth/react";
import { useMemo } from "react";

/**
 * Hook para obter o ID do tenant atual da sessão do usuário
 * @returns O ID do tenant atual ou undefined se não disponível
 */
export const useCurrentTenant = () => {
  const session = useSession();
  
  const currentTenantId = useMemo(() => {
    return session.data?.user?.currentTenantId;
  }, [session.data?.user?.currentTenantId]);

  return currentTenantId;
}; 