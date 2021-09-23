import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getUserChanges } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { Order } from '../../models/user';
import { GoodsService } from '../../services/goods.service';
import { OrderedPopupComponent } from '../ordered-popup/ordered-popup.component';
import { UpdateOrderDialogComponent } from '../update-order-dialog/update-order-dialog.component';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() order!: Order;

  @Input() id!: number;

  @Input() items$!: Observable<ItemModel[]>;

  subscription = new Subscription();

  totalCost = 0;

  panelOpenState = false;

  constructor(
    public dialog: MatDialog,
    private dataService: GoodsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.items$ = forkJoin(
      this.order.items.map((item) => this.dataService.getItemInfo(item.id))
    ).pipe(
      tap(
        (items) =>
          (this.totalCost = items.reduce((acc, item) => {
            return (acc += item.price * this.getItemAmmount(item.id));
          }, 0))
      )
    );
  }

  getItemAmmount(itemId: string): number {
    return this.order.items.find((o) => o.id === itemId)?.amount || 0;
  }

  cancelOrder(): void {
    if (this.order.id) {
      this.subscription.add(
        this.dataService.cancelOrder(this.order.id).subscribe((res) => {
          if (res) {
            this.dialog.open(OrderedPopupComponent, {
              data: 'Ваш заказ отменен',
            });
            this.store.dispatch(getUserChanges());
          }
        })
      );
    }
  }

  changeOrderDetails() {
    this.dialog.open(UpdateOrderDialogComponent, {
      width: '500px',
      data: { id: this.order.id, orderDetails: this.order.details },
    });
  }
}
