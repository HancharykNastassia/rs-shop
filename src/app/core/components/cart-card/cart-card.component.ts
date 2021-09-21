import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemModel } from '../../models/item-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss']
})
export class CartCardComponent implements OnInit {
  @Output() priceEmmiter = new EventEmitter<{id: string, multyplier: number}>();
  @Input() item!: ItemModel;
  @Input() multyplier = 1;

  constructor(private dataService: GoodsService) { }

  ngOnInit(): void {
    this.priceEmmiter.emit({id: this.item.id, multyplier: this.multyplier});
  }
}
