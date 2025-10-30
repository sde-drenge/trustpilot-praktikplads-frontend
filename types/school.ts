export interface School {
  id: string;
  name: string;
  slug: string;
  address?: string;
  city?: string;
  postalCode?: string;
  avgRating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
  logoUrl: string;
  description: string;
}
