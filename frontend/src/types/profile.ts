import { ReviewsResponse } from "./reviews";
import { ListsResponse } from "./lists";

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

export interface Profile {
    user: User;
    reviews: ReviewsResponse;
    lists: ListsResponse;
}
