import { User } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { signupSchema } from "./schema";

export type InputType = z.infer<typeof signupSchema>;
export type ReturnType = ActionState<InputType, User>;
