"use client";
import Link from "next/link";
import { Job } from "@/types/job";

function formatSalary(job: Job): string | null {
    if (!job.salaryMin && !job.salaryMax) return null;
    const fmt = (n: number) => `$${Math.round(n / 1000)}k`;
    if (job.salaryMin && job.salaryMax) return `${fmt(job.salaryMin)} – ${fmt(job.salaryMax)}`;
    return fmt(job.salaryMin ?? job.salaryMax ?? 0);
}

export function JobCard({ job }: { job: Job }) {
    const salary = formatSalary(job);
    const fallbackLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=4F46E5&color=fff&bold=true`;

    return (
        <Link
            href={`/jobs/${job.id}`}
            className="flex flex-col gap-4 rounded-card bg-surface-container-lowest p-8 shadow-card transition-shadow hover:shadow-elevated"
        >
            <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={job.companyLogoUrl}
                    alt={`${job.company} logo`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-media object-contain"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackLogo;
                    }}
                />
                <div className="min-w-0">
                    <p className="truncate font-body text-sm font-medium text-on-surface-variant">{job.company}</p>
                    <p className="truncate font-body text-xs text-on-surface-variant">{job.location}</p>
                </div>
            </div>

            <h3 className="font-heading text-h5 text-on-surface line-clamp-2">{job.title}</h3>

            <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-secondary-container px-3 py-1 font-body text-xs font-medium text-on-secondary-container">
                    {job.category}
                </span>
                {job.contractType && (
                    <span className="rounded-full bg-secondary-container px-3 py-1 font-body text-xs font-medium text-on-secondary-container">
                        {job.contractType.replace("_", " ")}
                    </span>
                )}
            </div>

            {salary && <p className="font-body text-sm font-medium text-primary">{salary}</p>}
        </Link>
    );
}

export function JobCardSkeleton() {
    return (
        <div className="flex flex-col gap-4 rounded-card bg-surface-container-lowest p-8 shadow-card">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-media bg-surface-container" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 w-2/3 animate-pulse rounded bg-surface-container" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-surface-container" />
                </div>
            </div>
            <div className="h-5 w-4/5 animate-pulse rounded bg-surface-container" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-surface-container" />
        </div>
    );
}