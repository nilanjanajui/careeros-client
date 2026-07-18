"use client";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
    useApplicationsQuery,
    useUpdateApplicationStatusMutation,
    useDeleteApplicationMutation,
} from "@/hooks/useApplications";
import { StatusBadge } from "@/components/applications/StatusBadge";
import { ApplicationStatus } from "@/types/application";

const STATUS_OPTIONS: ApplicationStatus[] = ["saved", "applied", "interview", "offer", "rejected"];

function ManageApplicationsTable() {
    const { data: applications, isLoading, isError } = useApplicationsQuery();
    const updateStatus = useUpdateApplicationStatusMutation();
    const deleteApp = useDeleteApplicationMutation();

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <div className="flex items-center justify-between">
                <h1 className="font-heading text-h3 text-on-surface">My Applications</h1>
                <Link
                    href="/applications/add"
                    className="rounded-input bg-primary px-5 py-2.5 font-body text-sm font-medium text-on-primary shadow-card hover:bg-primary-container"
                >
                    + Add application
                </Link>
            </div>

            {isLoading && <p className="mt-8 font-body text-on-surface-variant">Loading…</p>}
            {isError && (
                <p className="mt-8 rounded-card bg-error-container p-6 font-body text-on-error-container">
                    Couldn&apos;t load your applications.
                </p>
            )}

            {!isLoading && applications?.length === 0 && (
                <p className="mt-12 rounded-card bg-surface-container-low p-8 text-center font-body text-on-surface-variant">
                    Nothing tracked yet.{" "}
                    <Link href="/applications/add" className="text-primary underline">Add your first one</Link>.
                </p>
            )}

            {!isLoading && (applications?.length ?? 0) > 0 && (
                <div className="mt-8 overflow-x-auto rounded-card bg-surface-container-lowest shadow-card">
                    <table className="w-full min-w-160 font-body text-sm">
                        <thead>
                            <tr className="border-b border-outline-variant text-left text-on-surface-variant">
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Company</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Date applied</th>
                                <th className="px-6 py-4 font-medium" />
                            </tr>
                        </thead>
                        <tbody>
                            {applications!.map((app) => (
                                <tr key={app._id} className="border-b border-outline-variant last:border-0">
                                    <td className="px-6 py-4 text-on-surface">{app.jobTitle}</td>
                                    <td className="px-6 py-4 text-on-surface-variant">{app.company}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <StatusBadge status={app.status} />
                                            <select
                                                value={app.status}
                                                onChange={(e) =>
                                                    updateStatus.mutate({ id: app._id, status: e.target.value as ApplicationStatus })
                                                }
                                                className="rounded-input border border-outline bg-background px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary"
                                                aria-label={`Change status for ${app.jobTitle}`}
                                            >
                                                {STATUS_OPTIONS.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-on-surface-variant">
                                        {app.dateApplied ? new Date(app.dateApplied).toLocaleDateString() : "—"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => {
                                                if (confirm(`Remove "${app.jobTitle}" at ${app.company}?`)) {
                                                    deleteApp.mutate(app._id);
                                                }
                                            }}
                                            className="font-body text-xs font-medium text-error hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default function ManageApplicationsPage() {
    return (
        <ProtectedRoute>
            <ManageApplicationsTable />
        </ProtectedRoute>
    );
}