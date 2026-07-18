import {
  Application,
  ApplicationStatus,
  CreateApplicationInput,
} from "@/types/application";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function authHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

export async function fetchApplications(
  accessToken: string,
): Promise<Application[]> {
  const res = await fetch(`${API_URL}/api/applications`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) throw new Error(`Failed to fetch applications: ${res.status}`);
  return res.json();
}

export async function createApplication(
  input: CreateApplicationInput,
  accessToken: string,
): Promise<Application> {
  const res = await fetch(`${API_URL}/api/applications`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body.error ?? `Failed to create application: ${res.status}`,
    );
  }
  return res.json();
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  accessToken: string,
): Promise<Application> {
  const res = await fetch(`${API_URL}/api/applications/${id}`, {
    method: "PATCH",
    headers: authHeaders(accessToken),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`Failed to update application: ${res.status}`);
  return res.json();
}

export async function deleteApplication(
  id: string,
  accessToken: string,
): Promise<void> {
  const res = await fetch(`${API_URL}/api/applications/${id}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
  if (!res.ok && res.status !== 204)
    throw new Error(`Failed to delete application: ${res.status}`);
}
