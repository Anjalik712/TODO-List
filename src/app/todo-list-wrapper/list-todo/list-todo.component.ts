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
  todos = signal<Todo[]>([]);
  private todoServices = inject(TodoServices);
  userSearchInput = new FormControl('');
  private todoservices = inject(TodoServices);
  toggleComplete(todo: Todo) {
    const prevStatus = todo.completed;
    todo.completed = !todo.completed;
    this.todoServices.changeStatus(todo.id, todo.completed).subscribe({
      next: () => {
        console.log('Status updated successfully');
        this.refreshTodos();
      },
      error: (err) => {
        console.error('Error updating status:', err);
        todo.completed = !todo.completed; // Revert if error
      },
    });
  }

  ngOnInit(): void {
    this.todoservices.getAllTodos().subscribe((t: Todo[]) => this.todos.set(t));
  }
  refreshTodos() {
    this.todoServices.getAllTodos().subscribe((data) => {
      this.todos.set(data);
    });
  }
  pendingTasks = computed(() => this.todos().filter((todo) => !todo.completed));
  completedTasks = computed(() =>
    this.todos().filter((todo) => todo.completed)
  );
  selectedTaskToEdit: any = null;

  openEditModal(task: any) {
    this.selectedTaskToEdit = { ...task };
  }
  onDelete(id: number) {
    this.todoServices.deleteTodo(id).subscribe({
      next: () => {
        console.log('Task deleted successfully');
        this.refreshTodos();
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete task. Please try again.');
      },
    });
  }
}
