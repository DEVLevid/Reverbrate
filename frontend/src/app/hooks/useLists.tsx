'use client'

import { useMutation, useQuery } from '@tanstack/react-query';
import { ListsRoutesMock } from '../../infra/mock/lists/listsRoutesMock';
import {
  CreateListRequest,
  UpdateListRequest,
  EditListItemsRequest,
} from '@/types/lists';

export function useLists() {
  const fetchLists = (limit = 20, offset = 0) => useQuery({
    queryKey: ['lists', { limit, offset }],
    queryFn: () => ListsRoutesMock.getLists(limit, offset),
  });

  const fetchListById = (id: string) => useQuery({
    queryKey: ['lists', 'byId', id],
    queryFn: () => ListsRoutesMock.getListById(id),
    enabled: !!id,
  });

  const createListMutation = useMutation({
    mutationFn: (data: CreateListRequest) => ListsRoutesMock.createList(data),
  });

  const updateListMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListRequest }) =>
      ListsRoutesMock.updateList(id, data),
  });

  const deleteListMutation = useMutation({
    mutationFn: (id: string) => ListsRoutesMock.deleteList(id),
  });

  const editListItemsMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditListItemsRequest }) =>
      ListsRoutesMock.editListItems(id, data),
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