"use client";
import { useState } from "react";
import { motion } from "framer-motion";

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
        <main className="min-h-[calc(100vh-64px)] bg-background flex flex-col items-center justify-center relative overflow-hidden px-4 py-16">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="font-heading text-h2 text-on-surface">Get in touch</h1>
                    <p className="mt-4 font-body text-body-md text-on-surface-variant max-w-lg mx-auto">
                        Have a question about CareerOS? Fill out the form below. 
                        This opens a pre-filled email in your own mail client.
                    </p>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-5 rounded-card bg-surface-container-lowest p-8 md:p-10 shadow-elevated border border-outline-variant/30"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <label className="flex flex-col gap-2 group">
                            <span className="font-body text-sm font-medium text-on-surface group-focus-within:text-primary transition-colors">Name</span>
                            <input
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                className="rounded-input border border-outline/30 bg-surface px-4 py-3 font-body text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </label>
                        <label className="flex flex-col gap-2 group">
                            <span className="font-body text-sm font-medium text-on-surface group-focus-within:text-primary transition-colors">Email</span>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="jane@example.com"
                                className="rounded-input border border-outline/30 bg-surface px-4 py-3 font-body text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </label>
                    </div>
                    
                    <label className="flex flex-col gap-2 group mt-2">
                        <span className="font-body text-sm font-medium text-on-surface group-focus-within:text-primary transition-colors">Message</span>
                        <textarea
                            required
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="How can we help you today?"
                            className="rounded-input border border-outline/30 bg-surface p-4 font-body text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                        />
                    </label>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="mt-4 rounded-input bg-primary px-6 py-3.5 font-body text-sm font-medium text-on-primary shadow-card hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <span>Open in Email Client</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </motion.button>
                </form>
            </motion.div>
        </main>
    );
}