import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() firstSlides$!: Observable<ItemModel[]>;
  @Input() secondSlides$!: Observable<ItemModel[][]>;

  firstOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 700,
  };

  secondOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  constructor(private store: Store<AppState>, private dataService: GoodsService) {}

  ngOnInit(): void {
    this.firstSlides$ = this.store.select((state) => state.categories.categories).pipe(
      switchMap(cats => forkJoin(cats.map(cat => this.dataService.getGoodsFrom(cat.id, undefined, 0, 2).pipe(
        map(item => item[0].imageUrls[0] ? item[0] : item[1])
      ))))
    );
    this.secondSlides$ = this.store.select((state) => state.categories.categories).pipe(
      switchMap(cats => forkJoin(cats.map((cat) => this.dataService.getGoodsFrom(
        cat.id, undefined, 0, 6, 'rating', true)
      )))
    )
  }
}
