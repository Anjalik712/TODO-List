import {
  Component,
  Input,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { TodoServices } from '../../core/services/todo.services';

@Component({
  selector: 'app-create-todo',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, TranslatePipe],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoComponent implements OnInit, OnChanges {
  @Input() id!: string;
  @Input() title = 'Task Details';
  @Input() todoData?: {
    id: number;
    task: string;
    dueDate: string;
    completed: boolean;
  };
  @Output() taskAdded = new EventEmitter<void>();
  private todoService = inject(TodoServices);
  ngOnInit(): void {
    if (this.id === 'editTaskModal' && this.todoData) {
      this.todoForm.patchValue({
        task: this.todoData.task,
        dueDate: this.todoData.dueDate,
      });
    }
  }
  todoForm = new FormGroup({
    task: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todoData'] && this.todoData && this.id === 'editTaskModal') {
      this.setFormValues();
    }
  }

  setFormValues() {
    this.todoForm.patchValue({
      task: this.todoData?.task || '',
      dueDate: this.todoData?.dueDate || '',
    });
  }
  onSubmit() {
    console.log('onsubmit works');
    if (this.todoForm.invalid) return;

    const formValue = this.todoForm.value;

    if (this.id === 'createTaskModal') {
      this.todoService
        .createTodo({
          Task: formValue.task!,
          DueDate: formValue.dueDate!,
          Completed: false,
        })
        .subscribe({
          next: (res) => {
            console.log('Task added:', res);
            this.taskAdded.emit();
          },
          error: (err) => console.error('Add failed', err),
        });
    } else if (this.id === 'editTaskModal' && this.todoData) {
      this.todoService
        .updateTodo(this.todoData.id, {
          id: this.todoData.id,
          task: formValue.task!,
          dueDate: formValue.dueDate!,
          completed: this.todoData.completed,
        })
        .subscribe({
          next: (res) => {
            console.log('Task updated:', res);
            this.taskAdded.emit();
          },
          error: (err) => console.error('Update failed', err),
        });
    }
  }
}
