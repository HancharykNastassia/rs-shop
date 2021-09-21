import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item-models';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {
  @Input() item!: ItemModel;

  ratingArray?: unknown[];

  ngOnInit():void {
    this.ratingArray = new Array(this.item.rating);
  }
}
