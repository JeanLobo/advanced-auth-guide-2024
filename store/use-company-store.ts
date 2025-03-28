import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserCompany } from "@/types";

interface CompanyState {
  // Company e Tenant selecionadas
  selectedCompanyId: string | null;
  selectedTenantId: string | null;
  
  // Lista de companies disponíveis para o usuário
  availableCompanies: UserCompany[];
  
  // Status do drawer
  isCompanyDrawerOpen: boolean;
  
  // Ações
  setSelectedCompany: (companyId: string, tenantId: string) => void;
  setAvailableCompanies: (companies: UserCompany[]) => void;
  clearSelectedCompany: () => void;
  openCompanyDrawer: () => void;
  closeCompanyDrawer: () => void;
  
  // Seletores auxiliares
  getCurrentCompany: () => UserCompany | undefined;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      selectedCompanyId: null,
      selectedTenantId: null,
      availableCompanies: [],
      isCompanyDrawerOpen: false,
      
      // Ações
      setSelectedCompany: (companyId, tenantId) => set({
        selectedCompanyId: companyId,
        selectedTenantId: tenantId,
        isCompanyDrawerOpen: false,
      }),
      
      setAvailableCompanies: (companies) => set({
        availableCompanies: companies,
        // Se não houver company selecionada e houver apenas uma disponível, seleciona automaticamente
        ...(get().selectedCompanyId === null && companies.length === 1 
          ? { 
              selectedCompanyId: companies[0].companyId,
              selectedTenantId: companies[0].tenantId
            } 
          : {}),
        // Se houver múltiplas companies e nenhuma selecionada, abre o drawer
        ...(get().selectedCompanyId === null && companies.length > 1
          ? { isCompanyDrawerOpen: true }
          : {}),
        // Se a company selecionada não estiver mais disponível, limpa a seleção
        ...(get().selectedCompanyId !== null && 
           !companies.some(c => c.companyId === get().selectedCompanyId)
          ? { 
              selectedCompanyId: null,
              selectedTenantId: null,
              isCompanyDrawerOpen: companies.length > 0
            }
          : {})
      }),
      
      clearSelectedCompany: () => set({
        selectedCompanyId: null,
        selectedTenantId: null
      }),
      
      openCompanyDrawer: () => set({ isCompanyDrawerOpen: true }),
      closeCompanyDrawer: () => set({ isCompanyDrawerOpen: false }),
      
      // Seletores
      getCurrentCompany: () => {
        const { selectedCompanyId, availableCompanies } = get();
        return availableCompanies.find(uc => uc.companyId === selectedCompanyId);
      },
    }),
    {
      name: "company-storage", // nome para o local storage
      storage: createJSONStorage(() => localStorage), // explicitamente usa localStorage
      skipHydration: true, // evita hidratação no SSR
      partialize: (state) => ({
        // Salva apenas os IDs selecionados, não os dados completos
        selectedCompanyId: state.selectedCompanyId,
        selectedTenantId: state.selectedTenantId,
      })
    }
  )
); 