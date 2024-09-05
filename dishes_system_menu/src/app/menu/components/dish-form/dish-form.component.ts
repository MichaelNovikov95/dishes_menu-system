import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MenuService } from '../../../shared/services/menu/menu.service';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrl: './dish-form.component.css',
})
export class DishFormComponent implements OnInit {
  @Input() categories: string[] = [];
  @Input() recievedDish!: Observable<Dish>;
  @Input() id: string | null = null;

  public newDishForm: FormGroup;
  public featured: string[] = ['true', 'false'];
  public selectedFile: File | null = null;

  constructor(
    private menuService: MenuService,
    private fb: FormBuilder,
    private dialogRef: MatDialog
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
    if (this.id) {
      this.recievedDish.pipe(take(1)).subscribe((dish) => {
        this.newDishForm.patchValue(dish);
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
    this.menuService
      .createDish(this.newDishForm.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          console.log('Dish created successfully');
        },
        error: (err) => {
          console.error('Error creating dish:', err);
        },
      });
  }

  private updateDish(id: string) {
    this.menuService
      .updateDishById(id, this.newDishForm.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          console.log('Dish updated successfully');
        },
        error: (err) => {
          console.error('Error updating dish:', err);
        },
      });
  }
}
