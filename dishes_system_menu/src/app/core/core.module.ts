import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';

import { DataService } from './services/data.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    NavbarComponent,
    CartButtonComponent,
  ],
  imports: [CommonModule],
  providers: [],
  exports: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    NavbarComponent,
    CartButtonComponent,
  ],
})
export class CoreModule {
  constructor(private DataService: DataService) {}
}
