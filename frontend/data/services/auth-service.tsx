import { getStrapiURL } from "@/lib/utils";
import axios, { AxiosError } from "axios";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/auth/local/register", getStrapiURL());
  try {
    const response = await axios.post(
      url.href,
      {
        ...userData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Registration Service Error");
    return {
      errorMsg: "User already exists or user cannot be registeed",
    };
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", getStrapiURL());
  try {
    const response = await axios.post(
      url.href,
      { ...userData },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );


    return response.data;
  } catch (error) {
    if (error instanceof AxiosError)
      console.error("Error logging in user, Please try again later");
    return {
      errorMsg: "Error logging in user, Please try again later",
    };
  }
}
