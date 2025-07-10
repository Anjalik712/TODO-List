import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreateTodo } from '../models/ICreateTodo.model';
import { ITodo } from '../models/ITodo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // Base endpoint for the todos API
  private readonly endpoint = 'todos';

  // Injecting Angular's HttpClient for making HTTP requests
  private http = inject(HttpClient);

  /**
   * Fetches all todo items from the server.
   * @returns An observable containing a list of todos.
   */
  getAllTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.endpoint);
  }

  /**
   * Sends a request to create a new todo item.
   * @param todo - The new todo item to be created.
   * @returns An observable containing the created todo item.
   */
  createTodo(todo: ICreateTodo): Observable<ITodo> {
    return this.http.post<ITodo>(this.endpoint, todo);
  }

  /**
   * Updates an existing todo item by ID.
   * @param id - The ID of the todo to be updated.
   * @param todo - The updated todo data.
   * @returns An observable containing the updated todo item.
   */
  updateTodo(id: number, todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.endpoint}/${id}`, todo);
  }

  /**
   * Updates the completion status of a todo item.
   * @param id - The ID of the todo item.
   * @param completed - The new completion status.
   * @returns An observable containing the updated todo item.
   */
  changeStatus(id: number, completed: boolean): Observable<ITodo> {
    return this.http.patch<ITodo>(`${this.endpoint}/${id}/status`, completed);
  }

  /**
   * Deletes a todo item by ID.
   * @param id - The ID of the todo item to be deleted.
   * @returns An observable with void response on successful deletion.
   */
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
