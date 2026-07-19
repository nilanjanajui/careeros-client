import { Profile, UpdateProfileInput } from "@/types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProfile(accessToken: string): Promise<Profile> {
  const res = await fetch(`${API_URL}/api/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
  return res.json();
}

export async function updateProfile(
  input: UpdateProfileInput,
  accessToken: string,
): Promise<Profile> {
  const res = await fetch(`${API_URL}/api/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Failed to update profile: ${res.status}`);
  }
  return res.json();
}
