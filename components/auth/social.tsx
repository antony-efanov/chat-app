"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button onClick={() => {}} size="lg" className="w-full" variant="outline">
        <FcGoogle className="h5 w-5" />
      </Button>
    </div>
  );
};
