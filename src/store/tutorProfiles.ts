/* eslint-disable @typescript-eslint/no-explicit-any */
import { signify } from 'react-signify'
import { tutorAPI } from '../api/endpoints'
import type { TutorProfile } from '../types/tutorProfile'

// Signals
export const sTutorProfiles = signify<TutorProfile[]>([])
export const sLoading = signify<boolean>(false)
export const sError = signify<string | null>(null)
export const sPage = signify<number>(1)
export const sPageSize = signify<number>(10)
export const sTotal = signify<number>(0)
export const sSortOrder = signify<'asc' | 'desc'>('desc')

// Hooks to use signals in components
export const useTutorProfiles = () => sTutorProfiles.use()
export const useLoading = () => sLoading.use()
export const useError = () => sError.use()
export const usePage = () => sPage.use()
export const usePageSize = () => sPageSize.use()
export const useTotal = () => sTotal.use()
export const useSortOrder = () => sSortOrder.use()

// Get all tutor profiles
export const getAllTutorProfiles = async (params?: {
    page?: number
    pageSize?: number
    sortOrder?: 'asc' | 'desc'
}): Promise<TutorProfile[]> => {
    try {
        sLoading.set(true)
        sError.set(null)

        const response = await tutorAPI.getTutorProfiles({
            page: params?.page || 1,
            pageSize: params?.pageSize || 1000,
            sortOrder: params?.sortOrder || 'desc'
        })

        const data = response.data as TutorProfile[]

        // Sort locally by createdAt if data exists
        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime()
            const dateB = new Date(b.createdAt).getTime()
            return params?.sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })

        sTutorProfiles.set(sortedData)
        sLoading.set(false)

        // Update pagination params
        if (params?.page) sPage.set(params.page)
        if (params?.pageSize) sPageSize.set(params.pageSize)
        if (params?.sortOrder) sSortOrder.set(params.sortOrder)

        return sortedData
    } catch (error: any) {
        console.error('Error fetching tutor profiles:', error)
        const errorMessage = error?.response?.data?.message || error.message || 'Có lỗi xảy ra khi tải dữ liệu'
        sError.set(errorMessage)
        sLoading.set(false)
        sTutorProfiles.set([])
        return []
    }
}

// Get tutor profile by ID
export const getTutorProfileById = (
    profiles: TutorProfile[] | undefined,
    tutorProfileId: number
): TutorProfile | undefined => {
    if (!profiles) return undefined
    return profiles.find(profile => profile.tutorProfileId === tutorProfileId)
}

// Get tutor profile by User ID
export const getTutorProfileByUserId = (
    profiles: TutorProfile[] | undefined,
    userId: number
): TutorProfile | undefined => {
    if (!profiles) return undefined
    return profiles.find(profile => profile.userId === userId)
}

// Set page
export const setPage = (page: number) => {
    getAllTutorProfiles({ page })
}

// Set page size
export const setPageSize = (pageSize: number) => {
    getAllTutorProfiles({ pageSize, page: 1 })
}

// Set sort order
export const setSortOrder = (sortOrder: 'asc' | 'desc') => {
    getAllTutorProfiles({ sortOrder })
}

// Reset state
export const resetTutorProfiles = () => {
    sTutorProfiles.set([])
    sLoading.set(false)
    sError.set(null)
    sPage.set(1)
    sPageSize.set(10)
    sTotal.set(0)
    sSortOrder.set('desc')
}
