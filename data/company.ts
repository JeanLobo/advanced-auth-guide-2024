import { db } from "@/lib/db";
import {
  UserCompany as PrismaUserCompany,
  Company as PrismaCompany
} from "@prisma/client";
import { UserCompany, Company, UserRole } from "@/types";

/**
 * Busca todas as empresas associadas a um usuário
 */
export const getUserCompanies = async (userId: string): Promise<UserCompany[]> => {
  const userCompanies = await db.userCompany.findMany({
    where: { userId },
    include: {
      company: true
    }
  });

  return userCompanies.map(mapPrismaUserCompanyToUserCompany);
};

/**
 * Busca uma company específica por ID
 */
export const getCompanyById = async (companyId: string): Promise<Company | null> => {
  const company = await db.company.findUnique({
    where: { id: companyId }
  });

  if (!company) return null;

  return mapPrismaCompanyToCompany(company);
};

/**
 * Busca uma UserCompany por userId e companyId
 */
export const getUserCompany = async (userId: string, companyId: string): Promise<UserCompany | null> => {
  const userCompany = await db.userCompany.findUnique({
    where: {
      userId_companyId: {
        userId,
        companyId
      }
    },
    include: {
      company: true
    }
  });

  if (!userCompany) return null;

  return mapPrismaUserCompanyToUserCompany(userCompany);
};

/**
 * Mapeia um objeto UserCompany do Prisma para o tipo UserCompany da aplicação
 */
const mapPrismaUserCompanyToUserCompany = (
  prismaUserCompany: PrismaUserCompany & { company: PrismaCompany }
): UserCompany => {
  return {
    userId: prismaUserCompany.userId,
    companyId: prismaUserCompany.companyId,
    tenantId: prismaUserCompany.company.tenantId,
    role: prismaUserCompany.role as unknown as UserRole,
    company: mapPrismaCompanyToCompany(prismaUserCompany.company)
  };
};

/**
 * Mapeia um objeto Company do Prisma para o tipo Company da aplicação
 */
const mapPrismaCompanyToCompany = (
  prismaCompany: PrismaCompany
): Company => {
  return {
    id: prismaCompany.id,
    name: prismaCompany.name,
    legal_name: prismaCompany.legal_name,
    registration_type: prismaCompany.registration_type,
    registration_number: prismaCompany.registration_number,
    state_registration: prismaCompany.state_registration || undefined,
    municipal_registration: prismaCompany.municipal_registration || undefined,
    suframa_registration: prismaCompany.suframa_registration || undefined,
    tax_regime: prismaCompany.tax_regime || undefined,
    address_street: prismaCompany.address_street || undefined,
    address_number: prismaCompany.address_number || undefined,
    address_complement: prismaCompany.address_complement || undefined,
    address_neighborhood: prismaCompany.address_neighborhood || undefined,
    address_city: prismaCompany.address_city || undefined,
    address_state: prismaCompany.address_state || undefined,
    address_zip_code: prismaCompany.address_zip_code || undefined,
    active: prismaCompany.active,
    logo: prismaCompany.logo || undefined,
    tenantId: prismaCompany.tenantId,
    createdAt: prismaCompany.createdAt,
    updatedAt: prismaCompany.updatedAt
  };
};

/**
 * Busca todas as companies de um tenant
 */
export const getTenantCompanies = async (tenantId: string): Promise<Company[]> => {
  try {
    const companies = await db.company.findMany({
      where: {
        tenantId
      }
    });

    return companies.map(mapPrismaCompanyToCompany);
  } catch (error) {
    console.error("Erro ao buscar empresas do tenant:", error);
    return [];
  }
}; 