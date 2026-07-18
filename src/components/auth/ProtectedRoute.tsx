"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const accessToken = useAuthStore((s) => s.accessToken);
    const hydrated = useAuthStore((s) => s.hydrated);

    useEffect(() => {
        if (hydrated && !accessToken) {
            router.push("/login");
        }
    }, [hydrated, accessToken, router]);

    if (!hydrated || !accessToken) return null; // or a loading spinner
    return <>{children}</>;
}