import { TrackInfo } from "./reviews";

export interface ListsResponse {
    data: List[];
    total: number;
    limit: number;
    next: number;
    offset: number;
    previous: number;
}

export interface List {
    id: string;
    name: string;
    type: string;
    items: ListItem[];
}

export interface Album {
    id: string;
    name: string;
    cover: string;
}

export interface Artist {
    id: string;
    name: string;
    image: string;
}

export type ListItem = Album | Artist | TrackInfo;