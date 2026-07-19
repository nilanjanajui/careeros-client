export type ExperienceLevel = "entry" | "mid" | "senior";

export interface Profile {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
  preferredRoles: string[];
  preferredLocations: string[];
  resumeText?: string;
}

export interface UpdateProfileInput {
  name?: string;
  skills?: string[];
  experienceLevel?: ExperienceLevel;
  preferredRoles?: string[];
  preferredLocations?: string[];
  resumeText?: string;
}
