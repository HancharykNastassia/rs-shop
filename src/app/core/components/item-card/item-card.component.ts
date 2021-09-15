import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from '../../models/item-models';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: ItemModel;

  ratingArray?: unknown[];

  ngOnInit(): void {
    this.ratingArray = new Array(this.item.rating);
  }
}
