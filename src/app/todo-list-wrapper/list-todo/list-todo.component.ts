import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { ITodo } from '../../core/models/todo.model';
import { TodoService } from '../../core/services/todo.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { HighlightPendingDirective } from '../../shared/directives/highlight-pending.directive';
import { SearchFilterPipe } from '../../shared/pipes/search-filter.pipe';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

/**
 * LLD
 * ---
 * This component displays the list of pending and completed tasks.
 * It includes functionality to search, mark complete, edit, and delete tasks.
 * Also handles modal interactions for creating and editing tasks.
 *
 * COMPONENT RESPONSIBILITIES
 * --------------------------
 * - **Search & Filter**:
 *   - Allows user to search tasks by task name using a reactive input (`userSearchInput`).
 *   - Displays search result count with total count.

 * - **Task List Display**:
 *   - Displays pending and completed tasks in separate sections.
 *   - Applies `searchFilterPipe` to dynamically filter displayed tasks.
 *   - Renders "no tasks" messages when appropriate.

 * - **Task Actions**:
 *   - Provides checkboxes to toggle task completion state via `toggleComplete()`.
 *   - Edit button opens modal pre-filled with selected task using `openEditModal()`.
 *   - Delete button removes task via `onDelete()`.

 * - **Modal Interactions**:
 *   - Launches create task modal via `#createTaskModal`.
 *   - Launches edit task modal via `#editTaskModal`, pre-filling with selected task.
 *   - List refreshes on task addition (`taskAdded` event from modals).

 * EXECUTION FLOW
 * --------------
 * - On user input in search bar:
 *   1) Filters both pending and completed tasks using `searchFilterPipe`.

 * - On clicking "Add Task":
 *   1) Opens `#createTaskModal` modal component.

 * - On clicking "Edit":
 *   1) Calls `openEditModal(pendingTask)` to pass data to modal.
 *   2) Opens `#editTaskModal`.

 * - On `taskAdded` (from modals):
 *   1) Refreshes task list by invoking `refreshTodos()`.
 */

@Component({
  selector: 'app-list-todo',
  imports: [
    CommonModule,
    ButtonComponent,
    FormsModule,
    DatePipe,
    CreateTodoComponent,
    HighlightPendingDirective,
    TranslatePipe,
    SearchFilterPipe,
    ReactiveFormsModule,
    SkeletonComponent,
  ],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.scss',
})
export class ListTodoComponent implements OnInit {
  todos = signal<ITodo[]>([]); //signal to hold all todos

  //computed signal for pending
  pendingTasks = computed(() => this.todos().filter((todo) => !todo.completed));

  //computed signal to hold completed tasks
  completedTasks = computed(() =>
    this.todos().filter((todo) => todo.completed)
  );

  private todoService = inject(TodoService); //inject Service to handle apis
  userSearchInput = new FormControl(''); //input field binding for search functionality
  selectedTaskToEdit: ITodo = null; //stores the task selected for editing
  loading = true; //Flag to store if data is loaded or not
  ngOnInit(): void {
    this.refreshTodos();
  }

  // Refreshes the todo list by fetching data from the server
  refreshTodos(): void {
    this.loading = true;
    this.todoService.getAllTodos().subscribe((data: ITodo[]) => {
      this.todos.set(data);
      this.loading = false;
    });
  }

  //Toggles the completion status of todo
  toggleComplete(todo: ITodo): void {
    todo.completed = !todo.completed;
    this.todoService.changeStatus(todo.id, todo.completed).subscribe({
      next: () => this.refreshTodos(),
      error: () => (todo.completed = !todo.completed), // Revert if error
    });
  }

  //set the selected task to be edited to open modal with prefilled data
  openEditModal(task: ITodo): void {
    this.selectedTaskToEdit = { ...task }; //avoid editing original data
  }

  // Deletes a todo by ID and refreshes the list
  onDelete(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => this.refreshTodos(),
      error: () => alert('Failed to delete task. Please try again.'),
    });
  }
}
