"use client";
import { useJobsQuery } from "@/hooks/useJobs";

export function LiveStats() {
    const { data, isLoading, isError } = useJobsQuery({ page: 1 });

    return (
        <section className="bg-primary py-16">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-2">
                <div>
                    {isLoading && <p className="font-heading text-3xl font-extrabold text-on-primary">…</p>}
                    {isError && <p className="font-body text-sm text-on-primary/80">Live count unavailable right now</p>}
                    {data && (
                        <p className="font-heading text-5xl font-extrabold text-on-primary">
                            {data.totalResults.toLocaleString()}+
                        </p>
                    )}
                    <p className="mt-2 font-body text-on-primary/80">live job listings searchable right now</p>
                </div>
                <div>
                    <p className="font-heading text-5xl font-extrabold text-on-primary">100%</p>
                    <p className="mt-2 font-body text-on-primary/80">free to use, every feature</p>
                </div>
            </div>
        </section>
    );
}