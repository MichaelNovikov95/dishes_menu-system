import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { HeroComponent } from './components/hero/hero.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    NavbarComponent,
    CartButtonComponent,
    HeroComponent,
  ],
  imports: [CommonModule],
  providers: [],
  exports: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    NavbarComponent,
    CartButtonComponent,
    HeroComponent,
  ],
})
export class CoreModule {}
