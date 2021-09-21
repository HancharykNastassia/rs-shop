import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getUserChanges } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
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
  id!: string;

  owlOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor(private dataService: GoodsService,
              private route: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((params) =>
      this.item = this.dataService.getItemInfo(params['id']).pipe(
        tap(item => this.id = item.id)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToChart(): void {
    this.subscription.add(
      this.dataService.addItemToChart(this.id).subscribe(res => {
        if (res) this.store.dispatch(getUserChanges());
      })
    )
  }

  addToFavorites(): void {
    this.subscription.add(
      this.dataService.addItemToFavorites(this.id).subscribe(res => {
        if (res) this.store.dispatch(getUserChanges());
      })
    );
  }
}
