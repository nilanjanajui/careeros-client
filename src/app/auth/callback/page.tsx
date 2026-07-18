"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function AuthCallback() {
    const router = useRouter();
    const params = useSearchParams();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    useEffect(() => {
        const token = params.get("token");
        if (token) {
            setAccessToken(token);
            router.push("/dashboard");
        } else {
            router.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <p>Signing you in…</p>;
}