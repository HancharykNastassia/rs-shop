import { Component, Input } from '@angular/core';
import { ItemModel } from '../../models/item-models';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {
  @Input() item!: ItemModel;
}
