"use client";
import { motion } from "framer-motion";

const features = [
    {
        title: "Unified Job Discovery",
        description: "Job listings are pulled live from Adzuna's job search API, so what you see reflects the current market rather than a database that goes stale between updates.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
            </svg>
        ),
    },
    {
        title: "AI-Powered Matching",
        description: "The AI recommendation engine runs real searches against your profile rather than matching you against a static, pre-built list, finding roles you actually want.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
    {
        title: "All-in-One Tracker",
        description: "The application tracker, company reviews, and AI content generator are built directly into the same flow. No more exporting data between five different tabs.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 w-full max-w-4xl -translate-x-1/2 h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-5xl px-4 py-20 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-heading text-h1-mobile md:text-h1 text-on-surface"
                    >
                        Building the modern <br className="hidden md:block" />
                        <span className="text-primary">career operating system</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-6 font-body text-body-lg text-on-surface-variant leading-relaxed"
                    >
                        CareerOS is a job-search platform built to bring three things job seekers usually juggle across separate tools — job discovery, application tracking, and AI-assisted writing — into a single, intuitive place.
                    </motion.p>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="bg-surface-container-lowest p-8 rounded-card shadow-card hover:shadow-elevated transition-all border border-outline-variant/30 group"
                        >
                            <div className="h-12 w-12 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="font-heading text-h5 text-on-surface mb-3">
                                {feature.title}
                            </h3>
                            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}