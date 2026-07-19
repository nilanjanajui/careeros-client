"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const LOGGED_OUT_LINKS = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Explore Jobs" },
];

const LOGGED_IN_LINKS = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/applications/manage", label: "Applications" },
    { href: "/profile", label: "Profile" }
];

export function Navbar() {
    const user = useAuthStore((s) => s.user);
    const hydrated = useAuthStore((s) => s.hydrated);
    const pathname = usePathname();
    const isAuthed = hydrated && Boolean(user);
    const links = isAuthed ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

    return (
        <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface-container-lowest">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="font-heading text-lg font-bold text-primary">
                    CareerOS
                </Link>

                <nav className="hidden items-center gap-6 font-body text-sm font-medium md:flex">
                    {links.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    active
                                        ? "text-primary"
                                        : "text-on-surface-variant hover:text-on-surface"
                                }
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    {isAuthed ? (
                        <>
                            <button
                                type="button"
                                aria-label="Notifications"
                                className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container-low"
                            >
                                <BellIcon />
                            </button>
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container font-body text-sm font-medium text-on-primary-container"
                                aria-label={user?.name ?? "Account"}
                            >
                                {(user?.name ?? "U").charAt(0).toUpperCase()}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="hidden font-body text-sm font-medium text-on-surface-variant hover:text-on-surface sm:inline"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-input bg-primary px-4 py-2 font-body text-sm font-medium text-on-primary transition-colors hover:bg-primary-container"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

function BellIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    );
}