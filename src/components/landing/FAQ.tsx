"use client";
import { useState } from "react";

const FAQS = [
    {
        q: "Where do the job listings come from?",
        a: "Live listings pulled from Adzuna's job search API — not a database we manually curate, so postings reflect the current market.",
    },
    {
        q: "How does AI matching work?",
        a: "An AI agent reads your profile (skills, experience, preferences, resume text) and searches live listings on your behalf, then scores and explains each match. It only recommends jobs it actually found in a real search — it doesn't invent listings.",
    },
    {
        q: "Is CareerOS free?",
        a: "Yes, every feature on this site is free to use.",
    },
    {
        q: "Is my resume text stored securely?",
        a: "Your profile data, including resume text, is stored in our database and only used to power your own AI recommendations and generated content — it isn't shared with other users or third parties.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="mx-auto max-w-3xl px-4 py-20">
            <h2 className="text-center font-heading text-h2-mobile text-on-surface md:text-h2">Common questions</h2>
            <div className="mt-10 flex flex-col gap-3">
                {FAQS.map((faq, i) => {
                    const open = openIndex === i;
                    return (
                        <div key={faq.q} className="rounded-card bg-surface-container-lowest shadow-card">
                            <button
                                type="button"
                                onClick={() => setOpenIndex(open ? null : i)}
                                className="flex w-full items-center justify-between px-6 py-4 text-left font-body text-sm font-medium text-on-surface"
                                aria-expanded={open}
                            >
                                {faq.q}
                                <span className="ml-4 text-on-surface-variant">{open ? "−" : "+"}</span>
                            </button>
                            {open && (
                                <p className="px-6 pb-4 font-body text-sm text-on-surface-variant">{faq.a}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}