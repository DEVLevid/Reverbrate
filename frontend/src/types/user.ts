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
