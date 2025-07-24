"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateListRequest,
  UpdateListRequest,
  EditListItemsRequest,
} from "@/types/lists";
import { listApi } from "@/infra/api/list";

export function useLists() {
  const queryClient = useQueryClient();

  const fetchLists = (limit = 20, offset = 0) =>
    useQuery({
      queryKey: ["list_profile"],
      queryFn: () => listApi.getList(limit, offset),
    });

  const fetchListById = (id: string) =>
    useQuery({
      queryKey: ["lists", "byId", id],
      queryFn: () => listApi.getListById(id),
      enabled: !!id,
    });

  const createListMutation = useMutation({
    mutationFn: (data: CreateListRequest) => listApi.createList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list_profile"],
      });
    },
  });

  const updateListMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListRequest }) =>
      listApi.updateList(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list_profile"],
      });
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: (id: string) => listApi.deleteList(id),
    onSuccess: () => {
      useQueryClient().invalidateQueries({
        queryKey: ["list_profile"],
      });
    },
  });

  const editListItemsMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditListItemsRequest }) =>
      listApi.editListItems(id, data),
  });

  return {
    fetchLists,
    fetchListById,
    createListMutation,
    updateListMutation,
    deleteListMutation,
    editListItemsMutation,
  };
}
