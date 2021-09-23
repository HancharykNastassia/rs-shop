import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-favotire-page',
  templateUrl: './favotire-page.component.html',
  styleUrls: ['./favotire-page.component.scss'],
})
export class FavotirePageComponent implements OnInit, OnDestroy {
  @Input() goods$?: Observable<ItemModel[]>;

  subscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private dataService: GoodsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select((state) => state.user.user?.favorites)
      .subscribe((ids) => {
        if (ids) {
          this.goods$ = forkJoin(
            ids.map((id) => this.dataService.getItemInfo(id))
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
