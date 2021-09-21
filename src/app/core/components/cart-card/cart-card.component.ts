import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { getUserChanges } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit, OnDestroy {
  @Output() priceEmmiter = new EventEmitter<{id: string, multyplier: number}>();
  @Input() item!: ItemModel;
  @Input() multyplier = 1;

  subscription = new Subscription();

  constructor(private dataService: GoodsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.priceEmmiter.emit({id: this.item.id, multyplier: this.multyplier});
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  removeItemFromChart(): void {
    this.subscription.add(
      this.dataService.removeItemFromChart(this.item.id).subscribe((res) => {
        if (res) this.store.dispatch(getUserChanges());
      })
    );
  }
}
