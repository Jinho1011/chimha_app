export interface Article {
  title: string;
  author: string;
  date: string;
  link: string;
  image: string | undefined;
  text: string;
}

export interface Profile {
  members: string;
  name: string;
  thumbnail: string | any;
}
