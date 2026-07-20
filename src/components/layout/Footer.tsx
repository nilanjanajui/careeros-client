import Link from "next/link";

const PRODUCT_LINKS = [
    { href: "/jobs", label: "Explore Jobs" },
    { href: "/applications/manage", label: "Application Tracking" },
    { href: "/recommendations", label: "AI Recommendations" },
    { href: "/tools/content-generator", label: "Content Generator" },
];

const COMPANY_LINKS = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/help", label: "Help Center" },
];

export function Footer() {
    return (
        <footer className="border-t border-outline-variant bg-surface-container-lowest">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div>
                        <span className="font-heading text-lg font-bold text-primary">CareerOS</span>
                        <p className="mt-3 font-body text-sm text-on-surface-variant">
                            The career operating system for the modern job search.
                        </p>
                        {/* Social links */}
                        <div className="mt-4 flex gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                            >
                                <GitHubIcon />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                            >
                                <LinkedInIcon />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                            >
                                <TwitterIcon />
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="font-body text-sm font-medium text-on-surface">Product</p>
                        <ul className="mt-3 space-y-2">
                            {PRODUCT_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="font-body text-sm text-on-surface-variant hover:text-on-surface">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-body text-sm font-medium text-on-surface">Company</p>
                        <ul className="mt-3 space-y-2">
                            {COMPANY_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="font-body text-sm text-on-surface-variant hover:text-on-surface">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-body text-sm font-medium text-on-surface">Newsletter</p>
                        <p className="mt-3 font-body text-sm text-on-surface-variant">
                            Career tips, sent occasionally.
                        </p>
                        {/* Not wired to anything — no newsletter/email-capture endpoint exists in the backend. UI only. */}
                        <form className="mt-3 flex gap-2">
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full min-w-0 rounded-input border border-outline bg-background px-3 py-2 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-input bg-primary px-4 py-2 font-body text-sm font-medium text-on-primary hover:bg-primary-container"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-outline-variant pt-6 font-body text-xs text-on-surface-variant md:flex-row">
                    <p>© {new Date().getFullYear()} CareerOS. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-on-surface">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-on-surface">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function GitHubIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM6.818 20.452H3.845V9h2.973v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
        </svg>
    );
}