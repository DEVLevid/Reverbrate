import { mockLists } from './listMock';
import {
  List,
  CreateListRequest,
  UpdateListRequest,
  EditListItemsRequest,
  ListResponse
} from '@/types/lists';

export class ListsRoutesMock {
  static async getLists(limit = 20, offset = 0): Promise<{ data: List[]; limit: number; offset: number; total: number; next: string | null; previous: string | null }> {
    const total = mockLists.length;
    const data = mockLists.slice(offset, offset + limit);
    return {
      data,
      limit,
      offset,
      total,
      next: offset + limit < total ? `/lists?offset=${offset + limit}&limit=${limit}` : null,
      previous: offset > 0 ? `/lists?offset=${Math.max(0, offset - limit)}&limit=${limit}` : null,
    };
  }

  static async getListById(id: string): Promise<List> {
    const list = mockLists.find(l => l.id === id);
    if (!list) throw new Error('Lista não encontrada');
    return list;
  }

  static async createList(data: CreateListRequest): Promise<List> {
    if (!data.name || !data.type) throw new Error('Nome e tipo são obrigatórios');
    const newList: List = {
      id: Math.random().toString(36).substring(2, 15),
      name: data.name,
      type: data.type,
      items: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
    };
    mockLists.push(newList);
    return newList;
  }

  static async updateList(id: string, data: UpdateListRequest): Promise<List> {
    const list = mockLists.find(l => l.id === id);
    if (!list) throw new Error('Lista não encontrada');
    if (data.name) list.name = data.name;
    list.updated_at = new Date().toISOString();
    return list;
  }

  static async deleteList(id: string): Promise<void> {
    const idx = mockLists.findIndex(l => l.id === id);
    if (idx === -1) throw new Error('Lista não encontrada');
    mockLists.splice(idx, 1);
  }

  static async editListItems(id: string, data: EditListItemsRequest): Promise<ListResponse> {
    const list = mockLists.find(l => l.id === id);
    if (!list) throw new Error('Lista não encontrada');
    if (!data.item_id || !data.operation) throw new Error('Dados inválidos');
    if (data.operation === 'add') {
      const fakeItem = {
        id: data.item_id,
        name: 'Item mock',
        cover: '',
        uri: '',
        ...(list.type === 'album' ? { artist_name: 'Artista mock' } : {}),
      };
      if (!list.items.some(item => item.id === data.item_id)) {
        list.items.push(fakeItem as any);
      }
    } else if (data.operation === 'remove') {
      list.items = list.items.filter(item => item.id !== data.item_id);
    }
    list.updated_at = new Date().toISOString();
    return {
      id: list.id,
      name: list.name,
      type: list.type,
      items: list.items,
      created_at: list.created_at,
      updated_at: list.updated_at,
    };
  }
}
