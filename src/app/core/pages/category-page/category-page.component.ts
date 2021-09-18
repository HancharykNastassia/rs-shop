import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/redux/state.models';
import { CategoryModel } from '../../models/category-models';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  @Input() goods$ = new Observable<ItemModel[]>();
  @Input() categoryName?: Observable<CategoryModel | undefined>;
  @Input() subcategoryName?: Observable<string | undefined>;

  subscription!: Subscription;

  category!: string;
  subcategory?: string;

  itemsReqCount = 10;
  reqStartPosition = 0;

  constructor(
    private dataService: GoodsService,
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.category = params['category'],
      this.subcategory = params['subcategory']
      this.goods$ = this.dataService.getGoodsFrom(this.category, this.subcategory, this.reqStartPosition, this.itemsReqCount);
    });
    this.categoryName = this.store.select((state) =>
      state.categories.categories.find(cat => cat.id === this.category)
    );
    if (this.subcategory) {
      this.subcategoryName = this.categoryName.pipe(
        map(item => {
          return item?.subCategories.find(sub => sub.id === this.subcategory)?.name;
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
