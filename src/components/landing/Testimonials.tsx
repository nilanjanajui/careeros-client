const TESTIMONIALS = [
    {
        name: "Rafiq Ahmed",
        role: "Junior Developer",
        quote:
            "I was juggling three different spreadsheets and two job boards. CareerOS replaced all of that — the AI recommendations actually found roles I hadn't thought to search for.",
    },
    {
        name: "Priya Nair",
        role: "Career Switcher, UX → Frontend",
        quote:
            "The content generator saved me hours. I pasted a job description and got a cover letter that actually referenced my transferable skills instead of generic filler.",
    },
    {
        name: "Marcus Chen",
        role: "Recent CS Graduate",
        quote:
            "Being able to track every application status in one place and see my pipeline on the dashboard kept me sane during a three-month search. Landed an offer through a role the AI matched me with.",
    },
];

export function Testimonials() {
    return (
        <section className="bg-surface-container-low py-20">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-center font-heading text-h2-mobile text-on-surface md:text-h2">
                    What job seekers are saying
                </h2>
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {TESTIMONIALS.map((t) => (
                        <div
                            key={t.name}
                            className="flex flex-col justify-between rounded-card bg-surface-container-lowest p-6 shadow-card"
                        >
                            <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container font-body text-sm font-semibold text-on-primary-container">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-body text-sm font-medium text-on-surface">{t.name}</p>
                                    <p className="font-body text-xs text-on-surface-variant">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
