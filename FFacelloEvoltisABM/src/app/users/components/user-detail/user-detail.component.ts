import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import * as UserActions from '../../store/user.actions';
import * as fromUser from '../../store/user.selectors';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user$: Observable<User | null>;
  loading$: Observable<boolean>;
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.user$ = this.store.select(fromUser.selectSelectedUser);
    this.loading$ = this.store.select(fromUser.selectUserLoading);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(UserActions.selectUser({ userId: +id }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEdit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.router.navigate(['/users/edit', id]);
    }
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }
}