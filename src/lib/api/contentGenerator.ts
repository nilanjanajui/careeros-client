const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface GenerateContentInput {
  jobId?: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  type: "cover_letter" | "resume_bullets";
  length: "short" | "medium" | "long";
  regenerate?: boolean;
}

export interface AIGenerationResult {
  _id: string;
  userId: string;
  jobId?: string;
  jobTitle: string;
  company: string;
  type: "cover_letter" | "resume_bullets";
  length: "short" | "medium" | "long";
  prompt: string;
  output: string;
  createdAt: string;
}

export async function generateContent(
  input: GenerateContentInput,
  accessToken: string,
): Promise<AIGenerationResult> {
  const res = await fetch(`${API_URL}/api/content-generator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Content generation failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchContentHistory(
  accessToken: string,
): Promise<AIGenerationResult[]> {
  const res = await fetch(`${API_URL}/api/content-generator/history`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch history: ${res.status}`);
  return res.json();
}
