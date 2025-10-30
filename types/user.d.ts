interface Company {
  id: string;
  name: string;
  slug: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}
