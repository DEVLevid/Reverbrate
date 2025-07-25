import { TrackWithReview } from "./search";

export interface Artist {
    id: string,
    name: string,
    cover: string,
    uri: string,
    tracks: TrackWithReview[]
}

