import { InteractionAction, RecommendationRun } from "@/types/recommendation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateRecommendations(
  accessToken: string,
): Promise<RecommendationRun> {
  const res = await fetch(`${API_URL}/api/recommendations`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body.detail ??
        body.error ??
        `Failed to generate recommendations: ${res.status}`,
    );
  }
  return res.json();
}

export async function logInteraction(
  input: {
    externalJobId: string;
    jobTitle: string;
    company: string;
    action: InteractionAction;
  },
  accessToken: string,
): Promise<void> {
  const res = await fetch(`${API_URL}/api/recommendations/interaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Failed to log interaction: ${res.status}`);
}
