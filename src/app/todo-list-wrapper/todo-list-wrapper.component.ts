import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * LLD
 * ---
 * This component serves as the top-level container for the To-Do application.
 * It displays the main application heading and embeds the `ListTodoComponent` responsible for task operations.
 
* STRUCTURAL DETAILS
 * ------------------
 * - Wrapped in a `div` with `mx-5 my-2` for margin.
 * - Uses `display-3` and `mb-5` for prominent heading styling.
 * - Acts as a simple layout wrapper without any logic.
 
* EXECUTION FLOW
 * --------------
 *   1) Displays the application title.
 *   2) Loads the `ListTodoComponent`.

 * - All task-level actions are handled inside `app-list-todo`.
 */

@Component({
  selector: 'app-todo-list-wrapper',
  imports: [CommonModule, ListTodoComponent, TranslatePipe],
  templateUrl: './todo-list-wrapper.component.html',
  styleUrl: './todo-list-wrapper.component.scss',
})
export class TodoListWrapperComponent {}
