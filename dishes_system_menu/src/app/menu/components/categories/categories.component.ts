import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

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

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryService.currentCategories
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
        if (this.categories.length) {
          this.initCategoriesForm();
        }
      });
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
