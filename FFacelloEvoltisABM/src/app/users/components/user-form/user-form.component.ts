import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import * as UserActions from '../../store/user.actions';
import * as fromUser from '../../store/user.selectors';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [MessageService]
})
export class UserFormComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  userId: number | null = null;
  isEditMode = false;
  loading$: Observable<boolean>;
  roles: { label: string, value: string }[] = [
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
    { label: 'Guest', value: 'Guest' }
  ];
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private messageService: MessageService
  ) {
    this.loading$ = this.store.select(fromUser.selectUserLoading);
    
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      rol: ['User', Validators.required],
      activo: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = +id;
      this.isEditMode = true;
      this.loadUserData(this.userId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUserData(id: number): void {
    this.store.dispatch(UserActions.selectUser({ userId: id }));
    
    this.store.select(fromUser.selectSelectedUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.userForm.patchValue({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono || '',
            rol: user.rol || 'User',
            activo: user.activo
          });
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos requeridos correctamente.'
      });
      return;
    }
    
    const userData: User = {
      ...this.userForm.value
    };
    
    if (this.isEditMode && this.userId) {
      userData.id = this.userId;
      this.store.dispatch(UserActions.updateUser({ user: userData }));
    } else {
      this.store.dispatch(UserActions.createUser({ user: userData }));
    }
    
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `Usuario ${this.isEditMode ? 'actualizado' : 'creado'} correctamente`
    });
    
    // Navegar de vuelta a la lista después de un breve retraso
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 1500);
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
