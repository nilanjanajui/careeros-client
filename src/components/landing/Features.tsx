import Link from "next/link";

const FEATURES = [
    {
        title: "AI Recommendations",
        description:
            "An agent searches live listings against your actual skills and experience, then ranks the best matches with a plain-language reason for each one.",
        href: "/recommendations",
    },
    {
        title: "Cover Letter & Resume Bullets",
        description:
            "Generate tailored content for any specific listing, adjustable by length, and regenerate as many times as you need before you're happy with it.",
        href: "/tools/content-generator",
    },
    {
        title: "Application Tracking",
        description:
            "Track every application from saved through offer or rejection in one table, with company reviews from other job seekers alongside each listing.",
        href: "/applications/manage",
    },
    {
        title: "Real-Time Job Search",
        description:
            "Search, filter, and sort live listings pulled directly from the job market — not a stale cache updated once a week.",
        href: "/jobs",
    },
];

export function Features() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="text-center font-heading text-h2-mobile text-on-surface md:text-h2">
                Everything you need to search smarter
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map((feature) => (
                    <Link
                        key={feature.title}
                        href={feature.href}
                        className="flex flex-col rounded-card bg-surface-container-lowest p-6 shadow-card transition-shadow hover:shadow-elevated"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-input bg-primary-container">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        </div>
                        <h3 className="mt-4 font-heading text-h5 text-on-surface">{feature.title}</h3>
                        <p className="mt-2 font-body text-sm text-on-surface-variant">{feature.description}</p>
                        <span className="mt-4 font-body text-sm font-medium text-primary">Try it →</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}