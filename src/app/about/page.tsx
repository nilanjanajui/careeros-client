export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="font-heading text-h3 text-on-surface">About CareerOS</h1>
            <div className="mt-6 flex flex-col gap-4 font-body text-body-md text-on-surface-variant">
                <p>
                    CareerOS is a job-search platform built to bring three things job seekers usually juggle across separate
                    tools — job discovery, application tracking, and AI-assisted writing — into a single place.
                </p>
                <p>
                    Job listings are pulled live from Adzuna&apos;s job search API, so what you see reflects the current
                    market rather than a database that goes stale between updates. The AI recommendation engine works the
                    same way: it runs real searches against your profile rather than matching you against a static, pre-built
                    list.
                </p>
                <p>
                    The application tracker, company reviews, and AI content generator (cover letters and resume bullets) are
                    built directly into the same flow, so you&apos;re not exporting data between five different tabs to get
                    through a single application.
                </p>
            </div>
        </div>
    );
}