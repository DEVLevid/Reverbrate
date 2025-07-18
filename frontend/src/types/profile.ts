import { ReviewsResponse } from "./reviews";

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    bio: string;
}

export interface Network {
    followers: number,
    following: number,
    reviews: number,
    lists: number
}

export interface Profile {
    user: User;
    reviews: ReviewsResponse;
    network: Network;
}
