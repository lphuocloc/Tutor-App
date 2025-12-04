import { signify } from 'react-signify';
import type { Post } from '../types/post';
import { classAPI } from '../api/endpoints';

interface TutorPostsState {
    posts: Post[];
}

const initialState: TutorPostsState = {
    posts: [],
};

export const tutorPostsStore = signify<TutorPostsState>(initialState);

export const useTutorPosts = () => tutorPostsStore.use();

// Actions


// Fetch tutor posts from API
export const fetchTutorPosts = async (params?: {
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
}) => {
    try {
        const response = await classAPI.getTutorPosts({
            sortOrder: params?.sortOrder || 'desc',
            page: params?.page || 1,
            pageSize: params?.pageSize || 20
        });

        const postsData = Array.isArray(response.data) ? response.data : [];
        tutorPostsStore.set({ posts: postsData });
        return postsData;
    } catch (err) {
        console.error('Error fetching tutor posts:', err);
        tutorPostsStore.set({ posts: [] });
        return [];
    }
};
