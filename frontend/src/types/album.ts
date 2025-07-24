import { TrackWithReview } from "./search";

export interface Album {
    id: string,
    name: string,
    cover: string,
    artist_name: string,
    uri: string,
    tracks: TrackWithReview[]
}

