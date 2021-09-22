import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { ErrorStateMatcher } from '@angular/material/core';
import { GoodsService } from '../../services/goods.service';
import { OrderedItem } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() goods$?: Observable<ItemModel[]>
  @Input() totalPrice = 0;

  subscription!: Subscription;
  prices!: Map<string, number>;

  constructor(public dialog: MatDialog, private store: Store<AppState>, private dataService: GoodsService) { }

  ngOnInit(): void {
    this.subscription = this.store.select((state) => state.user.user?.cart).subscribe(ids => {
      if (ids) {
        this.goods$ = forkJoin(ids.map(id => this.dataService.getItemInfo(id)));
      }
    }
    );
    this.prices = new Map();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  countTotalPrice(price: {id: string, multyplier: number}):void {
    this.subscription.add(
      this.goods$?.subscribe((item) => {
        this.prices.set(price.id, price.multyplier);
        this.totalPrice = item.reduce((acc, good) => acc+= good.price * (this.prices.get(good.id) || 0), 0);
      })
    );
  }

  getItemsAmmounts(): OrderedItem[] {
    const items: OrderedItem[] = [];
    for (let id of this.prices.keys()) {
      items.push(<OrderedItem>{id, amount: this.prices.get(id)});
    }
    return items;
  }
}
