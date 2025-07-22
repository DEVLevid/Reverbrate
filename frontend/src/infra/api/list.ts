import { CreateListRequest, List, UpdateListRequest, EditListItemsRequest, ListResponse, ListsResponse } from "@/types/lists";
import { apiRequest } from "./config";

export const listApi = {
    getList: async (limit: number = 20, offset: number = 0): Promise<ListsResponse> => {
        return apiRequest<ListsResponse>(`/lists?limit=${limit}&offset=${offset}`, {
            method: "GET",
        });
    },

    getListById: async (id: string): Promise<List> => {
        return apiRequest<List>(`/lists/${id}`);
    },

    createList: async (data: CreateListRequest): Promise<List> => {
        return apiRequest<List>(`/lists`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    updateList: async (id: string, data: UpdateListRequest): Promise<List> => {
        return apiRequest<List>(`/lists/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    deleteList: async (id: string): Promise<void> => {
        return apiRequest<void>(`/lists/${id}`, {
            method: "DELETE",
        });
    },

    editListItems: async (id: string, data: EditListItemsRequest): Promise<ListResponse> => {
        return apiRequest<ListResponse>(`/lists/${id}/items`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

};