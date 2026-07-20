import { useMutation } from "@tanstack/react-query";
import {
  generateContent,
  GenerateContentInput,
} from "@/lib/api/contentGenerator";
import { useAuthStore } from "@/store/authStore";

export function useGenerateContentMutation() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useMutation({
    mutationFn: (input: GenerateContentInput) =>
      generateContent(input, accessToken!),
  });
}
