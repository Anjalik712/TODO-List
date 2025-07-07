import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoServices {
  private readonly endpoint = 'todos';
  private http = inject(HttpClient);
  getAllTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.endpoint);
  }
  createTodo(todo: { Task: string; DueDate: string; Completed: boolean }) {
    return this.http.post<ITodo>(this.endpoint, todo);
  }
  updateTodo(id: number, todo: ITodo) {
    return this.http.put<ITodo>(`${this.endpoint}/${id}`, todo);
  }
  changeStatus(id: number, completed: boolean) {
    return this.http.patch(`${this.endpoint}/${id}/status`, completed);
  }
  deleteTodo(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
