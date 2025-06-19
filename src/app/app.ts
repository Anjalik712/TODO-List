import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Page } from "./page/page";

@Component({
  imports: [RouterModule, Page],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'todo-list';
}
