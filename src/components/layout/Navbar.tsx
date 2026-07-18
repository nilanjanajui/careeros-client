"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export function Navbar() {
    const user = useAuthStore((s) => s.user);
    const hydrated = useAuthStore((s) => s.hydrated);

    return (
        <header className="sticky top-4 z-50 mx-auto flex h-20 w-[calc(100%-32px)] max-w-4xl items-center justify-between rounded-full border border-outline bg-white/80 px-6 shadow-card backdrop-blur-md">
            <Link href="/" className="font-heading text-lg font-bold text-on-surface">
                Career<span className="text-primary">OS</span>
            </Link>
            <nav className="flex items-center gap-6 font-body text-sm font-medium text-on-surface-variant">
                <Link href="/" className="hidden hover:text-on-surface md:inline">Home</Link>
                <Link href="/jobs" className="hidden hover:text-on-surface md:inline">Explore Jobs</Link>
                {hydrated && user ? (
                    <Link href="/dashboard" className="hover:text-on-surface">Dashboard</Link>
                ) : (
                    <Link
                        href="/login"
                        className="rounded-input bg-primary px-4 py-2 text-on-primary transition-colors hover:bg-primary-container"
                    >
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
}