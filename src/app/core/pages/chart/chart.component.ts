import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AppState } from 'src/app/redux/state.models';
import { ItemModel } from '../../models/item-models';
import { ErrorStateMatcher } from '@angular/material/core';

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
export class ChartComponent implements OnInit {
  @Input() chartItemsIds$?: Observable<string[] | undefined>
  @Input() totalPrice = 0;
  @Input() name?: string;
  @Input() adress?: string;
  @Input() telNumber?: string;
  @Input() dateTime?: string;
  @Input() comments?: string;

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
  ])
  commentInput = new FormControl('',[
    Validators.maxLength(250),
  ])

  matcher = new MyErrorStateMatcher();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chartItemsIds$ = this.store.select((state) => state.user.user?.cart);
  }

  countTotalPrice(price: number):void {
    this.totalPrice+=price;
  }
}
