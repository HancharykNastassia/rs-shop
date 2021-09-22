import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getUserChanges } from 'src/app/redux/actions/user-actions';
import { AppState } from 'src/app/redux/state.models';
import { Order, OrderDetails, OrderedItem } from '../../models/user';
import { OrderPageComponent } from '../../pages/order-page/order-page.component';
import { GoodsService } from '../../services/goods.service';
import { OrderedPopupComponent } from '../ordered-popup/ordered-popup.component';

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-order-details-form',
  templateUrl: './order-details-form.component.html',
  styleUrls: ['./order-details-form.component.scss']
})
export class OrderDetailsFormComponent implements OnInit, OnDestroy {
  @Output() closeEmmiter = new EventEmitter<any>();
  @Input() name?: string;
  @Input() adress?: string;
  @Input() telNumber?: string;
  @Input() dateTime?: string;
  @Input() comments?: string;
  @Input() currentDate = new Date().toISOString().split('T')[0];
  @Input() items?: OrderedItem[];
  @Input() orderId?: string;
  @Input() isPopup = false;

  subscription = new Subscription();

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

  matcher = new FormErrorStateMatcher();

  constructor(public dialog: MatDialog,
              private dataService: GoodsService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  makeOrder(): void{
    if(this.items) {
      this.subscription.add(
        this.dataService.makeOrder({
          items: this.items,
          details: this.getDetails()
        }).subscribe(res => {
          if (res) {
            this.dialog.open(OrderedPopupComponent, {
              data: "Ваш заказ создан успешно, ожидайте доставку в указанное время"
            });
            this.store.dispatch(getUserChanges());
          }
        })
      );
    }
  }

  changeOrderDetails(): void {
    if (this.isPopup) this.closeEmmiter.emit('Ваш заказ успешно изменен, ожидайте доставку в указанное время');
    if (this.orderId) {
      this.subscription.add(
        this.dataService.changeOrderDetais(this.orderId, this.getDetails()).subscribe(res =>{
          if (res) {
            this.store.dispatch(getUserChanges());
          }
        })
      );
    }
  }

  private getDetails(): OrderDetails {
    return <OrderDetails> {
      name: this.name,
      address: this.adress,
      phone: this.telNumber,
      timeToDeliver: this.dateTime,
      comment: this.comments
    };
  }
}
