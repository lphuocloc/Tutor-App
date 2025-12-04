export interface Review {
    reviewId: number;
    bookingId: number;
    fromUserId: number;
    fromUserName: string;
    toUserId: number;
    toUserName: string;
    rating: number;
    comment: string;
    createdAt: string;
}
