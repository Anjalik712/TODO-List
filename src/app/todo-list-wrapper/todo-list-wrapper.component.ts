import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-todo-list-wrapper',
  imports: [
    CommonModule,
    ButtonComponent,
    ListTodoComponent,
    CreateTodoComponent,
    TranslatePipe,
  ],
  templateUrl: './todo-list-wrapper.component.html',
  styleUrl: './todo-list-wrapper.component.scss',
})
export class TodoListWrapperComponent {}
