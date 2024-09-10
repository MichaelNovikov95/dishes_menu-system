import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
// import { AppState } from '../../../store/categories/reducer/categories.reducer';
import { getAllCategories } from '../../../store/categories/categories.action';
import { AppState } from '../../../store/app.state';
import { selectCategories } from '../../../store/categories/categories.selector';
// import { selectCategories } from '../../../store/categories/categories.selector';
// import { loadCateogires } from '../../../store/categories/actions/categories.action';
// import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories: string[] = [];
  @Output() sendSelectedCategories = new EventEmitter<string[]>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    // this.store.dispatch(getAllCategories());
  }

  ngOnInit(): void {
    // this.categoryService.currentCategories
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((categories) => {
    //     this.categories = categories;
    //     if (this.categories.length) {
    //       this.initCategoriesForm();
    //     }
    //   });
  }

  get formArray() {
    return this.form.get('selectedCategories') as FormArray;
  }

  initCategoriesForm(): void {
    this.form = this.fb.group({
      selectedCategories: this.fb.array(this.categories.map(() => false)),
    });
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      const selectedCategories = this.categories
        .filter((_, index) => value.selectedCategories[index])
        .filter(Boolean);
      this.sendSelectedCategories.emit(selectedCategories);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
