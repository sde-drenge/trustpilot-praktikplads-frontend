export interface Review {
  id: string;
  schoolId: string;
  rating: number;
  title?: string;
  body: string;
  author?: string;
  createdAt: string;
  updatedAt?: string;
}
