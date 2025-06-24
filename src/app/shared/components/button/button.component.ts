import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string;
  @Input() type = 'button';
  @Input() cssClass = 'btn btn-primary';
  @Input() icon?: string;
  @Input() disabled = false;
  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}
