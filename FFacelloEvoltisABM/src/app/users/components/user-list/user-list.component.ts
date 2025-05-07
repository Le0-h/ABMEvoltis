import { Component, OnInit,ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { User } from '../../../models/user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as UserActions from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';
import * as fromUser from '../../store/user.selectors';
import { selectAllUsers, selectUserLoading } from '../../store/user.selectors';
import { loadUsers } from '../../store/user.actions';
import { Table } from 'primeng/table';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService]
})
export class UserListComponent implements OnInit {
  @ViewChild('dt') table!: Table;

  users$: Observable<User[]> = this.store.select(selectAllUsers);
  loading$: Observable<boolean> = this.store.select(selectUserLoading);
  users: User[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    this.users$.subscribe(users => {
      // console.log('✅ USERS from selectAllUsers:', users);
      this.users = [...users]; // copia local de usuarios para evitar problemas de referencia
      // console.log('Usars:', users);
    });
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

  applyFilterGlobal($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.table.filterGlobal(target.value, 'contains');
  }
}