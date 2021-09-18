import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  @Input() item!: Observable<ItemModel>;
  subscription!: Subscription;

  constructor(private dataService: GoodsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) =>
      this.item = this.dataService.getItemInfo(params['id'])
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
