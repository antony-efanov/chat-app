"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getDefaultRoomId } from "@/actions/getDefaultRoomId";

export const GoogleButton = () => {
  const onClick = async () => {
    const roomId = await getDefaultRoomId();

    signIn("google", {
      callbackUrl: `/${roomId}`,
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
