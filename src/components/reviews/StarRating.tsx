"use client";
import { useState } from "react";

export function StarRatingDisplay({ value }: { value: number }) {
    return (
        <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={n <= Math.round(value) ? "text-primary" : "text-outline-variant"}>
                    ★
                </span>
            ))}
        </div>
    );
}

export function StarRatingInput({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) {
    const [hovered, setHovered] = useState<number | null>(null);
    const shown = hovered ?? value;

    return (
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={value === n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onChange(n)}
                    className={`text-2xl leading-none transition-colors ${n <= shown ? "text-primary" : "text-outline-variant"
                        }`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}