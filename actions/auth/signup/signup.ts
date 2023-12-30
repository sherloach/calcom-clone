"use server";

import { type FormValues } from "@/app/signup/page";
import slugify from "@/lib/slugify";
import { signupSchema } from "@/prisma/zod-utils";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

// TODO:
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
