import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { ErrorStateMatcher } from '@angular/material/core';
import { GoodsService } from '../../services/goods.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() goods$?: Observable<ItemModel[]>
  @Input() totalPrice = 0;
  @Input() name?: string;
  @Input() adress?: string;
  @Input() telNumber?: string;
  @Input() dateTime?: string;
  @Input() comments?: string;
  @Input() currentDate = new Date().toISOString().split('T')[0];

  nameInput = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);
  adressInput = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)
  ]);
  telInput = new FormControl('',[
    Validators.required,
    Validators.pattern('([+]?[0-9])*'),
  ]);
  dateInput = new FormControl('',[
    Validators.required,
  ])
  commentInput = new FormControl('',[
    Validators.maxLength(250),
  ]);

  matcher = new MyErrorStateMatcher();
  subscription!: Subscription;
  prices!: Map<string, number>;

  constructor(private store: Store<AppState>, private dataService: GoodsService) { }

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
}
