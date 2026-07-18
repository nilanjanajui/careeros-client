"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function AuthHydrator() {
    const setAccessToken = useAuthStore((s) => s.setAccessToken);
    const setHydrated = useAuthStore((s) => s.setHydrated);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (data?.accessToken) setAccessToken(data.accessToken);
            })
            .finally(() => setHydrated(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}