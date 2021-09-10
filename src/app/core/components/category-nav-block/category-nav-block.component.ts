import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCategories } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/state.models';
import { CategoryModel } from '../../models/category-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-category-nav-block',
  templateUrl: './category-nav-block.component.html',
  styleUrls: ['./category-nav-block.component.scss']
})
export class CategoryNavBlockComponent implements OnInit {
  @Input() categories$!: Observable<CategoryModel[]>;

  constructor(private categoryService: GoodsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    //this.store.dispatch(getCategories())
    this.categories$ = this.store.select((state) => state.categories.categories);
  }

}
