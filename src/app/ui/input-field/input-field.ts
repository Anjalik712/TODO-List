import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField {
  @Input type = 'text';
  @Input placeholder = 'Enter text';
}
