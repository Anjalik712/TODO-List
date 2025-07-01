import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-create-todo',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, TranslatePipe],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
