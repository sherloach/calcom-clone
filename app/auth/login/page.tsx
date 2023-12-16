"use client";

import { AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const onSubmit = () => {};

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-subtle py-12">
      <h3 className="mx-auto mb-auto">
        <strong>
          <Image src="/logo.svg" alt="Cal" title="Cal" placeholder="empty" width="74" height="16" />
        </strong>
      </h3>
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="font-cal text-3xl">Welcome back</h2>
      </div>
      <div className="mb-auto mt-8 w-full sm:mx-auto sm:max-w-md">
        <div className="mx-2 rounded-md border border-subtle bg-default px-4 py-10 sm:px-10">
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              <div>
                <Label id="email" className="mb-2">
                  Email address
                </Label>
                <Input id="email" type="email" placeholder="johndoe@example.com" className="rounded-md" />
                <div className="mt-2 flex items-center gap-x-2 text-sm text-red-700">
                  <AlertCircle width="13" height="13" />
                  <p>error</p>
                </div>
              </div>
              <div>
                <Label id="password" className="mb-2">
                  Password
                </Label>
                <Input
                  v-model="password"
                  type="password"
                  placeholder="•••••••••••••"
                  className="rounded-md"
                />
                <div className="mt-2 flex items-center gap-x-2 text-sm text-red-700">
                  <AlertCircle width="13" height="13" />
                  <p>error</p>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full justify-center bg-brand-default text-brand disabled:bg-[#9ca3af]">
                Sign in
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-8 text-center text-sm text-default">
          <Link href="/signup" className="font-medium">
            Don&apos;t have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
