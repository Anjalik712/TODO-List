import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightPending]',
})
export class HighlightPendingDirective implements OnInit {
  // Input property to receive the due date of the task
  @Input() overdueDate: string;

  // Input property to check if the task is completed
  @Input() isCompleted: boolean;

  // Injecting ElementRef to directly access and manipulate the DOM element
  private el = inject(ElementRef);

  /**
   * Lifecycle hook that runs after inputs are set.
   * Adds a 'table-danger' class to highlight overdue, incomplete tasks.
   */
  ngOnInit(): void {
    const today = new Date(); // Get current date
    const dueDate = new Date(this.overdueDate); // Convert input date string to Date object

    // If the task is not completed and the due date is past, highlight the row
    if (!this.isCompleted && dueDate < today) {
      this.el.nativeElement.classList.add('table-danger');
    }
  }
}
