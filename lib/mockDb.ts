import { schools, reviews as seedReviews } from '@/app/data/mock'
import type { Approval } from '@/types/approval'
import type { Review } from '@/types/review'

export const educationalInstitutions = [
  { id: 'eud-1', name: 'Syddansk Erhvervsskole' },
  { id: 'eud-2', name: 'ZBC - Zealand Business College' },
  { id: 'eud-3', name: 'Mercantec' },
  { id: 'eud-4', name: 'SOSU C' },
  { id: 'eud-5', name: 'TEC - Teknisk ErhvervsCenter' },
  { id: 'eud-6', name: 'Campus Vejle' },
  { id: 'eud-7', name: 'EUC Syd' },
  { id: 'eud-8', name: 'EUC Nord' },
  { id: 'eud-9', name: 'EUC Nordvest' },
  { id: 'eud-10', name: 'Roskilde Tekniske Skole' },
]

export const approvals: Approval[] = [
  {
    id: 'ap1',
    studentId: 'student-1',
    schoolId: '1',
    approvedByTeacherId: 'teacher-1',
    createdAt: new Date().toISOString(),
  },
]

export const reviews: Review[] = seedReviews as Review[]

function initializeSchoolRatings() {
  schools.forEach((school) => {
    const schoolReviews = reviews.filter((r) => r.schoolId === school.id)
    if (schoolReviews.length > 0) {
      const totalRating = schoolReviews.reduce((sum, r) => sum + r.rating, 0)
      school.avgRating = totalRating / schoolReviews.length
      school.reviewCount = schoolReviews.length
    } else {
      school.avgRating = 0
      school.reviewCount = 0
    }
  })
}

initializeSchoolRatings()

export function getSchools() {
  return schools
}

export function getSchoolBySlug(slug: string) {
  return schools.find((s) => s.slug === slug) || null
}

export function getSchoolById(id: string) {
  return schools.find((s) => s.id === id) || null
}

export function getReviewsBySchoolId(schoolId: string) {
  return reviews.filter((r) => r.schoolId === schoolId)
}

export function addReview(data: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) {
  const newReview: Review = {
    id: `r${reviews.length + 1}`,
    createdAt: new Date().toISOString(),
    ...data,
  }
  reviews.push(newReview)

  const school = schools.find((s) => s.id === data.schoolId)
  if (school) {
    const schoolReviews = reviews.filter((r) => r.schoolId === data.schoolId)
    const totalRating = schoolReviews.reduce((sum, r) => sum + r.rating, 0)
    school.avgRating = totalRating / schoolReviews.length
    school.reviewCount = schoolReviews.length
  }

  return newReview
}

export function getApprovals(params?: { studentId?: string; schoolId?: string }) {
  const { studentId, schoolId } = params || {}
  return approvals.filter(
    (a) =>
      (studentId ? a.studentId === studentId : true) && (schoolId ? a.schoolId === schoolId : true),
  )
}

export function addApproval(data: Omit<Approval, 'id' | 'createdAt'>) {
  const newApproval: Approval = {
    id: `ap${approvals.length + 1}`,
    createdAt: new Date().toISOString(),
    ...data,
  }
  approvals.push(newApproval)
  return newApproval
}
