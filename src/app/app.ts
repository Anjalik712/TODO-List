import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoListWrapperComponent } from './todo-list-wrapper/todo-list-wrapper.component';
import { CreateTodoComponent } from "./todo-list-wrapper/create-todo/create-todo.component";

@Component({
  imports: [RouterModule, TodoListWrapperComponent, CreateTodoComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'todo-list';
}
