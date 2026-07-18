import { CompanyReview, CompanyReviewsResult } from "@/types/review";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCompanyReviews(
  company: string,
): Promise<CompanyReviewsResult> {
  const res = await fetch(
    `${API_URL}/api/reviews?company=${encodeURIComponent(company)}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.status}`);
  return res.json();
}

export async function createReview(
  input: { company: string; rating: number; reviewText: string },
  accessToken: string,
): Promise<CompanyReview> {
  const res = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Failed to submit review: ${res.status}`);
  }
  return res.json();
}
