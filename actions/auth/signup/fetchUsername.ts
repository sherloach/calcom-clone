"use server";

import { db } from "@/lib/db";
import slugify from "@/lib/slugify";

export const fetchUsername = async (_username: string) => {
  const username = slugify(_username);

  const user = await db.user.findFirst({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });

  if (user) {
    return {
      available: false as const,
      message: "A user exists with that username",
    };
  }
  return {
    available: true as const,
  };
};
