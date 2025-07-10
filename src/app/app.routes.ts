import { Route } from '@angular/router';

import { TodoListWrapperComponent } from './todo-list-wrapper/todo-list-wrapper.component';

export const appRoutes: Route[] = [
  { path: '', component: TodoListWrapperComponent },
];
