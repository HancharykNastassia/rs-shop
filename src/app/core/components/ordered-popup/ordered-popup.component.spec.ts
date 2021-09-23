import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedPopupComponent } from './ordered-popup.component';

describe('OrderedPopupComponent', () => {
  let component: OrderedPopupComponent;
  let fixture: ComponentFixture<OrderedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderedPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
