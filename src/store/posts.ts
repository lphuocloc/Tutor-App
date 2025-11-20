import { signify } from 'react-signify';
import type { Post } from '../types/post';
import { classAPI } from '../api/endpoints';





export const sPostsStore = signify<Post[]>([]);

export const usePosts = () => sPostsStore.use();

// Actions


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

        console.log('Posts API Response:', response.data);
        sPostsStore.set(response.data)
        // Backend trả về array trực tiếp
        const postsData = Array.isArray(response.data) ? response.data : [];

        console.log('Posts Data (after check):', postsData);
        console.log('Posts Data length:', postsData.length);

        // Set posts


        return postsData;
    } catch (err) {
        console.error('Error fetching posts:', err);
        sPostsStore.set([]);
        return [];
    }
};