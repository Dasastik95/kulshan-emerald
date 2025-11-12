export interface Property {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  location: string;
  [key: string]: any; // For any additional properties that may be added later
}

export interface ListingDetailsProps {
  property: Property;
}

export interface ImageCarouselProps {
  images: string[];
}