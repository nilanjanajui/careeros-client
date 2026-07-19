"use client";
import { useState } from "react";

export function TagInput({
    label,
    values,
    onChange,
    placeholder,
}: {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
}) {
    const [draft, setDraft] = useState("");

    function commitDraft() {
        const trimmed = draft.trim();
        if (trimmed && !values.includes(trimmed)) {
            onChange([...values, trimmed]);
        }
        setDraft("");
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commitDraft();
        } else if (e.key === "Backspace" && draft === "" && values.length > 0) {
            onChange(values.slice(0, -1));
        }
    }

    function removeAt(index: number) {
        onChange(values.filter((_, i) => i !== index));
    }

    return (
        <div className="flex flex-col gap-1.5">
            <span className="font-body text-sm font-medium text-on-surface">{label}</span>
            <div className="flex flex-wrap items-center gap-2 rounded-input border border-outline bg-background p-2 focus-within:ring-2 focus-within:ring-primary">
                {values.map((value, i) => (
                    <span
                        key={value}
                        className="flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 font-body text-xs font-medium text-on-secondary-container"
                    >
                        {value}
                        <button
                            type="button"
                            onClick={() => removeAt(i)}
                            aria-label={`Remove ${value}`}
                            className="text-on-secondary-container/70 hover:text-on-secondary-container"
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={commitDraft}
                    placeholder={values.length === 0 ? placeholder : undefined}
                    className="min-w-[8ch] flex-1 border-0 bg-transparent px-1 py-1 font-body text-sm outline-none"
                />
            </div>
        </div>
    );
}