"use server";

import * as z from "zod";

import { IRegisterSchema, RegisterSchema } from "@/schemas";

export const register = async (values: IRegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email sent" };
};
