import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() chartItemsIds$?: Observable<string[] | undefined>
  @Input() totalPrice = 0;
  @Input() name?: string;
  @Input() adress?: string;
  @Input() telNumber?: string;
  @Input() dateTime?: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chartItemsIds$ = this.store.select((state) => state.user.user?.cart);
  }

  countTotalPrice(price: number):void {
    this.totalPrice+=price;
  }
}
