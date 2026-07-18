export interface CompanyReview {
  _id: string;
  company: string;
  companyKey: string;
  userId: { _id: string; name: string } | string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export interface CompanyReviewsResult {
  reviews: CompanyReview[];
  averageRating: number | null;
  count: number;
}
