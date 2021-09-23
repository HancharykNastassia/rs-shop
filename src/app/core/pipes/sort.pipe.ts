import { Pipe, PipeTransform } from '@angular/core';
import { ItemModel } from '../models/item-models';

export enum SortCriteria {
  popularity,
  price,
}

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  transform(
    goods: ItemModel[],
    criteria?: SortCriteria,
    isAsc?: boolean
  ): ItemModel[] {
    if (typeof isAsc !== undefined) {
      if (criteria === SortCriteria.popularity) {
        return goods.sort((item1, item2) =>
          isAsc ? item1.rating - item2.rating : item2.rating - item1.rating
        );
      } else if (criteria === SortCriteria.price) {
        return goods.sort((item1, item2) =>
          isAsc ? item1.price - item2.price : item2.price - item1.price
        );
      }
    }
    return goods;
  }
}
