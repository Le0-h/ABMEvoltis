import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { catchError, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5259/api/users'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  getUserById(id: number): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching user with id ${id}:`, error);
        return of(null);
      })
    );
  }

  createUser(user: User): Observable<User | null> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(error => {
        console.error('Error creating user:', error);
        return of(null);
      })
    );
  }

  updateUser(user: User): Observable<User | null> {
    if (!user.id) {
      return of(null);
    }
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError(error => {
        console.error(`Error updating user with id ${user.id}:`, error);
        return of(null);
      })
    );
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => true),
      catchError(error => {
        console.error(`Error deleting user with id ${id}:`, error);
        return of(false);
      })
    );
  }
}