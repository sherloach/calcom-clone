"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarHeart, Link2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signup } from "@/actions/auth/signup/signup";
import { Form } from "@/components/form/Form";
import PasswordField from "@/components/form/PasswordField";
import { TextField } from "@/components/form/TextField";
import UsernameField from "@/components/form/UsernameField";
import { Button } from "@/components/ui/button";
import { signupSchema } from "@/prisma/zod-utils";

const FEATURES = [
  {
    title: "Connect all your calendars",
    description: "Cal.com reads availability from all your existing calendars.",
    icon: CalendarHeart,
  },
  {
    title: "Set your availability",
    description: "Set schedules for the times you want to be booked.",
    icon: Users,
  },
  {
    title: "Share a link or embed",
    description: "Share your Cal.com link or embed on your site.",
    icon: Link2,
  },
];

export type FormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [usernameTaken, setUsernameTaken] = useState<boolean>(false);

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const {
    register,
    watch,
    formState: { isSubmitting },
  } = formMethods;

  // const signup = () => {};

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted 2xl:bg-default">
      <div className="grid w-full max-w-[1440px] grid-cols-1 grid-rows-1 bg-muted lg:grid-cols-2 2xl:rounded-[20px] 2xl:border 2xl:border-subtle 2xl:py-6">
        <div className="flex w-full flex-col px-4 pt-6 sm:px-16 md:px-20 2xl:px-28">
          <div className="flex flex-col gap-2">
            <h1 className="font-cal text-[28px] leading-none">Create your account</h1>
            <p className="text-base font-medium leading-5 text-subtle">
              Cal.com provides scheduling infrastructure for absolutely everyone.
            </p>
          </div>
          <div className="mt-10">
            <Form
              className="flex flex-col gap-4"
              form={formMethods}
              handleSubmit={async (values) => await signup(values)}>
              <UsernameField
                label="username"
                username={watch("username")}
                usernameTaken={usernameTaken}
                setUsernameTaken={(value) => setUsernameTaken(value)}
                addOnLeading={`http://localhost:3000`}
              />
              <TextField label="email" type="email" {...register("email")} />
              <PasswordField label="password" {...register("password")} hintErrors={["caplow", "num", "min"]} />
              <Button
                type="submit"
                className="w-full justify-center rounded-md"
                disabled={
                  !!formMethods.formState.errors.username ||
                  !!formMethods.formState.errors.email ||
                  !formMethods.getValues("email") ||
                  !formMethods.getValues("password") ||
                  !formMethods.getValues("username") ||
                  isSubmitting ||
                  usernameTaken
                }>
                Create Account
              </Button>
            </Form>
          </div>
          <div className="mt-10 flex h-full flex-col justify-end text-xs">
            <div className="flex gap-1">
              <p className="text-sm text-subtle">Already have an account?</p>
              <Link href="/auth/login" className="text-sm text-emphasis hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hidden w-full flex-col justify-between rounded-l-2xl border border-subtle py-12 pl-12 lg:flex"
          style={{
            background:
              "radial-gradient(162.05% 170% at 109.58% 35%, rgba(102, 117, 147, 0.7) 0%, rgba(212, 212, 213, 0.4) 100%)",
          }}>
          <div
            className="rounded-l-2xl rounded-br-none border-dashed border-default py-[6px] pl-[6px]"
            style={{ backgroundColor: "rgba(236,237,239,0.9)" }}>
            <Image src="/mock-event-type-list.svg" alt="#" width="663" height="550" priority />
          </div>
          <div className="mr-12 mt-8 grid h-full w-full grid-cols-3 gap-4 overflow-hidden">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex flex-col leading-none">
                <div className="items-center text-emphasis">
                  <feature.icon className="mb-1 h-4 w-4" />
                  <span className="text-sm font-medium">{feature.title}</span>
                </div>
                <div className="text-sm text-subtle">
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
