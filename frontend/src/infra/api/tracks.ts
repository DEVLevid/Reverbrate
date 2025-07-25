import { apiRequest } from './config';
import { TrackWithReview } from '@/types/search';

export const TracksApi = {
    getTrack: async (id: string) => {
        return apiRequest<TrackWithReview>(`/tracks/${id}`);
    },

    getNextTrack: async (id: string) => {
        return apiRequest<TrackWithReview>(`/tracks/${id}/next`);
    },

    getPreviousTrack: async (id: string) => {
        return apiRequest<TrackWithReview>(`/tracks/${id}/previous`);
    }
}   