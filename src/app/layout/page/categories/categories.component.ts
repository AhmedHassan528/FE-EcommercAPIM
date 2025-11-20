import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategories } from '../../../core/Interfaces/icategories';
import { CategoryService } from '../../../core/services/Categories/category.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-categories',
    imports: [TranslateModule],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {

  // subscriptions
  GetAllCategoriesSub!: Subscription;

  // data
  CategoriesData:ICategories[] = [];

  // constructor
  constructor(private _categoryService:CategoryService) {}

  // component lifecycle
  ngOnInit() {
    this.getCategories();
  }

  ngOnDestroy() {
    this.GetAllCategoriesSub?.unsubscribe();
  }


  // functions
  getCategories() {
    this.GetAllCategoriesSub = this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.CategoriesData = res;
      }
    });
  }
}
