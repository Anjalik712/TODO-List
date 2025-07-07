import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightPending]',
})
export class HighlightPendingDirective implements OnInit {
  @Input() overdueDate: string;
  @Input() isCompleted: boolean;
  private el = inject(ElementRef);
  
  ngOnInit() {
    const today = new Date();
    const dueDate = new Date(this.overdueDate);

    if (!this.isCompleted && dueDate < today) {
      this.el.nativeElement.classList.add('table-danger');
    }
  }
}
