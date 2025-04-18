import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'new', component: UserFormComponent },
  { path: 'edit/:id', component: UserFormComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
