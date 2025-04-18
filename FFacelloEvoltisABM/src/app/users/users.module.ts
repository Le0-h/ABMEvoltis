import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { environment } from '../environments/environment';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

// PrimeNG modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

// NGRX
import { reducers } from './store';
import { UserEffects } from './store/user.effects';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature([UserEffects]),
/*    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),*/
    
    // PrimeNG
    TableModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    CardModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule
  ],
  exports: [
    // Exporta los componentes que necesites usar fuera de este módulo
    UserListComponent,
    UserFormComponent,
    UserDetailComponent,
    
    // Exporta los módulos de PrimeNG que necesites compartir
    ButtonModule,
    TableModule,
    InputTextModule,
  ]
})
export class UsersModule { }
