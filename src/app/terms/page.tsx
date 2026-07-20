export default function TermsPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="font-heading text-h3 text-on-surface">Terms of Service</h1>
            <div className="mt-6 flex flex-col gap-5 font-body text-body-md text-on-surface-variant">
                <p>CareerOS is free to use. By creating an account, you agree to the following:</p>

                <div>
                    <h2 className="font-heading text-h5 text-on-surface">Job listings and AI content</h2>
                    <p className="mt-2">
                        Job listings are sourced from third-party job boards via Adzuna — we don&apos;t control their accuracy or
                        availability, and a listing may change or disappear between when you see it and when you apply.
                        AI-generated cover letters and resume bullets are a starting draft, not a guaranteed-accurate
                        representation of your background — review anything generated before you send it.
                    </p>
                </div>

                <div>
                    <h2 className="font-heading text-h5 text-on-surface">Acceptable use</h2>
                    <p className="mt-2">
                        Don&apos;t use the platform to scrape job data at scale, submit false company reviews, or attempt to
                        access another user&apos;s account or data.
                    </p>
                </div>

                <div>
                    <h2 className="font-heading text-h5 text-on-surface">No warranty</h2>
                    <p className="mt-2">
                        The service is provided as-is, without guarantees of uptime, accuracy of AI-generated content, or job
                        placement outcomes.
                    </p>
                </div>

                <div>
                    <h2 className="font-heading text-h5 text-on-surface">Changes</h2>
                    <p className="mt-2">
                        These terms may be updated as the product changes. Continued use after a change means you accept the
                        update.
                    </p>
                </div>
            </div>
        </div>
    );
}