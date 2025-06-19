import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from "../button/button";

@Component({
  selector: 'app-table',
  imports: [CommonModule, Button],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  // @Input todos=[];
  todos=[
    {
      completed:true,
      task:'Email CEO',
      due_date:'28/05/2025'
    },
    {
      completed:false,
      task:'Eat Lunch',
      due_date:'29/05/2025'
    },
    {
      completed:true,
      task:'Book doctors appointment',
      due_date:'30/05/2025'
    },
  ];
  toggleComplete(todo) {
  todo.completed = !todo.completed;
}
  
}
