import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { getCategories } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/state.models';
import { CategoryModel, SubcategoryModel } from '../../models/category-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-category-nav-block',
  templateUrl: './category-nav-block.component.html',
  styleUrls: ['./category-nav-block.component.scss']
})
export class CategoryNavBlockComponent implements OnInit {
  @Input() categories$!: Observable<CategoryModel[]>;

  private _trigger?: MatMenuTrigger;

  constructor(private categoryService: GoodsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getCategories());
    this.categories$ = this.store.select((state) => state.categories.categories);
  }

  getSubcategories(id: string): Observable<SubcategoryModel[]> {
    return this.categories$.pipe(
      map((array) => {
        return array.find((item) => item.id === id)?.subCategories || [];
      })
    )
  }

  openMenu(trigger: MatMenuTrigger): void {
    if (this._trigger){
      this._trigger.closeMenu();
    }
    this._trigger = trigger;
    this._trigger.openMenu();
  }

  closeMenu(): void {
    this._trigger?.closeMenu();
    this._trigger = undefined;
  }

  onMenuClick(trigger: MatMenuTrigger): void {
    this._trigger === trigger ? this.closeMenu() : this.openMenu(trigger);
  }
}
