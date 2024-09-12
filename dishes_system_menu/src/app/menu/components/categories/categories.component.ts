import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { getAllCategories } from '../../../store/categories/categories.action';
import { AppState } from '../../../store/app.state';
import { selectCategories } from '../../../store/categories/categories.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public categories$!: Observable<string[]>;
  @Output() sendSelectedCategories = new EventEmitter<string[]>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getAllCategories());

    this.categories$ = this.store.select(selectCategories);

    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      if (categories.length) {
        this.initCategoriesForm(categories);
      }
    });
  }

  get formArray(): FormArray {
    return this.form.get('selectedCategories') as FormArray;
  }

  private initCategoriesForm(categoires: string[]): void {
    this.form = this.fb.group({
      selectedCategories: this.fb.array(categoires.map(() => false)),
    });
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      const selectedCategories = categoires
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
