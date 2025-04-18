import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  { 
    path: 'users', 
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule) 
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //UsersModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    RouterModule.forRoot(routes)
/*    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),*/
  ],
  exports: [

      
      // Exporta los módulos de PrimeNG que necesites compartir
      ButtonModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
