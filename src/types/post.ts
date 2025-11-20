export interface Post {
    postId: number;
    title: string;
    subject: string;
    studentGrade: string;
    sessionsPerWeek: number;
    preferredDays: string;
    preferredTime: string;
    pricePerSession: number;
    location: string;
    isPublished: boolean;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    page: number;
    pageSize: number;
}
