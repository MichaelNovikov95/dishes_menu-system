import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @Input() categories: string[] = [];
  @Output() sendSelectedCategories = new EventEmitter<string[]>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
