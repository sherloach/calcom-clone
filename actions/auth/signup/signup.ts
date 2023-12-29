"use server";

import { z } from "zod";

import { type FormValues } from "@/app/signup/page";
import { isPasswordValid } from "@/lib/isPasswordValid";
import slugify from "@/lib/slugify";

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

// TODO: check username
//       change to api
//       add error api
//       after signup then signin
export async function signup(formData: FormValues) {
  const validatedFields = signupSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields.",
    };
  }

  const { email, password } = validatedFields.data;

  const username = slugify(formData.username);
  console.log("username", username);

  if (!username) {
    // res.status(422).json({ message: "Invalid username" });
    console.log("Invalid username");
    return;
  }

  // try {
  //   await db.user.create({
  //     data: {
  //       username,
  //       email,
  //       password,
  //     },
  //   });
  // } catch (error) {
  //   return {
  //     message: "Database Error",
  //   };
  // }

  // revalidatePath("/organization/org_2XwLIDt5x0Ay86prfZg7BqrELWR");
  // redirect("/organization/org_2XwLIDt5x0Ay86prfZg7BqrELWR");
}
