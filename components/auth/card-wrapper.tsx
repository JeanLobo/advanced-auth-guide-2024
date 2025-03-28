"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="w-full flex justify-center items-center min-h-[calc(100vh-150px)]">
      <Card className="w-full max-w-[380px] sm:max-w-[450px] md:max-w-[500px] mx-4 shadow-md">
        <CardHeader className="pb-6">
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {showSocial && (
          <CardFooter className="flex flex-col gap-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton 
            label={backButtonLabel}
            href={backButtonHref}
          />
        </CardFooter>
      </Card>
    </div>
  )
}