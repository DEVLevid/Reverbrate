import { ListsResponse } from "./lists";
import { Network } from "./profile";
import { ReviewsResponse } from "./reviews";

export interface User {
    id: string;
    name: string;
    nickname: string;
    email: string;
    image: string;
    bio: string;
    reviews: ReviewsResponse;
    lists: ListsResponse;
    network: Network;
    is_following: boolean;
}

export interface UserSearchResult {
    id: string;
    name: string;
    nickname: string;
    image: string;
    is_private: boolean;
}

export interface UserSearchResponse {
    data: UserSearchResult[];
    total: number;
    limit: number;
    next?: boolean;
    previous?: boolean;
    offset: number;
}
