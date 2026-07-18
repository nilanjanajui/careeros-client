"use client";
import { use } from "react";
import Link from "next/link";
import { useJobQuery, useJobsQuery } from "@/hooks/useJobs";
import { JobCard, JobCardSkeleton } from "@/components/explore/JobCard";
import { CompanyReviews } from "@/components/reviews/CompanyReviews";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: job, isLoading, isError } = useJobQuery(id);

    const related = useJobsQuery({ category: job?.category, page: 1 });

    if (isLoading) {
        return <div className="mx-auto max-w-4xl px-4 py-16 font-body text-on-surface-variant">Loading listing…</div>;
    }

    if (isError || job === null) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-16 text-center">
                <h1 className="font-heading text-h4 text-on-surface">This listing isn&apos;t available anymore</h1>
                <p className="mt-3 font-body text-on-surface-variant">
                    It may have expired or been removed from search results. Try browsing similar roles instead.
                </p>
                <Link href="/jobs" className="mt-6 inline-block rounded-input bg-primary px-6 py-3 font-body text-on-primary">
                    Back to Explore
                </Link>
            </div>
        );
    }

    if (!job) return null;

    const fallbackLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=4F46E5&color=fff&bold=true`;
    const otherRelated = related.data?.jobs.filter((j) => j.id !== job.id).slice(0, 4) ?? [];

    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="rounded-card bg-surface-container-lowest p-8 shadow-card md:p-12">
                <div className="flex items-start gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={job.companyLogoUrl}
                        alt={`${job.company} logo`}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-media object-contain"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackLogo; }}
                    />
                    <div>
                        <h1 className="font-heading text-h3 text-on-surface">{job.title}</h1>
                        <p className="mt-1 font-body text-body-md text-on-surface-variant">{job.company} · {job.location}</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-secondary-container px-3 py-1 font-body text-xs font-medium text-on-secondary-container">
                        {job.category}
                    </span>
                    {job.contractType && (
                        <span className="rounded-full bg-secondary-container px-3 py-1 font-body text-xs font-medium text-on-secondary-container">
                            {job.contractType.replace("_", " ")}
                        </span>
                    )}
                    {(job.salaryMin || job.salaryMax) && (
                        <span className="rounded-full bg-tertiary-container px-3 py-1 font-body text-xs font-medium text-on-tertiary-container">
                            {job.salaryMin && job.salaryMax
                                ? `$${Math.round(job.salaryMin / 1000)}k – $${Math.round(job.salaryMax / 1000)}k`
                                : `$${Math.round((job.salaryMin ?? job.salaryMax ?? 0) / 1000)}k`}
                        </span>
                    )}
                </div>

                <a
                    href={job.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block rounded-input bg-primary px-6 py-3 font-body text-sm font-medium text-on-primary shadow-card hover:bg-primary-container"
                >
                    Apply on source site
                </a>

                <hr className="my-8 border-outline" />

                <h2 className="font-heading text-h5 text-on-surface">Description</h2>
                {/* Adzuna descriptions come pre-truncated with "..." and occasionally contain raw HTML entities — rendered as plain text since we don't control source formatting */}
                <p className="mt-3 whitespace-pre-line font-body text-body-md text-on-surface-variant">
                    {job.description}
                </p>
            </div>

            <div className="mt-10">
                <h2 className="font-heading text-h5 text-on-surface">Company reviews</h2>
                <p className="mt-3 rounded-card bg-surface-container-low p-6 font-body text-sm text-on-surface-variant">
                    No reviews yet for {job.company}.
                </p>
            </div>
            <CompanyReviews company={job.company} />

            {
                otherRelated.length > 0 && (
                    <div className="mt-10">
                        <h2 className="font-heading text-h5 text-on-surface">Related roles</h2>
                        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {related.isLoading
                                ? Array.from({ length: 2 }).map((_, i) => <JobCardSkeleton key={i} />)
                                : otherRelated.map((j) => <JobCard key={j.id} job={j} />)}
                        </div>
                    </div>
                )
            }
        </div>
    );
}