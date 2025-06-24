import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent {
  @Input type = 'text';
  @Input placeholder = 'Enter text';
}
