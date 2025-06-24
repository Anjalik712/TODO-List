import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../core/models/todo.model';
import { TodoServices } from '../../core/services/todo.services';

@Component({
  selector: 'app-list-todo',
  imports: [CommonModule, ButtonComponent, FormsModule, DatePipe],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css',
})
export class ListTodoComponent implements OnInit {
  todos = signal<Todo[]>([]);
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private todoservices: TodoServices) {}
  toggleComplete(todo) {
    todo.completed = !todo.completed;
  }

  ngOnInit(): void {
    this.todoservices.getAllTodos().subscribe((t: Todo[]) => this.todos.set(t));
  }
  pendingTasks = computed(() => this.todos().filter((todo) => !todo.completed));
  completedTasks = computed(() =>
    this.todos().filter((todo) => todo.completed)
  );
}
