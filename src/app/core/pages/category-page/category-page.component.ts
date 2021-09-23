import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, concat, Observable, of, Subscription } from 'rxjs';
import { map, mergeScan, scan, startWith } from 'rxjs/operators';
import { AppState } from 'src/app/redux/state.models';
import { CategoryModel } from '../../models/category-models';
import { ItemModel } from '../../models/item-models';
import { SortCriteria } from '../../pipes/sort.pipe';
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
  @Input() sortCriteria?: SortCriteria;
  @Input() sortIsAsc?: boolean;

  goods!: ItemModel[];
  subscription!: Subscription;
  category!: string;
  subcategory?: string;
  itemsReqCount = 10;
  reqStartPosition = 0;
  sortBy?: string;

  constructor(
    private dataService: GoodsService,
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.reqStartPosition = 0;
      this.category = params['category'],
      this.subcategory = params['subcategory']
      this.goods$ = this.dataService.getGoodsFrom(
        this.category, this.subcategory, this.reqStartPosition, this.itemsReqCount
        ).pipe(map((item) => this.goods = item));
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
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sortPrice(): void {
    this.sortBy = 'price';
    if (this.sortCriteria === SortCriteria.price) {
      this.sortIsAsc = !this.sortIsAsc;
    } else {
      this.sortCriteria = SortCriteria.price;
      this.sortIsAsc = true;
    }
    this.goods$ = this.dataService.getGoodsFrom(
      this.category,
      this.subcategory,
      this.reqStartPosition,
      this.itemsReqCount,
      this.sortBy,
      !this.sortIsAsc
    );
  }

  sortPopularity(): void {
    this.sortBy = 'rating';
    if (this.sortCriteria === SortCriteria.popularity) {
      this.sortIsAsc = !this.sortIsAsc;
    } else {
      this.sortCriteria = SortCriteria.popularity;
      this.sortIsAsc = true;
    }
    this.goods$ = this.dataService.getGoodsFrom(
      this.category,
      this.subcategory,
      this.reqStartPosition,
      this.itemsReqCount,
      this.sortBy,
      this.sortIsAsc
    )
  }

  showMore() {
    this.reqStartPosition+=10;
    this.goods$ = this.dataService.getGoodsFrom(
      this.category,
      this.subcategory,
      this.reqStartPosition,
      this.itemsReqCount,
      this.sortBy,
      !this.sortIsAsc
    ).pipe(mergeScan((acc, item) => {
      return of([...acc, ...item]);
    }, this.goods),
    map((item) => this.goods = item));
  }
}
