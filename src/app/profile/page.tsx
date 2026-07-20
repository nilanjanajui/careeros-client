"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TagInput } from "@/components/profile/TagInput";
import { useProfileQuery, useUpdateProfileMutation } from "@/hooks/useProfile";
import { ExperienceLevel } from "@/types/profile";

function ProfileView({ profile, onEdit }: { profile: NonNullable<ReturnType<typeof useProfileQuery>["data"]>; onEdit: () => void }) {
    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-h3 text-on-surface">Your Profile</h1>
                    <p className="mt-2 font-body text-sm text-on-surface-variant">
                        This powers your AI job matches and recommendations.
                    </p>
                </div>
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 rounded-input border border-outline bg-surface-container-lowest px-5 py-2.5 font-body text-sm font-medium text-on-surface shadow-sm transition-all hover:bg-surface-container-low"
                >
                    <PencilIcon className="h-4 w-4" />
                    Edit Profile
                </button>
            </div>

            <div className="mt-8 flex flex-col gap-6 rounded-card bg-surface-container-lowest p-8 shadow-card">
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <p className="font-body text-sm font-medium text-on-surface-variant">Name</p>
                        <p className="mt-1 font-body text-base text-on-surface">{profile.name}</p>
                    </div>
                    <div>
                        <p className="font-body text-sm font-medium text-on-surface-variant">Email</p>
                        <p className="mt-1 font-body text-base text-on-surface">{profile.email}</p>
                    </div>
                    <div>
                        <p className="font-body text-sm font-medium text-on-surface-variant">Experience Level</p>
                        <p className="mt-1 font-body text-base capitalize text-on-surface">{profile.experienceLevel}-level</p>
                    </div>
                </div>

                <hr className="border-outline-variant/50" />

                {/* Tags */}
                <div>
                    <p className="font-body text-sm font-medium text-on-surface-variant">Skills</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {profile.skills.length > 0 ? (
                            profile.skills.map((skill) => (
                                <span key={skill} className="rounded-full bg-secondary-container px-3 py-1 font-body text-xs font-medium text-on-secondary-container">
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="font-body text-sm text-on-surface-variant italic">No skills added</span>
                        )}
                    </div>
                </div>

                <div>
                    <p className="font-body text-sm font-medium text-on-surface-variant">Preferred Roles</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {profile.preferredRoles.length > 0 ? (
                            profile.preferredRoles.map((role) => (
                                <span key={role} className="rounded-full bg-secondary-container px-3 py-1 font-body text-xs font-medium text-on-secondary-container">
                                    {role}
                                </span>
                            ))
                        ) : (
                            <span className="font-body text-sm text-on-surface-variant italic">No roles specified</span>
                        )}
                    </div>
                </div>

                <div>
                    <p className="font-body text-sm font-medium text-on-surface-variant">Preferred Locations</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {profile.preferredLocations.length > 0 ? (
                            profile.preferredLocations.map((loc) => (
                                <span key={loc} className="rounded-full bg-secondary-container px-3 py-1 font-body text-xs font-medium text-on-secondary-container">
                                    {loc}
                                </span>
                            ))
                        ) : (
                            <span className="font-body text-sm text-on-surface-variant italic">No locations specified</span>
                        )}
                    </div>
                </div>

                <hr className="border-outline-variant/50" />

                {/* Resume */}
                <div>
                    <p className="font-body text-sm font-medium text-on-surface-variant">Resume Details</p>
                    {profile.resumeText ? (
                        <div className="mt-3 rounded-card bg-surface-container-low p-6">
                            <p className="whitespace-pre-wrap font-body text-sm leading-relaxed text-on-surface-variant">
                                {profile.resumeText}
                            </p>
                        </div>
                    ) : (
                        <p className="mt-3 font-body text-sm text-on-surface-variant italic">No resume text provided.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function ProfileFormFields({ profile, onCancel }: { profile: NonNullable<ReturnType<typeof useProfileQuery>["data"]>; onCancel: () => void }) {
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
        }, {
            onSuccess: () => onCancel(),
        });
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <h1 className="font-heading text-h3 text-on-surface">Edit Profile</h1>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
                Update your details to improve AI job matches and recommendations.
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
                    <p className="rounded-card bg-error-container p-4 font-body text-sm text-on-error-container">{mutation.error.message}</p>
                )}

                <div className="mt-4 flex items-center justify-end gap-3 border-t border-outline-variant pt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={mutation.isPending}
                        className="rounded-input px-6 py-3 font-body text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low disabled:opacity-40"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="rounded-input bg-primary px-6 py-3 font-body text-sm font-medium text-on-primary shadow-card transition-colors hover:bg-primary-container hover:text-on-primary-container disabled:opacity-40"
                    >
                        {mutation.isPending ? "Saving…" : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

function ProfileContainer() {
    const { data: profile, isLoading, isError } = useProfileQuery();
    const [isEditing, setIsEditing] = useState(false);

    if (isLoading) {
        return <div className="mx-auto max-w-3xl px-4 py-16 font-body text-on-surface-variant">Loading profile…</div>;
    }

    if (isError || !profile) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 font-body text-error">
                Couldn&apos;t load your profile. Try refreshing.
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            {isEditing ? (
                <motion.div
                    key="edit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <ProfileFormFields profile={profile} onCancel={() => setIsEditing(false)} />
                </motion.div>
            ) : (
                <motion.div
                    key="view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <ProfileView profile={profile} onEdit={() => setIsEditing(true)} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContainer />
        </ProtectedRoute>
    );
}

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    );
}