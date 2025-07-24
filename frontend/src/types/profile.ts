import { ListsResponse } from "./lists";
import { ReviewsResponse } from "./reviews";

export interface Network {
    followers: number,
    following: number,
    reviews: number,
    lists: number
}

export interface Profile {
    id: string;
    name: string;
    nickname: string;
    email: string;
    image: string;
    bio: string;
    reviews: ReviewsResponse;
    lists: ListsResponse;
    network: Network;
}

export interface UpdateProfileRequest {
    name: string;
    bio: string;
    is_private: boolean;
}
