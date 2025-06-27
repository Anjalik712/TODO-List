import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoListWrapperComponent } from './todo-list-wrapper/todo-list-wrapper.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  imports: [RouterModule, TodoListWrapperComponent, TranslateModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'todo-list';
  private translate = inject(TranslateService);
  constructor() {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');
  }
}
