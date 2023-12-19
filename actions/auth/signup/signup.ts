"use server";

import { z } from "zod";

import { type FormValues } from "@/app/signup/page";
import { db } from "@/lib/db";
import { isPasswordValid } from "@/lib/isPasswordValid";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const signupSchema = z.object({
  username: z.string().refine((value) => !value.includes("+"), {
    message: "String should not contain a plus symbol (+).",
  }),
  email: z.string().email(),
  password: z.string().superRefine((data, ctx) => {
    const isStrict = false;
    const result = isPasswordValid(data, true, isStrict);
    Object.keys(result).map((key: string) => {
      if (!result[key as keyof typeof result]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: key,
        });
      }
    });
  }),
});

export async function signup(formData: FormValues) {
  const validatedFields = signupSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields.",
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    await db.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  } catch (error) {
    return {
      message: "Database Error",
    };
  }

  // revalidatePath("/organization/org_2XwLIDt5x0Ay86prfZg7BqrELWR");
  // redirect("/organization/org_2XwLIDt5x0Ay86prfZg7BqrELWR");
}
