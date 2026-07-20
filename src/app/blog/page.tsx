import Link from "next/link";

const POSTS = [
    {
        slug: "ai-job-search-tips",
        title: "5 Ways AI Is Changing How People Search for Jobs in 2025",
        excerpt:
            "From automated resume screening to AI-powered job matching, the hiring landscape is shifting fast. Here's what job seekers should know — and how to use these tools to your advantage instead of being filtered out by them.",
        date: "June 12, 2025",
        readTime: "5 min read",
    },
    {
        slug: "cover-letter-mistakes",
        title: "The 3 Cover Letter Mistakes That Get You Instantly Rejected",
        excerpt:
            "Hiring managers spend an average of 7 seconds on a cover letter. Generic openings, recycled templates, and mismatched tone are the fastest ways to lose those seconds. Here's what to do instead.",
        date: "May 28, 2025",
        readTime: "4 min read",
    },
    {
        slug: "career-switch-guide",
        title: "Switching Careers? A Practical Guide for 2025",
        excerpt:
            "Career switching doesn't require starting from zero. Most of your skills transfer — the challenge is framing them correctly. This guide breaks down how to identify transferable skills, position yourself in applications, and avoid the most common pitfalls.",
        date: "May 15, 2025",
        readTime: "7 min read",
    },
];

export default function BlogPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="font-heading text-h3 text-on-surface">Blog</h1>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
                Career advice, job search strategies, and tips for getting the most out of CareerOS.
            </p>

            <div className="mt-10 flex flex-col gap-6">
                {POSTS.map((post) => (
                    <article
                        key={post.slug}
                        className="rounded-card bg-surface-container-lowest p-6 shadow-card transition-shadow hover:shadow-elevated"
                    >
                        <div className="flex items-center gap-3 font-body text-xs text-on-surface-variant">
                            <span>{post.date}</span>
                            <span className="h-1 w-1 rounded-full bg-outline-variant" />
                            <span>{post.readTime}</span>
                        </div>
                        <h2 className="mt-3 font-heading text-h5 text-on-surface">
                            {post.title}
                        </h2>
                        <p className="mt-2 font-body text-sm leading-relaxed text-on-surface-variant">
                            {post.excerpt}
                        </p>
                        <Link
                            href={`/blog`}
                            className="mt-4 inline-block font-body text-sm font-medium text-primary hover:underline"
                        >
                            Read more →
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}