import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {
  @Output() priceEmmiter = new EventEmitter<number>();
  @Input() item$!: Observable<ItemModel>;
  @Input() number = 1;
  @Input() itemID!: string;

  constructor(private dataService: GoodsService) { }

  ngOnInit(): void {
    this.item$ = this.dataService.getItemInfo(this.itemID);
  }

  emitTotalPrice(): void {
    this.item$.subscribe((item) => {
      this.priceEmmiter.emit(item.price * this.number);
    });
  }
}
