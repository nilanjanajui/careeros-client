"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useGenerateContentMutation } from "@/hooks/useContentGenerator";

type ContentType = "cover_letter" | "resume_bullets";
type ContentLength = "short" | "medium" | "long";

const TYPE_OPTIONS: { value: ContentType; label: string }[] = [
    { value: "cover_letter", label: "Cover Letter" },
    { value: "resume_bullets", label: "Resume Bullets" },
];

const LENGTH_OPTIONS: { value: ContentLength; label: string }[] = [
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "long", label: "Long" },
];

function ContentGeneratorView() {
    const mutation = useGenerateContentMutation();

    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [type, setType] = useState<ContentType>("cover_letter");
    const [length, setLength] = useState<ContentLength>("medium");
    const [output, setOutput] = useState("");
    const [hasGenerated, setHasGenerated] = useState(false);

    function handleGenerate(regenerate = false) {
        if (!jobTitle.trim() || !company.trim()) return;
        mutation.mutate(
            {
                jobTitle,
                company,
                jobDescription,
                type,
                length,
                regenerate,
            },
            {
                onSuccess: (data) => {
                    setOutput(data.output);
                    setHasGenerated(true);
                },
            },
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-heading text-h3 text-on-surface">AI Content Generator</h1>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
                Generate tailored cover letters or resume bullet points for any job listing.
                Your profile data (skills, experience, resume text) is automatically included.
            </p>

            <div className="mt-8 flex flex-col gap-6 rounded-card bg-surface-container-lowest p-8 shadow-card">
                {/* Job info inputs */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5">
                        <span className="font-body text-sm font-medium text-on-surface">Job Title</span>
                        <input
                            required
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="e.g. Frontend Engineer"
                            className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                    </label>
                    <label className="flex flex-col gap-1.5">
                        <span className="font-body text-sm font-medium text-on-surface">Company</span>
                        <input
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Vercel"
                            className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                    </label>
                </div>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Job Description</span>
                    <span className="font-body text-xs text-on-surface-variant">
                        Paste the job description — the AI uses it alongside your profile to tailor the output.
                    </span>
                    <textarea
                        rows={6}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here"
                        className="rounded-input border border-outline bg-background p-4 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                {/* Content type toggle */}
                <div className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Content Type</span>
                    <div className="flex gap-2">
                        {TYPE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setType(opt.value)}
                                className={`rounded-input border px-4 py-2.5 font-body text-sm font-medium transition-colors ${
                                    type === opt.value
                                        ? "border-primary bg-primary-container text-on-primary-container"
                                        : "border-outline text-on-surface-variant hover:bg-surface-container-low"
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Length selector */}
                <div className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Length</span>
                    <div className="flex gap-2">
                        {LENGTH_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => setLength(opt.value)}
                                className={`rounded-input border px-4 py-2.5 font-body text-sm font-medium transition-colors ${
                                    length === opt.value
                                        ? "border-primary bg-primary-container text-on-primary-container"
                                        : "border-outline text-on-surface-variant hover:bg-surface-container-low"
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => handleGenerate(false)}
                        disabled={mutation.isPending || !jobTitle.trim() || !company.trim()}
                        className="rounded-input bg-primary px-6 py-3 font-body text-sm font-medium text-on-primary shadow-card disabled:opacity-40"
                    >
                        {mutation.isPending ? "Generating…" : "Generate"}
                    </button>
                    {hasGenerated && (
                        <button
                            type="button"
                            onClick={() => handleGenerate(true)}
                            disabled={mutation.isPending}
                            className="rounded-input border border-outline px-6 py-3 font-body text-sm font-medium text-on-surface-variant hover:bg-surface-container-low disabled:opacity-40"
                        >
                            {mutation.isPending ? "Regenerating…" : "Regenerate"}
                        </button>
                    )}
                </div>

                {mutation.isError && (
                    <p className="rounded-card bg-error-container p-4 font-body text-sm text-on-error-container">
                        {mutation.error.message}
                    </p>
                )}
            </div>

            {/* Output area */}
            {output && (
                <div className="mt-6 rounded-card bg-surface-container-lowest p-8 shadow-card">
                    <div className="flex items-center justify-between">
                        <h2 className="font-heading text-h5 text-on-surface">
                            {type === "cover_letter" ? "Cover Letter" : "Resume Bullets"}
                        </h2>
                        <button
                            type="button"
                            onClick={() => {
                                navigator.clipboard.writeText(output);
                            }}
                            className="rounded-input border border-outline px-3 py-1.5 font-body text-xs font-medium text-on-surface-variant hover:bg-surface-container-low"
                        >
                            Copy
                        </button>
                    </div>
                    <textarea
                        value={output}
                        onChange={(e) => setOutput(e.target.value)}
                        rows={12}
                        className="mt-4 w-full rounded-input border border-outline bg-background p-4 font-body text-sm leading-relaxed outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="mt-2 font-body text-xs text-on-surface-variant">
                        This is editable — tweak it before copying.
                    </p>
                </div>
            )}
        </div>
    );
}

export default function ContentGeneratorPage() {
    return (
        <ProtectedRoute>
            <ContentGeneratorView />
        </ProtectedRoute>
    );
}
