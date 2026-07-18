"use client";
import { useState } from "react";
import { useCompanyReviewsQuery, useCreateReviewMutation } from "@/hooks/useReviews";
import { StarRatingDisplay, StarRatingInput } from "@/components/reviews/StarRating";
import { useAuthStore } from "@/store/authStore";

function reviewerName(userId: { name: string } | string): string {
    return typeof userId === "string" ? "A user" : userId.name;
}

export function CompanyReviews({ company }: { company: string }) {
    const { data, isLoading } = useCompanyReviewsQuery(company);
    const mutation = useCreateReviewMutation(company);
    const hydrated = useAuthStore((s) => s.hydrated);
    const user = useAuthStore((s) => s.user);

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (rating === 0 || !reviewText.trim()) return;
        mutation.mutate(
            { rating, reviewText },
            { onSuccess: () => { setRating(0); setReviewText(""); } },
        );
    }

    const alreadyReviewed = mutation.isError && mutation.error?.message.includes("already reviewed");

    return (
        <div className="mt-10">
            <div className="flex items-center gap-3">
                <h2 className="font-heading text-h5 text-on-surface">Company reviews</h2>
                {data?.averageRating !== null && data?.averageRating !== undefined && (
                    <div className="flex items-center gap-1.5">
                        <StarRatingDisplay value={data.averageRating} />
                        <span className="font-body text-sm text-on-surface-variant">
                            {data.averageRating} ({data.count})
                        </span>
                    </div>
                )}
            </div>

            {isLoading && (
                <p className="mt-4 font-body text-sm text-on-surface-variant">Loading reviews…</p>
            )}

            {!isLoading && data?.reviews.length === 0 && (
                <p className="mt-3 rounded-card bg-surface-container-low p-6 font-body text-sm text-on-surface-variant">
                    No reviews yet for {company}. Be the first to share your experience.
                </p>
            )}

            {!isLoading && (data?.reviews.length ?? 0) > 0 && (
                <ul className="mt-4 space-y-4">
                    {data!.reviews.map((r) => (
                        <li key={r._id} className="rounded-card bg-surface-container-lowest p-6 shadow-card">
                            <div className="flex items-center justify-between">
                                <StarRatingDisplay value={r.rating} />
                                <span className="font-body text-xs text-on-surface-variant">
                                    {new Date(r.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="mt-2 font-body text-sm text-on-surface">{r.reviewText}</p>
                            <p className="mt-2 font-body text-xs text-on-surface-variant">— {reviewerName(r.userId)}</p>
                        </li>
                    ))}
                </ul>
            )}

            {hydrated && user ? (
                <form onSubmit={handleSubmit} className="mt-6 rounded-card bg-surface-container-lowest p-6 shadow-card">
                    <p className="font-body text-sm font-medium text-on-surface">Leave a review</p>
                    <div className="mt-3">
                        <StarRatingInput value={rating} onChange={setRating} />
                    </div>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder={`What's it like working at ${company}?`}
                        rows={3}
                        className="mt-3 w-full rounded-input border border-outline bg-background p-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                    {alreadyReviewed && (
                        <p className="mt-2 font-body text-sm text-error">You&apos;ve already reviewed this company.</p>
                    )}
                    <button
                        type="submit"
                        disabled={mutation.isPending || rating === 0 || !reviewText.trim()}
                        className="mt-3 rounded-input bg-primary px-5 py-2.5 font-body text-sm font-medium text-on-primary disabled:opacity-40"
                    >
                        {mutation.isPending ? "Submitting…" : "Submit review"}
                    </button>
                </form>
            ) : (
                <p className="mt-6 font-body text-sm text-on-surface-variant">
                    <a href="/login" className="text-primary underline">Log in</a> to leave a review.
                </p>
            )}
        </div>
    );
}