import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

@NgModule({
  declarations: [MenuComponent, MenuItemComponent, MenuListComponent],
  imports: [CommonModule, MenuRoutingModule],
  exports: [MenuComponent, MenuItemComponent],
})
export class MenuModule {}
