import { Route } from '@angular/router';

import { TodoListWrapperComponent } from './todo-list-wrapper/todo-list-wrapper.component';

export const appRoutes: Route[] = [
  { path: 'todo-list-wrapper', component: TodoListWrapperComponent },
  { path: '', redirectTo: '/todo-list-wrapper', pathMatch: 'full' },
];
