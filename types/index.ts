import { User } from "@prisma/client";

// Tenant representa um ambiente isolado no sistema
export interface Tenant {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Company representa uma empresa dentro de um tenant
export interface Company {
  id: string;
  name: string;                   // Nome Fantasia
  legal_name: string;             // Razão Social
  registration_type: string;      // Tipo de inscrição (CNPJ, CPF ou Estrangeiro)
  registration_number: string;    // Número de inscrição (CNPJ, CPF ou ID Estrangeiro)
  state_registration?: string;    // Inscrição Estadual
  municipal_registration?: string; // Inscrição Municipal
  suframa_registration?: string;   // Inscrição Suframa
  tax_regime?: string;            // Regime Tributário
  address_street?: string;        // Endereço: Rua
  address_number?: string;        // Endereço: Número
  address_complement?: string;    // Endereço: Complemento
  address_neighborhood?: string;  // Endereço: Bairro
  address_city?: string;          // Endereço: Cidade
  address_state?: string;         // Endereço: Estado (sigla)
  address_zip_code?: string;      // Endereço: CEP
  active: boolean;                // Indica se a Empresa está ativa
  logo?: string;                  // URL do logo da empresa
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

// UserCompany relaciona um usuário a uma company/tenant específica
export interface UserCompany {
  userId: string;
  companyId: string;
  tenantId: string;
  role: UserRole;
  company: Company;
}

// Roles que um usuário pode ter em uma company
export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER"
}

// CurrentUser representa o usuário logado conforme retornado pelo hook useCurrentUser
export interface CurrentUser {
  id: string;
  name?: string | null;
  email?: string | null; 
  role?: UserRole;
  image?: string | null;
  birthDate?: Date | null;
  isOAuth?: boolean;
  isTwoFactorEnabled?: boolean;
  currentTenantId?: string;
  currentCompanyId?: string;
}

// ExtendedUser estende o User do Prisma com informações adicionais
export interface ExtendedUser extends User {
  userCompanies?: UserCompany[];
} 