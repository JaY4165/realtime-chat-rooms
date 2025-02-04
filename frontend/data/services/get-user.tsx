import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";
import axios from "axios";
import qs from "qs";

const query = qs.stringify({
  populate: { image: { fields: ["url", "alternativeText"] } },
});

export async function getUser() {
  const baseUrl = getStrapiURL();

  const url = new URL("/api/users/me", baseUrl);
  url.search = query;

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await axios.get(url.href, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.data;
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
