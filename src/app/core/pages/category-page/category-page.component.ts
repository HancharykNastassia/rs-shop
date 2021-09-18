import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  @Input() goods$ = new Observable<ItemModel[]>();
  subscription!: Subscription;

  category!: string;
  subcategory?: string;

  itemsReqCount = 10;
  reqStartPosition = 0;

  constructor(private dataService: GoodsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.category = params['category'],
      this.subcategory = params['subcategory']
    });
    this.goods$ = this.dataService.getGoodsFrom(this.category, this.subcategory, this.reqStartPosition, this.itemsReqCount);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
