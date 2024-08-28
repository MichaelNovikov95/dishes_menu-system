import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

const routes: Routes = [{ path: 'dish/:id', component: MenuItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
