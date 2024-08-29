import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ItemWindowComponent } from './dialogs/item-window/item-window.component';

@NgModule({
  declarations: [MenuComponent, MenuListComponent, ItemWindowComponent],
  imports: [CommonModule, MenuRoutingModule],
  exports: [MenuComponent],
})
export class MenuModule {}
