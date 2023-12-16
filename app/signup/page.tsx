import { AlertCircle, CalendarHeart, Circle, Link2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const Signup = () => {
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
            <form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="username" className="mb-2">
                  Username
                </Label>
                <div className="group relative mb-1 flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-default">
                  <div className="flex h-9 rounded-l-md border border-r-0 border-default px-3 [&:has(+_input:hover)]:border-emphasis [&:has(+_input:hover)]:border-r-default [input:hover_+_&]:border-emphasis [input:hover_+_&]:border-l-default">
                    <div className="flex flex-col justify-center text-sm leading-7 text-default">
                      <span className="flex whitespace-nowrap">http://localhost:3000/</span>
                    </div>
                  </div>
                  <Input
                    v-model="username"
                    placeholder="username"
                    className="!my-0 mb-2 h-9 rounded-md rounded-l-none border-l-0 bg-default text-sm leading-4 text-emphasis !ring-0 transition placeholder:text-muted hover:border-emphasis focus:border-neutral-300 focus:ring-2 focus:ring-brand-default disabled:cursor-not-allowed disabled:bg-subtle disabled:hover:border-subtle"
                  />
                </div>
                <div className="mt-2 flex items-center gap-x-2 text-sm text-red-700">
                  <AlertCircle width="13" height="13" />
                  <p>errors</p>
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  v-model="email"
                  placeholder="jdoe@example.com"
                  className="mb-2 h-9 rounded-md bg-default text-sm leading-4 text-emphasis transition placeholder:text-muted hover:border-emphasis focus:border-neutral-300 focus:ring-2 focus:ring-brand-default disabled:cursor-not-allowed disabled:bg-subtle disabled:hover:border-subtle"
                />
                <div className="mt-2 flex items-center gap-x-2 text-sm text-red-700">
                  <AlertCircle width="13" height="13" />
                  <p>errors</p>
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <div>
                  <Input
                    v-model="password"
                    type="password"
                    placeholder="•••••••••••••"
                    className="mb-2 h-9 rounded-md bg-default text-sm leading-4 text-emphasis transition placeholder:text-muted hover:border-emphasis focus:border-neutral-300 focus:ring-2 focus:ring-brand-default disabled:cursor-not-allowed disabled:bg-subtle disabled:hover:border-subtle"
                  />
                  <div className="mt-2 flex items-center gap-x-2 text-sm text-red-700">
                    <AlertCircle width="13" height="13" />
                    <p>errors</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-default">
                  <ul className="ml-2">
                    <li>
                      <Circle fill="currentColor" width="5" className="mx-1 inline-block" /> Mix of uppercase
                      &amp; lowercase letters
                    </li>
                    <li>
                      <Circle fill="currentColor" width="5" className="mx-1 inline-block" /> Minimum 7
                      characters long
                    </li>
                    <li>
                      <Circle fill="currentColor" width="5" className="mx-1 inline-block" /> Contain at least
                      1 number
                    </li>
                  </ul>
                </div>
              </div>
              <Button type="submit" className="w-full justify-center rounded-md">
                Create Account
              </Button>
            </form>
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
            <Image src="/mock-event-type-list.svg" alt="#" width="663" height="550" />
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
