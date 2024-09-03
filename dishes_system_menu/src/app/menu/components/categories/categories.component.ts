import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @Input() categories: string[] = [];
  @Output() sendSelectedCategories = new EventEmitter<string[]>();

  public form: FormGroup;
  private subscription!: Subscription;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      selectedCategories: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.setCategories(this.categories);

    this.subscription = this.form.valueChanges.subscribe(() => {
      const selectedCategories = this.categories
        .filter((_, index) => this.form.get('selectedCategories')?.value[index])
        .filter((category) => category !== null);

      this.sendSelectedCategories.emit(selectedCategories);
    });
  }

  setCategories(categories: string[]): void {
    const formArray = this.fb.array(categories.map(() => false));
    this.form.setControl('selectedCategories', formArray);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
