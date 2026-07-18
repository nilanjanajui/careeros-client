"use client";
import { useState } from "react";
import { useJobsQuery } from "@/hooks/useJobs";
import { JobCard, JobCardSkeleton } from "@/components/explore/JobCard";
import { JobSearchFilters } from "@/types/job";

const SORT_OPTIONS: { value: NonNullable<JobSearchFilters["sortBy"]>; label: string }[] = [
    { value: "relevance", label: "Most relevant" },
    { value: "date", label: "Newest" },
    { value: "salary", label: "Highest salary" },
];

export default function JobsPage() {
    const [what, setWhat] = useState("");
    const [where, setWhere] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState<JobSearchFilters["sortBy"]>("relevance");
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, isPlaceholderData } = useJobsQuery({
        what: what || undefined,
        where: where || undefined,
        category: category || undefined,
        sortBy,
        page,
    });

    const resultsPerPage = data?.resultsPerPage ?? 20;
    const totalPages = data ? Math.ceil(data.totalResults / resultsPerPage) : 1;

    function resetToFirstPage() {
        setPage(1);
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="font-heading text-h2-mobile text-on-surface md:text-h2">Explore Jobs</h1>
            <p className="mt-2 font-body text-body-md text-on-surface-variant">
                {data ? `${data.totalResults.toLocaleString()} listings` : "Searching current openings"}
            </p>

            <div className="mt-8 flex flex-col gap-3 rounded-card bg-surface-container-lowest p-4 shadow-card md:flex-row">
                <input
                    value={what}
                    onChange={(e) => { setWhat(e.target.value); resetToFirstPage(); }}
                    placeholder="Job title or keyword"
                    className="flex-1 rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    value={where}
                    onChange={(e) => { setWhere(e.target.value); resetToFirstPage(); }}
                    placeholder="Location"
                    className="flex-1 rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); resetToFirstPage(); }}
                    placeholder="Category"
                    className="flex-1 rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value as JobSearchFilters["sortBy"]); resetToFirstPage(); }}
                    className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {isError && (
                <p className="mt-8 rounded-card bg-error-container p-6 font-body text-on-error-container">
                    Couldn&apos;t load jobs right now. Try again in a moment.
                </p>
            )}

            {!isError && (
                <div className={`mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ${isPlaceholderData ? "opacity-60" : ""}`}>
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, i) => <JobCardSkeleton key={i} />)
                        : data?.jobs.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
            )}

            {!isLoading && !isError && data?.jobs.length === 0 && (
                <p className="mt-12 text-center font-body text-on-surface-variant">
                    No jobs match those filters. Try broadening your search.
                </p>
            )}

            {!isLoading && !isError && (data?.jobs.length ?? 0) > 0 && (
                <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="rounded-input border border-outline px-4 py-2 font-body text-sm disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <span className="font-body text-sm text-on-surface-variant">
                        Page {page} of {totalPages || 1}
                    </span>
                    <button
                        onClick={() => setPage((p) => (totalPages ? Math.min(totalPages, p + 1) : p + 1))}
                        disabled={totalPages ? page >= totalPages : true}
                        className="rounded-input border border-outline px-4 py-2 font-body text-sm disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}