import { Building } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building className="size-4" />
            </div>
            Gestão Simples
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm hideSocial={false} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-zinc-900 lg:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 1024 1024" 
            className="w-full h-full opacity-5"
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor"
          >
            <g id="SVGRepo_iconCarrier">
              <path fill="#fff" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"></path>
            </g>
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 right-10 text-white z-20">
          <h2 className="mb-4 text-3xl font-bold">Simplifique sua gestão empresarial</h2>
          <p className="text-lg font-light">Acesse todas as ferramentas que sua empresa precisa em um único lugar.</p>
        </div>
      </div>
    </div>
  );
}
 
export default LoginPage;