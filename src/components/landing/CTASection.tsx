import Link from "next/link";

export function CTASection() {
    return (
        <section className="mx-auto max-w-4xl px-4 py-20 text-center">
            <h2 className="font-heading text-h2-mobile text-on-surface md:text-h2">Ready to search smarter?</h2>
            <p className="mt-4 font-body text-body-lg text-on-surface-variant">
                Build your profile in a few minutes and let the AI find your next role.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                    href="/register"
                    className="rounded-input bg-primary px-8 py-4 font-body text-base font-medium text-on-primary shadow-card transition-colors hover:bg-primary-container"
                >
                    Get Started Free
                </Link>
                <Link
                    href="/jobs"
                    className="rounded-input border border-outline px-8 py-4 font-body text-base font-medium text-on-surface hover:bg-surface-container-low"
                >
                    Browse Jobs First
                </Link>
            </div>
        </section>
    );
}