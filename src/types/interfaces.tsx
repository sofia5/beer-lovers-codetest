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
  description: string;
  food_pairing: string[];
  first_brewed: string;
}

export interface BeerFilter {
  searchTerm: string;
  abv_gt?: number;
  abv_lt?: number;
}
