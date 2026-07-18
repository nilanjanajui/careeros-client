export interface Job {
  id: string;
  source: "adzuna";
  title: string;
  company: string;
  companyLogoUrl: string;
  location: string;
  description: string;
  category: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  contractType?: string;
  redirectUrl: string;
  createdDate: string;
}

export interface JobSearchResult {
  jobs: Job[];
  totalResults: number;
  page: number;
  resultsPerPage: number;
}

export interface JobSearchFilters {
  what?: string;
  where?: string;
  category?: string;
  sortBy?: "date" | "salary" | "relevance";
  page?: number;
}