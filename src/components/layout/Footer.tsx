import Link from "next/link";

const PRODUCT_LINKS = [
    { href: "/jobs", label: "Explore Jobs" },
    { href: "/applications/manage", label: "Application Tracking" },
    { href: "/#recommendations", label: "AI Recommendations" },
];

const COMPANY_LINKS = [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
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