"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useCreateApplicationMutation } from "@/hooks/useApplications";
import { ApplicationStatus } from "@/types/application";

function AddApplicationForm() {
    const router = useRouter();
    const mutation = useCreateApplicationMutation();

    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [status, setStatus] = useState<ApplicationStatus>("saved");
    const [shortNote, setShortNote] = useState("");
    const [notes, setNotes] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [companyLogoUrl, setCompanyLogoUrl] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        mutation.mutate(
            {
                jobTitle,
                company,
                status,
                shortNote: shortNote || undefined,
                notes: notes || undefined,
                dateApplied: dateApplied || undefined,
                companyLogoUrl: companyLogoUrl || undefined,
            },
            { onSuccess: () => router.push("/applications/manage") },
        );
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-12">
            <h1 className="font-heading text-h3 text-on-surface">Track a new application</h1>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 rounded-card bg-surface-container-lowest p-8 shadow-card">
                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Job title</span>
                    <input
                        required
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Company</span>
                    <input
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Status</span>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="saved">Saved</option>
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Date applied</span>
                    <input
                        type="date"
                        value={dateApplied}
                        onChange={(e) => setDateApplied(e.target.value)}
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Company Logo URL <span className="text-on-surface-variant font-normal">(optional)</span></span>
                    <input
                        value={companyLogoUrl}
                        onChange={(e) => setCompanyLogoUrl(e.target.value)}
                        placeholder="https://example.com/logo.png"
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Short note</span>
                    <input
                        value={shortNote}
                        onChange={(e) => setShortNote(e.target.value)}
                        placeholder="e.g. Referred by Alex"
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Notes</span>
                    <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Paste the job description or add details"
                        className="rounded-input border border-outline bg-background p-4 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                {mutation.isError && (
                    <p className="font-body text-sm text-error">{mutation.error.message}</p>
                )}

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="mt-2 rounded-input bg-primary px-6 py-3 font-body text-sm font-medium text-on-primary shadow-card disabled:opacity-40"
                >
                    {mutation.isPending ? "Saving…" : "Save application"}
                </button>
            </form>
        </div>
    );
}

export default function AddApplicationPage() {
    return (
        <ProtectedRoute>
            <AddApplicationForm />
        </ProtectedRoute>
    );
}
