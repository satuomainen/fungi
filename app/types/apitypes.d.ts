export type SupportedLanguage = 'fi' | 'sv' | 'en';

export interface Article {
  id: string;
  language: SupportedLanguage;
  mainHeading: string;
  body: string;
}

interface SpeciesName {
  latin: string;
  fi: string;
  sv?: string;
  en?: string;
}

interface DescriptionSizes {
  fi: number;
  sv?: number;
  en?: number;
}

export interface CatalogItem {
  id: number;
  name: SpeciesName;
  image: string;
  stars: string;
  descriptionSizes: DescriptionSizes;
}

interface SpeciesAttribute {
  ordinal: number;
  name: string;
  value: string;
}

type AttributeSet = {
  fi: SpeciesAttribute[];
  sv: SpeciesAttribute[];
  en: SpeciesAttribute[];
}

export interface Species {
  id: string;
  name: SpeciesName,
  image: string;
  stars: string;
  images?: string[],
  attributes: AttributeSet
}
