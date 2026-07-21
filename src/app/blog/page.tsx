import Link from "next/link";
import * as motion from "framer-motion/client";

const POSTS = [
    {
        slug: "ai-job-search-tips",
        title: "5 Ways AI Is Changing How People Search for Jobs in 2025",
        excerpt:
            "From automated resume screening to AI-powered job matching, the hiring landscape is shifting fast. Here's what job seekers should know — and how to use these tools to your advantage instead of being filtered out by them.",
        date: "June 12, 2025",
        readTime: "5 min read",
        category: "Industry Trends",
    },
    {
        slug: "cover-letter-mistakes",
        title: "The 3 Cover Letter Mistakes That Get You Instantly Rejected",
        excerpt:
            "Hiring managers spend an average of 7 seconds on a cover letter. Generic openings, recycled templates, and mismatched tone are the fastest ways to lose those seconds. Here's what to do instead.",
        date: "May 28, 2025",
        readTime: "4 min read",
        category: "Career Advice",
    },
    {
        slug: "career-switch-guide",
        title: "Switching Careers? A Practical Guide for 2025",
        excerpt:
            "Career switching doesn't require starting from zero. Most of your skills transfer — the challenge is framing them correctly. This guide breaks down how to identify transferable skills, position yourself in applications, and avoid the most common pitfalls.",
        date: "May 15, 2025",
        readTime: "7 min read",
        category: "Guides",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="mx-auto max-w-4xl px-4 py-20 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h1 className="font-heading text-h1-mobile md:text-h1 text-on-surface">
                        CareerOS <span className="text-primary">Blog</span>
                    </h1>
                    <p className="mt-4 font-body text-body-lg text-on-surface-variant max-w-2xl">
                        Career advice, job search strategies, and tips for getting the most out of our platform.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-8"
                >
                    {POSTS.map((post) => (
                        <motion.article
                            variants={itemVariants}
                            key={post.slug}
                            className="rounded-card bg-surface-container-lowest p-8 shadow-card hover:shadow-elevated transition-shadow border border-outline-variant/30 group"
                        >
                            <div className="flex flex-wrap items-center gap-3 font-body text-xs text-on-surface-variant mb-4">
                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                    {post.category}
                                </span>
                                <span>{post.date}</span>
                                <span className="h-1 w-1 rounded-full bg-outline-variant" />
                                <span className="flex items-center gap-1.5">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                    {post.readTime}
                                </span>
                            </div>
                            
                            <Link href={`/blog`}>
                                <h2 className="font-heading text-h4 text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                                    {post.title}
                                </h2>
                            </Link>
                            
                            <p className="mt-3 font-body text-sm leading-relaxed text-on-surface-variant max-w-3xl">
                                {post.excerpt}
                            </p>
                            
                            <Link
                                href={`/blog`}
                                className="mt-6 inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:text-primary-container transition-colors"
                            >
                                Read article
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}