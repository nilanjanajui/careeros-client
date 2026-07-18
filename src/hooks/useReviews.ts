import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCompanyReviews, createReview } from "@/lib/api/reviews";
import { useAuthStore } from "@/store/authStore";

export function useCompanyReviewsQuery(company: string) {
  return useQuery({
    queryKey: ["reviews", company],
    queryFn: () => fetchCompanyReviews(company),
    enabled: Boolean(company),
  });
}

export function useCreateReviewMutation(company: string) {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);

  return useMutation({
    mutationFn: (input: { rating: number; reviewText: string }) => {
      if (!accessToken) throw new Error("Not authenticated");
      return createReview({ company, ...input }, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", company] });
    },
  });
}
