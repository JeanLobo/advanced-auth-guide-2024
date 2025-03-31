"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = () => {
    signIn("google", { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  }

  return (
    <div className="flex items-center w-full">
      <Button 
        variant="outline" 
        className="w-full"
        size="lg"
        onClick={onClick}
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Acessar através do Google
      </Button>
    </div>
  )
}