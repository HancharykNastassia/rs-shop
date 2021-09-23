export interface ItemModel {
  id: string;
  name: string;
  imageUrls: string[];
  rating: number;
  availableAmount: number;
  price: number;
  description: string;
  isInChart: boolean;
  isFavourite: boolean;
}
