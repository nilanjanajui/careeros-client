"use client";

export function HeroPreview() {
    return (
        <div className="w-full max-w-sm animate-hero-float rounded-card bg-surface-container-lowest p-5 shadow-elevated">
            <div className="flex items-center justify-between">
                <span className="font-body text-xs font-medium text-on-surface-variant">Dashboard preview</span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-input bg-surface-container-low p-3">
                    <div className="h-2 w-10 rounded bg-outline-variant" />
                    <div className="mt-2 h-5 w-8 animate-bar-grow rounded bg-primary/70" />
                </div>
                <div className="rounded-input bg-surface-container-low p-3">
                    <div className="h-2 w-10 rounded bg-outline-variant" />
                    <div className="mt-2 h-5 w-8 animate-bar-grow rounded bg-tertiary/70" style={{ animationDelay: "0.2s" }} />
                </div>
            </div>

            <div className="mt-3 rounded-input bg-surface-container-low p-3">
                <div className="h-2 w-16 rounded bg-outline-variant" />
                <div className="mt-3 flex items-end gap-1.5">
                    {[40, 65, 45, 80, 55, 70].map((h, i) => (
                        <div
                            key={i}
                            className="w-full animate-bar-grow rounded-t bg-primary/60"
                            style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-input bg-primary-container p-3">
                <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-primary" />
                <div className="h-2 w-24 rounded bg-primary/40" />
            </div>
        </div>
    );
}