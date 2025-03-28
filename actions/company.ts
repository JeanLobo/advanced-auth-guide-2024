"use server";

import { getUserCompanies } from "@/data/company";
import { UserCompany } from "@/types";
import { currentUser } from "@/lib/auth";

/**
 * Action para buscar as empresas de um usuário
 */
export const getUserCompaniesAction = async (): Promise<UserCompany[]> => {
  const user = await currentUser();
  
  if (!user || !user.id) {
    return [];
  }
  
  try {
    return await getUserCompanies(user.id);
  } catch (error) {
    console.error("Erro ao buscar empresas do usuário:", error);
    return [];
  }
}; 