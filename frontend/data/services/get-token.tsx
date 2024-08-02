"use server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getAuthToken = async (): Promise<string | undefined> => {
  const authToken = await cookies().get("jwt")?.value;
  return authToken;
};

export const getUserDetails = async () => {
  const token = await getAuthToken();
  try {
    if (token !== undefined) {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await axios.get(
        `http://localhost:1337/api/users/${decoded.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        userId: decoded.id as string,
        username: user.data.username as string,
        email: user.data.email as string,
      };
    }
  } catch (err) {
    console.log("error decoding");
  }
};
