import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { InputFieldComponent } from '../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-todo-list-wrapper',
  imports: [CommonModule, ButtonComponent, InputFieldComponent, ListTodoComponent],
  templateUrl: './todo-list-wrapper.component.html',
  styleUrl: './todo-list-wrapper.component.css',
})
export class TodoListWrapperComponent {}
