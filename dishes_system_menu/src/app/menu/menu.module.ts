import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ItemWindowComponent } from './dialogs/item-window/item-window.component';
import { ItemAdministrationComponent } from './dialogs/item-administration/item-administration.component';
import { MainComponent } from './pages/main/main.component';
import { CoreModule } from '../core/core.module';
import { SearcherComponent } from './components/searcher/searcher.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuListComponent,
    ItemWindowComponent,
    ItemAdministrationComponent,
    MainComponent,
    SearcherComponent,
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
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
