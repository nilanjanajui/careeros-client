"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useGenerateRecommendationsMutation, useLogInteractionMutation } from "@/hooks/useRecommendations";
import { useCreateApplicationMutation } from "@/hooks/useApplications";
import { Recommendation } from "@/types/recommendation";

function RecommendationCard({
    recommendation,
    onDismiss,
}: {
    recommendation: Recommendation;
    onDismiss: (jobId: string) => void;
}) {
    const { job, fitScore, reasoning } = recommendation;
    const logInteraction = useLogInteractionMutation();
    const saveApplication = useCreateApplicationMutation();
    const [saved, setSaved] = useState(false);

    function handleSave() {
        saveApplication.mutate({
            jobTitle: job.title,
            company: job.company,
            companyLogoUrl: job.companyLogoUrl,
            status: "saved",
            externalJobId: job.id,
            notes: job.description,
        });
        logInteraction.mutate({ externalJobId: job.id, jobTitle: job.title, company: job.company, action: "saved" });
        setSaved(true);
    }

    function handleDismiss() {
        logInteraction.mutate({ externalJobId: job.id, jobTitle: job.title, company: job.company, action: "dismissed" });
        onDismiss(job.id);
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex flex-col gap-3 rounded-card bg-surface-container-lowest p-6 shadow-card"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <Link href={`/jobs/${job.id}`} className="font-heading text-h5 text-on-surface hover:underline">
                        {job.title}
                    </Link>
                    <p className="mt-1 font-body text-sm text-on-surface-variant">{job.company} · {job.location}</p>
                </div>
                <span className="shrink-0 rounded-full bg-tertiary-container px-3 py-1 font-body text-xs font-semibold text-on-tertiary-container">
                    {fitScore}% match
                </span>
            </div>

            <p className="font-body text-sm text-on-surface-variant">{reasoning}</p>

            <div className="mt-1 flex gap-3">
                {saved ? (
                    <span className="font-body text-sm font-medium text-on-surface-variant">✓ Saved to Applications</span>
                ) : (
                    <button
                        onClick={handleSave}
                        className="rounded-input bg-primary px-4 py-2 font-body text-xs font-medium text-on-primary hover:bg-primary-container"
                    >
                        Save
                    </button>
                )}
                <button
                    onClick={handleDismiss}
                    className="rounded-input border border-outline px-4 py-2 font-body text-xs font-medium text-on-surface-variant hover:bg-surface-container-low"
                >
                    Not a fit
                </button>
            </div>
        </motion.div>
    );
}

function RecommendationsView() {
    const generate = useGenerateRecommendationsMutation();
    const [dismissed, setDismissed] = useState<Set<string>>(new Set());

    const visible = generate.data?.recommendations.filter((r) => !dismissed.has(r.jobId)) ?? [];

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-heading text-h3 text-on-surface">AI Recommendations</h1>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
                An AI agent searches live listings against your profile and ranks the best matches. This takes a little longer
                than a normal search — it&apos;s actually running multiple searches and reasoning about the results, not just
                returning a canned list.
            </p>

            {!generate.data && (
                <button
                    onClick={() => generate.mutate()}
                    disabled={generate.isPending}
                    className="mt-6 rounded-input bg-primary px-6 py-3 font-body text-sm font-medium text-on-primary shadow-card disabled:opacity-40"
                >
                    {generate.isPending ? "Finding matches…" : "Get AI Recommendations"}
                </button>
            )}

            {generate.isError && (
                <p className="mt-6 rounded-card bg-error-container p-6 font-body text-sm text-on-error-container">
                    {generate.error.message}
                </p>
            )}

            {generate.data && (
                <>
                    <button
                        onClick={() => generate.mutate()}
                        disabled={generate.isPending}
                        className="mt-6 rounded-input border border-outline px-4 py-2 font-body text-xs font-medium text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40"
                    >
                        {generate.isPending ? "Refreshing…" : "Regenerate"}
                    </button>

                    {visible.length === 0 ? (
                        <p className="mt-8 font-body text-sm text-on-surface-variant">
                            No matches left to show — regenerate for a fresh batch.
                        </p>
                    ) : (
                        <div className="mt-6 flex flex-col gap-4">
                            <AnimatePresence mode="popLayout">
                                {visible.map((rec) => (
                                    <RecommendationCard
                                        key={rec.jobId}
                                        recommendation={rec}
                                        onDismiss={(jobId) => setDismissed((prev) => new Set(prev).add(jobId))}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default function RecommendationsPage() {
    return (
        <ProtectedRoute>
            <RecommendationsView />
        </ProtectedRoute>
    );
}