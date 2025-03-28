import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  image: string;
  isOAuth: boolean;
  isTwoFactorEnabled: boolean;
  currentTenantId?: string;
  currentCompanyId?: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}