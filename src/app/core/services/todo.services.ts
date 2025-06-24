import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoServices {
  private readonly endpoint = 'todos';
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) {}
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.endpoint);
  }
}
