"use client";
import { useState } from "react";

const CONTACT_EMAIL = "support@careeros.app";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const subject = encodeURIComponent(`CareerOS contact form — ${name || "no name given"}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-16">
            <h1 className="font-heading text-h3 text-on-surface">Contact</h1>
            <p className="mt-4 font-body text-sm text-on-surface-variant">
                This opens a pre-filled email in your own mail client — there&apos;s no live support inbox behind this form
                yet, so nothing is sent silently in the background.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 rounded-card bg-surface-container-lowest p-8 shadow-card">
                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Name</span>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>
                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Your email</span>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>
                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Message</span>
                    <textarea
                        required
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="rounded-input border border-outline bg-background p-4 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>
                <button
                    type="submit"
                    className="rounded-input bg-primary px-6 py-3 font-body text-sm font-medium text-on-primary shadow-card"
                >
                    Open in email client
                </button>
            </form>
        </div>
    );
}