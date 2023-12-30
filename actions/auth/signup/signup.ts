"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import slugify from "@/lib/slugify";

import { signupSchema } from "./schema";
import { InputType, ReturnType } from "./types";

// TODO:
//       after signup then signin
const handler = async (data: InputType): Promise<ReturnType> => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    return {
      error: "Missing fields. Failed to sign up",
    };
  }

  const _username = slugify(username);
  const _email = email.toLowerCase();
  let newUser;

  if (!_username) {
    return {
      error: "Invalid username",
    };
  }

  try {
    newUser = await db.user.create({
      data: {
        username: _username,
        email: _email,
        password,
      },
    });
  } catch (error) {
    return {
      error: "Failed to sign up",
    };
  }

  return { data: newUser };
};

export const signup = createSafeAction(signupSchema, handler);
