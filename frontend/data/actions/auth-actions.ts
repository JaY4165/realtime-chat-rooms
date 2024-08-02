"use server";

import { signInSchema, SignInType, signUpSchema, SignUpType } from "@/validations/auth-validation";
import { loginUserService, registerUserService } from "../services/auth-service";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

const config = {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};


export async function registerUserAction(prevState: any, formData: FormData) {

    const user: SignUpType = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    } satisfies SignUpType

    const result = await signUpSchema.safeParseAsync(user)
    if (!result.success) {
        return {
            ...prevState,
            zodErrors: result.error.errors,
            strapiErrors: null,
            message: "Missing Fields. Failed to Register.",
        };
    }

    const responseData = await registerUserService(result.data);



    if (responseData?.errorMsg) {
        return {
            ...prevState,
            strapiErrors: responseData.errorMsg,
            zodErrors: null,
        };
    }

    cookies().set("jwt", responseData.jwt, config);


    redirect('/')
}


export async function loginUserAction(prevState: any, formData: FormData) {

    const user = {
        identifier: formData.get("identifier") as string,
        password: formData.get("password") as string,
    } as SignInType;

    const result = signInSchema.safeParse(user);

    if (!result.success) {
        return {
            ...prevState,
            zodErrors: result.error.errors,
            strapiErrors: null,
            message: "Missing Fields. Failed to Register.",
        };
    }

    const responseData = await loginUserService(result.data);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Oops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Login.",
        };
    }

    if (!responseData.jwt) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Login.",
        };
    }

    cookies().set("jwt", responseData.jwt, config);

    redirect("/");
}

export async function logoutAction() {
    cookies().set("jwt", "", { ...config, maxAge: 0 });
    redirect("/");
}