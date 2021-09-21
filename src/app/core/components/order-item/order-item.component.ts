import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemModel } from '../../models/item-models';
import { Order } from '../../models/user';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order!: Order;
  @Input() items$!: Observable<ItemModel[]>;

  subscription!: Subscription;
  totalCost = 0;
  panelOpenState = false;

  constructor(private dataService: GoodsService) { }

  ngOnInit(): void {
    this.items$ = forkJoin(this.order.items.map(item => this.dataService.getItemInfo(item.id))).pipe(
      tap((items) => this.totalCost = items.reduce((acc, item) => {
        return acc+= item.price * this.getItemAmmount(item.id);
      }, 0))
    );
  }

  getItemAmmount(itemId: string): number {
    return this.order.items.find(o => o.id === itemId)?.amount || 0;
  }
}
