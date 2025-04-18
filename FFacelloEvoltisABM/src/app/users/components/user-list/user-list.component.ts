import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as UserActions from '../../store/user.actions';
import * as fromUser from '../../store/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService]
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  
  constructor(
    private store: Store,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.users$ = this.store.select(fromUser.selectAllUsers);
    this.loading$ = this.store.select(fromUser.selectUserLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  onAddUser(): void {
    this.router.navigate(['/users/new']);
  }

  onEditUser(user: User): void {
    if (user.id) {
      this.router.navigate(['/users/edit', user.id]);
    }
  }

  onViewUser(user: User): void {
    if (user.id) {
      this.router.navigate(['/users', user.id]);
    }
  }

  onDeleteUser(user: User): void {
    if (!user.id) return;
    
    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar al usuario ${user.nombre} ${user.apellido}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(UserActions.deleteUser({ id: user.id as number }));
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Usuario eliminado correctamente'
        });
      }
    });
  }
}