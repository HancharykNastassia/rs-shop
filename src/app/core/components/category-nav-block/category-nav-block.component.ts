import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/category-models';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-category-nav-block',
  templateUrl: './category-nav-block.component.html',
  styleUrls: ['./category-nav-block.component.scss']
})
export class CategoryNavBlockComponent implements OnInit {
  @Input() categories$!: Observable<CategoryModel[]>;

  constructor(private categoryService: GoodsService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategoriesList();
  }

}
