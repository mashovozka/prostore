"use client";

import { signInDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { CardContent, CardFooter } from "@/components/ui/card";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full bg-black text-white hover:bg-black/80 h-10"
    >
      {pending ? "Signing In" : "Sign In"}
    </Button>
  );
};

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  return (
    <>
      <CardContent className="space-y-4">
        <form action={action}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={signInDefaultValues.email}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                defaultValue={signInDefaultValues.password}
              />
            </div>
          </div>
          <CardFooter className="w-full p-0 pt-4 flex-col gap-2">
            <SignInButton />
            {data && !data.success && (
              <div className="text-center text-destructive text-red-500">
                {data.message}
              </div>
            )}

            <div className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" target="_self" className="link">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </>
  );
};

export default CredentialsSignInForm;
