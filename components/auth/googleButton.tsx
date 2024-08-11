"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const GoogleButton = () => {
  const onClick = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button onClick={onClick} size="lg" className="w-full" variant="outline">
        <FcGoogle className="h5 w-5" />
      </Button>
    </div>
  );
};
