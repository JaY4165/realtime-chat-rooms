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
import { registerUserAction } from "@/data/actions/auth-actions";
import { toast } from "sonner";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  strapiErrors: null,
  message: null,
};

export function SignupForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE,
  );
  const status = useFormStatus();

  useEffect(() => {
    if (formState.strapiErrors !== null) {
      toast("Error while registering user");
      return;
    }

    if (formState?.zodErrors !== null || formState?.zodErrors !== undefined) {
      formState?.zodErrors?.forEach((err: any) => {
        toast(err.message);
      });
      return;
    }

    toast("User registered successfully");
  }, [formState, formAction, status]);

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                required
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
                "Sign Up"
              )}
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="ml-2 underline" href="/sign-in">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
