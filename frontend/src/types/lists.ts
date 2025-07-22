export type ListType = 'track' | 'artist' | 'album';

export interface TrackListItem {
  id: string;
  name: string;
  cover: string;
  uri: string;
}

export interface ArtistListItem {
  id: string;
  name: string;
  cover: string;
  uri: string;
}

export interface AlbumListItem {
  id: string;
  name: string;
  cover: string;
  artist_name: string;
  uri: string;
}

export type ListItem = TrackListItem | ArtistListItem | AlbumListItem;

export interface List {
  id: string;
  name: string;
  type: ListType;
  items: ListItem[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: {
    id: string;
    name: string;
    image: string;
    nickname: string;
  };
}

export interface ListsResponse {
  data: List[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface CreateListRequest {
  name: string;
  type: ListType;
}

export interface UpdateListRequest {
  name: "string",
}

export interface ListResponse {
  id: string,
  name: string;
  type: ListType;
  items: ListItem[];
  created_at: string;
  updated_at: string;
}

export interface EditListItemsRequest {
  operation: "add" | "remove",
  item_id: string,
}
