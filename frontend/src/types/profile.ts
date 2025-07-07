import { ReviewsResponse } from "./reviews";

export interface Profile {
    id: string;
    name: string;
    email: string;
    image: string;
    reviews: ReviewsResponse;
}
