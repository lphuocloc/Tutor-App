import { signify } from "react-signify";
import type { Review } from "../types/review";
import { reviewAPI } from "../api/endpoints";




export const sReview = signify<Review[] | null>(null);
export const sReviewLoading = signify<boolean>(false);

export const useReview = () => sReview.use();
export const useReviewLoading = () => sReviewLoading.use();

export const fetchAllReviews = async () => {
    sReviewLoading.set(true);
    try {
        const response = await reviewAPI.getAllReviews();
        console.log("review", response.data)
        sReview.set(response.data);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        sReview.set(null);
    } finally {
        sReviewLoading.set(false);
    }
}
