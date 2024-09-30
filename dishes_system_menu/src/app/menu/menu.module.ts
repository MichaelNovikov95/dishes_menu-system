import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ItemWindowComponent } from './dialogs/item-window/item-window.component';
import { MainComponent } from './pages/main/main.component';
import { CoreModule } from '../core/core.module';
import { SearcherComponent } from './components/searcher/searcher.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DishWindowComponent } from './dialogs/dish-window/dish-window.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { ChatButtonComponent } from './components/chat-button/chat-button.component';
import { ChatWindowComponent } from './dialogs/chat-window/chat-window.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuListComponent,
    ItemWindowComponent,
    MainComponent,
    SearcherComponent,
    CategoriesComponent,
    DishWindowComponent,
    DishFormComponent,
    ChatButtonComponent,
    ChatWindowComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    CoreModule,
    NgOptimizedImage,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
