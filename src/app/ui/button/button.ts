import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() label = 'Click';
  @Input() type = 'button';
  @Input() cssClass = 'btn btn-primary';
  @Input() icon?: string;

  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}
