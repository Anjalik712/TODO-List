import {
  Component,
  Input,
  ChangeDetectionStrategy,
  inject,
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
  styleUrl: './create-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoComponent implements OnChanges {
  // ID for the modal (create or edit)
  @Input() id!: string;
  // Title of the modal
  @Input() title = 'Task Details';
  // Optional data passed to pre-fill the form for editing a todo
  @Input() todoData?: {
    id: number;
    task: string;
    dueDate: string;
    completed: boolean;
  };
  // Output event to notify parent component when a task is added or updated
  @Output() taskAdded = new EventEmitter<void>();
  //inject services to handle apis
  private todoService = inject(TodoServices);
  // Reactive form group definition for task creation/editing
  todoForm = new FormGroup({
    task: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });
  // Detect changes to @inputs, specifically `todoData`, for edit mode and patch values
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todoData'] && this.isEditMode) {
      this.setFormValues();
    }
  }
  //check if it is edit mode
  get isEditMode(): boolean {
    return this.todoData && this.id === 'editTaskModal';
  }
  //prefill the form in modal
  setFormValues() {
    this.todoForm.patchValue({
      task: this.todoData?.task || '',
      dueDate: this.todoData?.dueDate || '',
    });
  }
  //Handle submit function
  onSubmit() {
    // Prevent submission if form is invalid
    if (this.todoForm.invalid) return;
    const formValue = this.todoForm.value;
    // Update todo
    if (this.isEditMode) {
      this.todoService
        .updateTodo(this.todoData.id, {
          id: this.todoData.id,
          task: formValue.task,
          dueDate: formValue.dueDate,
          completed: this.todoData.completed,
        })
        .subscribe({
          next: () => this.taskAdded.emit(),
        });
    } else {
      // Create todo
      this.todoService
        .createTodo({
          Task: formValue.task,
          DueDate: formValue.dueDate,
          Completed: false,
        })
        .subscribe({
          next: () => this.taskAdded.emit(),
        });
    }
  }
}
