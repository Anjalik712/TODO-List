import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Todo } from '../../core/models/todo.model';
import { TodoServices } from '../../core/services/todo.services';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { HighlightPendingDirective } from '../../shared/directives/highlight-pending.directive';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchFilterPipe } from '../../shared/pipes/search-filter.pipe';
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
  ],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css',
})
export class ListTodoComponent implements OnInit {
  todos = signal<Todo[]>([]); //signal to hold all todos
  //computed signal for pending
  pendingTasks = computed(() => this.todos().filter((todo) => !todo.completed));
  //computed signal to hold completed tasks
  completedTasks = computed(() =>
    this.todos().filter((todo) => todo.completed)
  );
  private todoServices = inject(TodoServices); //inject services to handle apis
  userSearchInput = new FormControl(''); //input field binding for search functionality
  selectedTaskToEdit: Todo = null; //stores the task selected for editing
  ngOnInit(): void {
    this.refreshTodos();
  }
  // Refreshes the todo list by fetching data from the server
  refreshTodos() {
    this.todoServices.getAllTodos().subscribe((data: Todo[]) => {
      this.todos.set(data);
    });
  }
  //Toggles the completion status of todo
  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoServices.changeStatus(todo.id, todo.completed).subscribe({
      next: () => this.refreshTodos(),
      error: () => (todo.completed = !todo.completed), // Revert if error
    });
  }
  //set the selected task to be edited to open modal with prefilled data
  openEditModal(task: Todo) {
    this.selectedTaskToEdit = { ...task }; //avoid editing original data
  }
  // Deletes a todo by ID and refreshes the list
  onDelete(id: number) {
    this.todoServices.deleteTodo(id).subscribe({
      next: () => this.refreshTodos(),
      error: () => alert('Failed to delete task. Please try again.'),
    });
  }
}
