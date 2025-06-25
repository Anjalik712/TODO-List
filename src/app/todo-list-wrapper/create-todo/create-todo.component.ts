import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-create-todo',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent {
  @Input() id!: string;
  @Input() title = 'Task Details';
  todoForm = new FormGroup({
    task: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });
  onSubmit() {
    console.warn(this.todoForm.value);
  }
}
