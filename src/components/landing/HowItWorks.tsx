const STEPS = [
    { number: "1", title: "Build your profile", description: "Add your skills, experience, and resume text — this powers every AI feature below." },
    { number: "2", title: "Discover jobs", description: "Search live listings, or let the AI agent find and rank matches for you." },
    { number: "3", title: "Generate tailored content", description: "Get a cover letter or resume bullets written for that specific listing." },
    { number: "4", title: "Track and follow through", description: "Save applications, move them through interview stages, and see it all on your dashboard." },
];

export function HowItWorks() {
    return (
        <section className="bg-surface-container-low py-20">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-center font-heading text-h2-mobile text-on-surface md:text-h2">Your path, in four steps</h2>
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map((step) => (
                        <div key={step.number} className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-on-primary">
                                {step.number}
                            </div>
                            <h3 className="mt-4 font-heading text-h5 text-on-surface">{step.title}</h3>
                            <p className="mt-2 font-body text-sm text-on-surface-variant">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}