export interface Beer {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
  abv: number;
  ebc: number;
  description: string;
  food_pairing: string[];
  first_brewed: string;
  ingredients: {
    yeast: string;
  };
}

export interface BeerFilter {
  beer_name: string;
  abv_gt?: number;
  abv_lt?: number;
  ebc_gt?: number;
  ebc_lt?: number;
  page?: number;
}

export interface EbcBeerColor {
  ebc_number: number;
  color_code: string;
}
