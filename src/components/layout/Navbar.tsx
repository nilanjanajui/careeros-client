"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useState, useRef, useEffect } from "react";

const LOGGED_OUT_LINKS = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Explore Jobs" },
];

const LOGGED_IN_LINKS = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Jobs" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/applications/manage", label: "Applications" },
    { href: "/recommendations", label: "Recommendations" },
];

export function Navbar() {
    const user = useAuthStore((s) => s.user);
    const hydrated = useAuthStore((s) => s.hydrated);
    const logout = useAuthStore((s) => s.logout);
    const pathname = usePathname();
    const router = useRouter();
    const isAuthed = hydrated && Boolean(user);
    const links = isAuthed ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    // Close dropdown on route change
    useEffect(() => {
        setDropdownOpen(false);
    }, [pathname]);

    async function handleLogout() {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch {
            // Even if the server call fails, clear client state
        }
        logout();
        setDropdownOpen(false);
        router.push("/");
    }

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

                            {/* Profile avatar dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    id="profile-avatar-btn"
                                    onClick={() =>
                                        setDropdownOpen((prev) => !prev)
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container font-body text-sm font-medium text-on-primary-container transition-shadow hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    aria-label={user?.name ?? "Account"}
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                >
                                    {(user?.name ?? "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </button>

                                {dropdownOpen && (
                                    <div
                                        id="profile-dropdown"
                                        className="absolute right-0 top-full mt-2 w-56 origin-top-right animate-dropdown rounded-card border border-outline-variant bg-surface-container-lowest shadow-elevated"
                                        role="menu"
                                        aria-orientation="vertical"
                                    >
                                        {/* User info header */}
                                        <div className="border-b border-outline-variant px-4 py-3">
                                            <p className="truncate font-body text-sm font-medium text-on-surface">
                                                {user?.name}
                                            </p>
                                            <p className="truncate font-body text-xs text-on-surface-variant">
                                                {user?.email}
                                            </p>
                                        </div>

                                        {/* Menu items */}
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                role="menuitem"
                                                id="dropdown-profile-link"
                                                className="flex items-center gap-3 px-4 py-2.5 font-body text-sm text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                            >
                                                <UserIcon />
                                                My Profile
                                            </Link>
                                            <Link
                                                href="/dashboard"
                                                role="menuitem"
                                                id="dropdown-dashboard-link"
                                                className="flex items-center gap-3 px-4 py-2.5 font-body text-sm text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                            >
                                                <DashboardIcon />
                                                Dashboard
                                            </Link>
                                        </div>

                                        {/* Logout */}
                                        <div className="border-t border-outline-variant py-1">
                                            <button
                                                type="button"
                                                role="menuitem"
                                                id="dropdown-logout-btn"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-3 px-4 py-2.5 font-body text-sm text-error transition-colors hover:bg-error-container/30"
                                            >
                                                <LogoutIcon />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
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

function UserIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function DashboardIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}