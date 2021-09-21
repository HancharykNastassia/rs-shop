import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/redux/state.models';
import { Order } from '../../models/user';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  @Input() orders$!: Observable<Order[] | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.orders$ = this.store.select((state) => state.user.user?.orders);
  }
}
