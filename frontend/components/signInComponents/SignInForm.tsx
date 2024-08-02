"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";
import { useEffect } from "react";
import { toast } from "sonner";

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  strapiErrors: null,
  message: null,
};

export function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);

  const status = useFormStatus();

  useEffect(() => {
    
    if (formState.strapiErrors !== null) {
      toast("Invalid credentials");
      return;
    }

    if (formState?.zodErrors !== null || formState?.zodErrors !== undefined) {
      formState?.zodErrors?.forEach((err: any) => {
        toast(err.message);
      });
      return;
    }

    toast("User logged in successfully");
  }, [formState, formAction, status]);
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="email or username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              variant={"default"}
              className="relative w-full"
              disabled={status.pending}
            >
              {status.pending ? (
                <div className="absolute h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-white"></div>
              ) : (
                "Sign In"
              )}
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link className="ml-2 underline" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
