// Types cho Tutor Profile
export type EducationLevel =
    | 'HighSchoolGraduate'
    | 'CollegeStudent'
    | 'UniversityStudent'
    | 'CollegeGraduate'
    | 'UniversityGraduate'
    | 'Postgraduate'

export type ProfileStatus = 'Pending' | 'Approved' | 'Rejected'

export interface Certification {
    certificationId: number
    documentType: string
    fileUrl: string
    note: string
    status: ProfileStatus
    submittedAt: string
    reviewedBy: number | null
    reviewedAt: string
}

export interface TutorProfile {
    tutorProfileId: number
    userId: number
    reviewerBy: number | null
    description: string
    education: EducationLevel
    experienceYears: number
    reviewedAt: string | null
    createdAt: string
    status: ProfileStatus
    reason: string | null
    certifications: Certification[]
}

export interface TutorProfilesResponse {
    data: TutorProfile[]
    total: number
    page: number
    pageSize: number
}
