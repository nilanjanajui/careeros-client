import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile } from "@/lib/api/profile";
import { UpdateProfileInput } from "@/types/profile";
import { useAuthStore } from "@/store/authStore";

export function useProfileQuery() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(accessToken!),
    enabled: Boolean(accessToken),
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);
  return useMutation({
    mutationFn: (input: UpdateProfileInput) =>
      updateProfile(input, accessToken!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}
