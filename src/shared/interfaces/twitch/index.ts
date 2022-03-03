export interface Datum {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: boolean;
  tag_ids: any[];
  thumbnail_url: string;
  title: string;
  started_at: string;
}

export interface Pagination {
  cursor: string;
}

export interface IsLive {
  data: Datum[];
  pagination: Pagination;
}

interface CDatum {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
}

export interface Channel {
  data: CDatum[];
}

export interface FDatum {
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
  followed_at: Date;
}

export interface Pagination {
  cursor: string;
}

export interface Followers {
  total: number;
  data: FDatum[];
  pagination: Pagination;
}

export interface Stream {
  data: SDatum[];
  pagination: SPagination;
}

interface SPagination {}

interface SDatum {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  is_mature: boolean;
}
