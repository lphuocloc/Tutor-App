import { signify } from 'react-signify';
import type { Post } from '../types/post';
import { classAPI } from '../api/endpoints';

export const sPostsStore = signify<Post[]>([]);

export const usePosts = () => sPostsStore.use();

// Fetch posts from API
export const fetchPosts = async (params?: {
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
}) => {
    try {
        const response = await classAPI.getCustomerPosts({
            sortOrder: params?.sortOrder || 'desc',
            page: params?.page || 1,
            pageSize: params?.pageSize || 20
        });

        sPostsStore.set(response.data)
        // Backend trả về array trực tiếp
        const postsData = Array.isArray(response.data) ? response.data : [];

        return postsData;
    } catch (err) {
        console.error('Error fetching posts:', err);
        sPostsStore.set([]);
        return [];
    }
};