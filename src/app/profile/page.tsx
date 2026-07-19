"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TagInput } from "@/components/profile/TagInput";
import { useProfileQuery, useUpdateProfileMutation } from "@/hooks/useProfile";
import { ExperienceLevel } from "@/types/profile";

function ProfileForm() {
    const { data: profile, isLoading, isError } = useProfileQuery();

    if (isLoading) {
        return <div className="mx-auto max-w-2xl px-4 py-16 font-body text-on-surface-variant">Loading profile…</div>;
    }

    if (isError || !profile) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-16 font-body text-error">
                Couldn&apos;t load your profile. Try refreshing.
            </div>
        );
    }

    // Keying on profile._id forces a fresh mount (and fresh useState initial
    // values) whenever the loaded profile identity changes, instead of
    // syncing server data into local state via a useEffect + setState —
    // React's own guidance flags that pattern as causing avoidable cascading
    // renders.
    return <ProfileFormFields key={profile._id} profile={profile} />;
}

function ProfileFormFields({ profile }: { profile: NonNullable<ReturnType<typeof useProfileQuery>["data"]> }) {
    const mutation = useUpdateProfileMutation();

    const [name, setName] = useState(profile.name);
    const [skills, setSkills] = useState<string[]>(profile.skills);
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(profile.experienceLevel);
    const [preferredRoles, setPreferredRoles] = useState<string[]>(profile.preferredRoles);
    const [preferredLocations, setPreferredLocations] = useState<string[]>(profile.preferredLocations);
    const [resumeText, setResumeText] = useState(profile.resumeText ?? "");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        mutation.mutate({
            name,
            skills,
            experienceLevel,
            preferredRoles,
            preferredLocations,
            resumeText,
        });
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-12">
            <h1 className="font-heading text-h3 text-on-surface">Your Profile</h1>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
                This powers your AI job matches and recommendations — keep it current.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6 rounded-card bg-surface-container-lowest p-8 shadow-card">
                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Name</span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Email</span>
                    <input
                        value={profile.email}
                        disabled
                        className="cursor-not-allowed rounded-input border border-outline bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface-variant"
                    />
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Experience level</span>
                    <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                        className="rounded-input border border-outline bg-background px-4 py-3 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="entry">Entry-level</option>
                        <option value="mid">Mid-level</option>
                        <option value="senior">Senior</option>
                    </select>
                </label>

                <TagInput
                    label="Skills"
                    values={skills}
                    onChange={setSkills}
                    placeholder="Type a skill and press Enter"
                />

                <TagInput
                    label="Preferred roles"
                    values={preferredRoles}
                    onChange={setPreferredRoles}
                    placeholder="e.g. Frontend Engineer"
                />

                <TagInput
                    label="Preferred locations"
                    values={preferredLocations}
                    onChange={setPreferredLocations}
                    placeholder="e.g. Remote, London"
                />

                <label className="flex flex-col gap-1.5">
                    <span className="font-body text-sm font-medium text-on-surface">Resume</span>
                    <span className="font-body text-xs text-on-surface-variant">
                        Paste your resume text — used to tailor AI recommendations and generated content.
                    </span>
                    <textarea
                        rows={10}
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume text here"
                        className="rounded-input border border-outline bg-background p-4 font-body text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                </label>

                {mutation.isError && (
                    <p className="font-body text-sm text-error">{mutation.error.message}</p>
                )}
                {mutation.isSuccess && (
                    <p className="font-body text-sm text-tertiary">Profile saved.</p>
                )}

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="rounded-input bg-primary px-6 py-3 font-body text-sm font-medium text-on-primary shadow-card disabled:opacity-40"
                >
                    {mutation.isPending ? "Saving…" : "Save profile"}
                </button>
            </form>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileForm />
        </ProtectedRoute>
    );
}