"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validation/authSchemas";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const setAccessToken = useAuthStore((s) => s.setAccessToken);
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

    async function onSubmit(data: RegisterInput) {
        setServerError(null);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) {
            setServerError(json.error || "Registration failed");
            return;
        }
        setAccessToken(json.accessToken);
        router.push("/dashboard");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm rounded-card bg-surface-container-lowest p-8 shadow-card">
                <h1 className="font-heading text-2xl font-bold text-on-surface">Create your account</h1>
                <p className="mt-1 font-body text-sm text-on-surface-variant">Start your career search, organized.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div>
                        <input
                            {...register("name")}
                            placeholder="Full name"
                            className="w-full rounded-input border border-outline bg-surface-container-low px-4 py-2.5 font-body text-sm outline-none focus:ring-2 focus:ring-primary-container"
                        />
                        {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
                    </div>

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
                        {isSubmitting ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-2 text-xs text-on-surface-variant">
                    <div className="h-px flex-1 bg-outline" /> or <div className="h-px flex-1 bg-outline" />
                </div>


                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
                    className="block w-full rounded-input border border-outline py-2.5 text-center font-body text-sm text-on-surface hover:bg-surface-container-low"
                >
                    Sign up with Google
                </a>

                <p className="mt-6 text-center font-body text-sm text-on-surface-variant">
                    Already have an account? <a href="/login" className="text-primary">Log in</a>
                </p>
            </div>
        </div>
    );
}