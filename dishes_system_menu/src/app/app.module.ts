import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environmets/environment';

import { HeaderInterceptor } from './shared/interceptors/header/header.service';
import { TokenExpireInterceptor } from './shared/interceptors/token_expire/token-expire.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';

import { provideState, provideStore } from '@ngrx/store';
import { CategoriesReducer } from './store/categories/categories.reducer';
import { provideEffects } from '@ngrx/effects';
import { CateogiresEffect } from './store/categories/categories.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    MenuModule,
    AuthModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Максимальна кількість екшенів для збереження історії
      logOnly: environment.production, // Працює лише в режимі розробки
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpireInterceptor,
      multi: true,
    },
    provideStore(),
    provideState({ name: 'categories', reducer: CategoriesReducer }),
    provideEffects(CateogiresEffect),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
