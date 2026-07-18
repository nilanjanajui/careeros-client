"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validation/authSchemas";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const setAccessToken = useAuthStore((s) => s.setAccessToken);
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } =
        useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

    async function onSubmit(data: LoginInput) {
        setServerError(null);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // required so the refreshToken cookie gets set
            body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) {
            setServerError(json.error || "Login failed");
            return;
        }
        setAccessToken(json.accessToken);
        router.push("/dashboard");
    }

    function fillDemoCredentials() {
        setValue("email", "demo@careeros.app");
        setValue("password", "DemoPass123");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm rounded-card bg-surface-container-lowest p-8 shadow-card">
                <h1 className="font-heading text-2xl font-bold text-on-surface">Log in to CareerOS</h1>
                <p className="mt-1 font-body text-sm text-on-surface-variant">Welcome back.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-input border border-outline bg-surface-container-low px-4 py-2.5 font-body text-sm outline-none focus:ring-2 focus:ring-primary-container"
                        />
                        {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-input border border-outline bg-surface-container-low px-4 py-2.5 font-body text-sm outline-none focus:ring-2 focus:ring-primary-container"
                        />
                        {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
                    </div>

                    {serverError && <p className="text-sm text-error">{serverError}</p>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-input bg-primary py-2.5 font-body text-sm font-medium text-on-primary hover:opacity-90 disabled:opacity-50"
                    >
                        {isSubmitting ? "Logging in…" : "Log in"}
                    </button>

                    <button
                        type="button"
                        onClick={fillDemoCredentials}
                        className="w-full rounded-input border border-outline py-2.5 font-body text-sm text-on-surface hover:bg-surface-container-low"
                    >
                        Use demo account
                    </button>
                </form>

                <div className="my-6 flex items-center gap-2 text-xs text-on-surface-variant">
                    <div className="h-px flex-1 bg-outline" /> or <div className="h-px flex-1 bg-outline" />
                </div>
                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
                    className="block w-full rounded-input border border-outline py-2.5 text-center font-body text-sm text-on-surface hover:bg-surface-container-low"
                >
                    Sign in with Google
                </a>
                <p className="mt-6 text-center font-body text-sm text-on-surface-variant">
                    No account? <a href="/register" className="text-primary">Register</a>
                </p>
            </div>
        </div>
    );
}