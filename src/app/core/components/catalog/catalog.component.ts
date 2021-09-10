import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/redux/state.models';
import { CategoryModel, SubcategoryModel } from '../../models/category-models';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  @Input() categories$!: Observable<CategoryModel[]>
  @Input() subCategories$!: Observable<SubcategoryModel[]>

  chosenId?: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.categories$ = this.store.select((state) => state.categories.categories);
  }

  getSubcategories(): void {
    this.subCategories$ = this.categories$.pipe(
      map((array) => {
        return array.find((item) => item.id === this.chosenId)?.subCategories || [];
      })
    );
  }

  getTitle(): Observable<string> {
    return this.categories$.pipe(
      map((array) => {
        return array.find((item) => item.id === this.chosenId)?.name || '';
      })
    );
  }

  showSubCategories(id: string): void {
    this.chosenId = id;
    this.getSubcategories();
  }
}
