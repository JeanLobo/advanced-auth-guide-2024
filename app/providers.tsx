"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { useCompanyStore } from "@/store/use-company-store";

// Componente para hidratar o Zustand store no lado do cliente
function StoreHydration() {
  const { setAvailableCompanies } = useCompanyStore();

  // Efeito para hidratar o store quando o componente montar
  useEffect(() => {
    // Inicializa o store para permitir a persistência
    useCompanyStore.persist.rehydrate();
  }, []);

  return null;
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <SessionProvider>
      <StoreHydration />
      <Toaster />
      {children}
    </SessionProvider>
  );
}; 