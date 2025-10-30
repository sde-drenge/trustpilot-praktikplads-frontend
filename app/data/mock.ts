import { School, Review } from "@/types";

export const schools: School[] = [
  {
    id: "1",
    name: "Nørrebro Tekniske Læreplads",
    slug: "norrebro-tekniske-laereplads",
    logoUrl: "/images/sample-logo.png",
    description: "Fokus på software og devops.",
    avgRating: 4.2,
    reviewCount: 12,
  },
  {
    id: "2",
    name: "Aarhus IT Læreplads",
    slug: "aarhus-it-laereplads",
    logoUrl: "/images/sample-logo-2.png",
    description: "Frontend, backend og moderne stacks.",
    avgRating: 3.6,
    reviewCount: 7,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    schoolId: "1",
    rating: 5,
    title: "Super forløb",
    body: "God oplæring og tid til opgaver.",
    createdAt: "2025-05-01T10:00:00Z",
    author: "Ben",
  },
  {
    id: "r2",
    schoolId: "2",
    rating: 3,
    title: "OK men kunne være bedre",
    body: "Mere struktur ønskes.",
    createdAt: "2025-05-12T10:00:00Z",
  },
  {
    id: "r3",
    schoolId: "3",
    rating: 4,
    body: "Rart team og gode opgaver.",
    createdAt: "2025-06-01T12:00:00Z",
  },
];
