import { MainLayout } from "@/components/layout/main-layout";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
}
 
export default ProtectedLayout;