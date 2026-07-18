import { Job, JobSearchFilters, JobSearchResult } from "@/types/job";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchJobs(filters: JobSearchFilters): Promise<JobSearchResult> {
  const params = new URLSearchParams();
  if (filters.what) params.set("what", filters.what);
  if (filters.where) params.set("where", filters.where);
  if (filters.category) params.set("category", filters.category);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.page) params.set("page", String(filters.page));

  const res = await fetch(`${API_URL}/api/jobs?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }
  return res.json();
}

export async function fetchJobById(id: string): Promise<Job | null> {
  const res = await fetch(`${API_URL}/api/jobs/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch job: ${res.status}`);
  }
  return res.json();
}