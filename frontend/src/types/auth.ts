export interface SpotifyToken {
  access_token: string;
  need_signup: boolean;
}


export interface SignUpData {
  nickname: string;
  name: string;
  email: string;
  bio: string;
} 