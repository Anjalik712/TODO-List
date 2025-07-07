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

/**
 * LLD
 * ---
 * This component provides a modal interface to create or edit a todo task.
 * It uses a reactive form to handle user inputs, dynamically patches form values in edit mode,
 * and communicates with a service to persist task data.
 *
 * COMPONENT RESPONSIBILITIES
 * --------------------------
 * - **Form Initialization**:
 *   - Creates a reactive form with `task` and `dueDate` fields.
 *   - Applies `required` validation to both fields.

 * - **Edit Mode Handling**:
 *   - Detects edit mode based on `todoData` input and modal ID (`editTaskModal`).
 *   - Automatically patches form values if `todoData` is provided.

 * - **Submission Flow**:
 *   - On form submission:
 *     - Prevents invalid form submission.
 *     - If in edit mode, updates the existing todo via `TodoServices.updateTodo()`.
 *     - Otherwise, creates a new todo via `TodoServices.createTodo()`.
 *   - Emits `taskAdded` output event after successful operation.

 * - **Change Detection Strategy**:
 *   - Uses `OnPush` to optimize performance by avoiding unnecessary checks.

 * EXECUTION FLOW
 * --------------
 * - On `@Input()` changes:
 *   1) If `todoData` is updated and `isEditMode` is true, form is patched with new values.

 * - On form submit:
 *   1) Validate form. If valid:
 *      - If `isEditMode`, call `updateTodo` API.
 *      - Else, call `createTodo` API.
 *   2) Emit `taskAdded` to notify parent component.

 * - On successful API call:
 *   1) Modal is expected to close using Bootstrap's `data-bs-dismiss`.
 *   2) Form values are retained unless explicitly reset.
 */

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
  @Input() todoData: {
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
  setFormValues(): void {
    this.todoForm.patchValue({
      task: this.todoData?.task || '',
      dueDate: this.todoData?.dueDate || '',
    });
  }

  //Handle submit function
  onSubmit(): void {
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
          task: formValue.task,
          dueDate: formValue.dueDate,
          completed: false,
        })
        .subscribe({
          next: () => this.taskAdded.emit(),
        });
    }
  }
}
