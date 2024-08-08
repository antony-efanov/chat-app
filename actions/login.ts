"use server";

import * as z from "zod";

import { ILoginSchema, LoginSchema } from "@/schemas";

export const login = async (values: ILoginSchema) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email sent" };
};
