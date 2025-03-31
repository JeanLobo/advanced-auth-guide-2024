import { LoginForm } from "@/components/auth/login-form";
import SvgBrand from "@/public/assets/brand";
import SvgBrandWhiteText from "@/public/assets/brand-white-text";

const LoginPage = (): JSX.Element => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">        
            <SvgBrand className="h-8 w-auto" />
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
          <SvgBrandWhiteText className="w-[400px] h-auto " />
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