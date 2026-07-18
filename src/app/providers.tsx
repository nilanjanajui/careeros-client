"use client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <AuthHydrator />
            {children}
        </QueryClientProvider>
    );
}

export function AuthHydrator() {
    const setAccessToken = useAuthStore((s) => s.setAccessToken);
    const setUser = useAuthStore((s) => s.setUser);
    const setHydrated = useAuthStore((s) => s.setHydrated);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (data?.accessToken) setAccessToken(data.accessToken);
                if (data?.user) setUser(data.user);
            })
            .finally(() => setHydrated(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}