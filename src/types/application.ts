export type ApplicationStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export interface Application {
  _id: string;
  userId: string;
  jobTitle: string;
  company: string;
  companyLogoUrl?: string;
  notes?: string;
  shortNote?: string;
  dateApplied?: string;
  status: ApplicationStatus;
  externalJobId?: string;
  createdAt: string;
}

export interface CreateApplicationInput {
  jobTitle: string;
  company: string;
  companyLogoUrl?: string;
  notes?: string;
  shortNote?: string;
  dateApplied?: string;
  status?: ApplicationStatus;
  externalJobId?: string;
}
