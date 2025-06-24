import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Button } from '../button/button';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../core/models/todo.model';
import { TodoServices } from '../../core/services/todo.services';

@Component({
  selector: 'app-table',
  imports: [CommonModule, Button, FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
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
