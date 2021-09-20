import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemModel } from '../../models/item-models';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {
  @Input() item$!: Observable<ItemModel>
  @Input() number = 1;

  constructor() { }

  ngOnInit(): void {
    this.item$ = of(<ItemModel>{
      availableAmount: 20,
      description: "lala",
      id: "id",
      imageUrls: ["https://cdn21vek.by/img/galleries/6190/679/preview_b/watchfittiab09_huawei_5f76d05335615.jpeg"],
      isFavourite: true,
      isInChart: true,
      name: "name",
      price: 0.00,
      rating: 5,
    })
  }

}
