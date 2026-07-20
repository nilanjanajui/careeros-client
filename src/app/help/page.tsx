import { FAQ } from "@/components/landing/FAQ";

const STEPS = [
    { title: "1. Create an account", body: "Register with email/password, or the demo account on the login page if you just want to look around." },
    { title: "2. Fill out your profile", body: "Add your skills, experience level, and paste your resume text on the Profile page — this is what the AI recommendation engine and content generator both read from." },
    { title: "3. Explore or get AI matches", body: "Search jobs manually on the Explore page, or use Recommendations to have an AI agent search and rank matches for you." },
    { title: "4. Track your applications", body: "Save jobs from a listing page, or add one manually — then move it through statuses (saved → applied → interview → offer/rejected) as things progress." },
];

export default function HelpPage() {
    return (
        <>
            <div className="mx-auto max-w-3xl px-4 py-16">
                <h1 className="font-heading text-h3 text-on-surface">Help Center</h1>

                <div className="mt-8 flex flex-col gap-6">
                    {STEPS.map((step) => (
                        <div key={step.title} className="rounded-card bg-surface-container-lowest p-6 shadow-card">
                            <h2 className="font-heading text-h5 text-on-surface">{step.title}</h2>
                            <p className="mt-2 font-body text-sm text-on-surface-variant">{step.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            <FAQ />
        </>
    );
}