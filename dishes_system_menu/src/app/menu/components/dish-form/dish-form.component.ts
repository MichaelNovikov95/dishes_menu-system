import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { Dish } from '../../../shared/interfaces/menu.interface';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '../../../store/app.state';
import {
  createDish,
  updateDishById,
} from '../../../store/dishes/dishes.action';
import { getAllCategories } from '../../../store/categories/categories.action';
import { selectCategories } from '../../../store/categories/categories.selector';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.css',
})
export class DishFormComponent implements OnInit {
  public categories$!: Observable<string[]>;
  @Input() recievedDish!: Observable<Dish>;
  @Input() id: string | null = null;

  public newDishForm: FormGroup;
  public featured: string[] = ['true', 'false'];
  public selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private store: Store<AppState>
  ) {
    this.newDishForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
      category: ['', Validators.required],
      description: [''],
      featured: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getAllCategories());
    this.categories$ = this.store.select(selectCategories);

    if (this.id) {
      this.recievedDish.pipe(take(1)).subscribe((dish) => {
        this.categories$.pipe(take(1)).subscribe((categories) => {
          const position = dish.categoryId! - 2;

          this.newDishForm.patchValue({
            name: dish.name,
            price: dish.price,
            image: dish.image,
            category: categories[position],
            description: dish.description,
            featured: dish.featured.toString(),
          });
        });
      });
    }
  }

  public onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  public onSubmit() {
    if (this.selectedFile) {
      this.newDishForm.patchValue({ image: this.selectedFile });
    }
    if (!this.id) {
      this.createDish();
    } else {
      this.updateDish(this.id);
    }
    this.dialogRef.closeAll();
  }

  private createDish() {
    this.store.dispatch(createDish({ newDish: this.newDishForm.value }));
  }

  private updateDish(id: string) {
    this.store.dispatch(
      updateDishById({ id: id, dish: this.newDishForm.value })
    );
  }
}
