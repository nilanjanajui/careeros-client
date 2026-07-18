import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} from "@/lib/api/applications";
import { ApplicationStatus, CreateApplicationInput } from "@/types/application";
import { useAuthStore } from "@/store/authStore";

export function useApplicationsQuery() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => fetchApplications(accessToken!),
    enabled: Boolean(accessToken),
  });
}

export function useCreateApplicationMutation() {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);
  return useMutation({
    mutationFn: (input: CreateApplicationInput) =>
      createApplication(input, accessToken!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
}

export function useUpdateApplicationStatusMutation() {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplicationStatus(id, status, accessToken!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
}

export function useDeleteApplicationMutation() {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);
  return useMutation({
    mutationFn: (id: string) => deleteApplication(id, accessToken!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
}
