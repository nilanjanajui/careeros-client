import { Job } from "./job";

export interface Recommendation {
  jobId: string;
  fitScore: number;
  reasoning: string;
  job: Job;
}

export interface RecommendationRun {
  recommendations: Recommendation[];
  traceId: string;
}

export type InteractionAction = "saved" | "dismissed";
