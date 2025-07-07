import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodo } from '../models/ITodo.model';
import { ICreateTodo } from '../models/ICreateTodo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoServices {
  private readonly endpoint = 'todos';
  private http = inject(HttpClient);
  getAllTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.endpoint);
  }
  createTodo(todo: ICreateTodo): Observable<ITodo> {
    return this.http.post<ITodo>(this.endpoint, todo);
  }
  updateTodo(id: number, todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.endpoint}/${id}`, todo);
  }
  changeStatus(id: number, completed: boolean): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.endpoint}/${id}/status`, completed);
  }
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
