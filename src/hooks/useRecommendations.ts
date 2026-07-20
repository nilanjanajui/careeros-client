import { useMutation } from "@tanstack/react-query";
import {
  generateRecommendations,
  logInteraction,
} from "@/lib/api/recommendations";
import { useAuthStore } from "@/store/authStore";

export function useGenerateRecommendationsMutation() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useMutation({
    mutationFn: () => generateRecommendations(accessToken!),
  });
}

export function useLogInteractionMutation() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useMutation({
    mutationFn: (input: Parameters<typeof logInteraction>[0]) =>
      logInteraction(input, accessToken!),
  });
}
