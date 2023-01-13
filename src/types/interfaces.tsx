export interface FetchData<T> {
  data: T;
  loading: boolean;
  error: any;
}

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
  abv: number;
}
