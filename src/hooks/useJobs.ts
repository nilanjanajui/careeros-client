import { useQuery } from "@tanstack/react-query";
import { fetchJobs, fetchJobById } from "@/lib/api/jobs";
import { JobSearchFilters } from "@/types/job";

export function useJobsQuery(filters: JobSearchFilters) {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => fetchJobs(filters),
    placeholderData: (prev) => prev, // keep old page visible while the next page loads
  });
}

export function useJobQuery(id: string) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: Boolean(id),
  });
}