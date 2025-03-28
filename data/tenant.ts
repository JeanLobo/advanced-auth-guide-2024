import { db } from "@/lib/db";

export const getTenantBySlug = async (slug: string) => {
  try {
    const tenant = await db.tenant.findUnique({
      where: {
        slug
      }
    });

    return tenant;
  } catch (error) {
    console.error("Erro ao buscar tenant por slug:", error);
    return null;
  }
}

export const getTenantById = async (id: string) => {
  try {
    const tenant = await db.tenant.findUnique({
      where: {
        id
      }
    });

    return tenant;
  } catch (error) {
    console.error("Erro ao buscar tenant por id:", error);
    return null;
  }
}

export const getUserTenants = async (userId: string) => {
  try {
    const userTenants = await db.userTenant.findMany({
      where: {
        userId
      },
      include: {
        tenant: true
      }
    });

    return userTenants;
  } catch (error) {
    console.error("Erro ao buscar tenants do usuário:", error);
    return [];
  }
}

export const getDefaultUserTenant = async (userId: string) => {
  try {
    // Obter o primeiro tenant associado ao usuário (geralmente será o que ele criou)
    const userTenant = await db.userTenant.findFirst({
      where: {
        userId
      },
      include: {
        tenant: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return userTenant;
  } catch (error) {
    console.error("Erro ao buscar tenant padrão do usuário:", error);
    return null;
  }
} 