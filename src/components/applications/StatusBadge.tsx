import { ApplicationStatus } from "@/types/application";

const STATUS_STYLES: Record<ApplicationStatus, string> = {
    saved: "bg-surface-container text-on-surface-variant",
    applied: "bg-secondary-container text-on-secondary-container",
    interview: "bg-primary-container text-on-primary-container",
    offer: "bg-tertiary-container text-on-tertiary-container",
    rejected: "bg-error-container text-on-error-container",
};

const STATUS_LABELS: Record<ApplicationStatus, string> = {
    saved: "Saved",
    applied: "Applied",
    interview: "Interview",
    offer: "Offer",
    rejected: "Rejected",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
    return (
        <span className={`rounded-full px-3 py-1 font-body text-xs font-medium ${STATUS_STYLES[status]}`}>
            {STATUS_LABELS[status]}
        </span>
    );
}