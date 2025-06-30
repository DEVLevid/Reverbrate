import { ReviewsResponse } from "./reviews";

export interface ProfileInfo {
    id: string;
    name: string;
    email: string;
    image: string;
    reviews: ReviewsResponse;
}