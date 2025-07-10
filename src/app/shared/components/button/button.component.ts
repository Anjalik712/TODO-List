import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * LLD
 * ---
 * This component provides a reusable and customizable button element that supports
 * dynamic labeling, styling, icons, Bootstrap modal behavior, and event emission.
 *
 * COMPONENT RESPONSIBILITIES
 * --------------------------
 * - **Label and Type**:
 *   - Displays a customizable label passed via `@Input() label`.
 *   - Supports button types like `'button'`, `'submit'`, etc. via `@Input() type`.

 * - **Styling**:
 *   - Applies dynamic CSS classes through `@Input() cssClass`, defaulting to `'btn btn-primary'`.

 * - **Icon Support**:
 *   - Optionally displays an icon using `@Input() icon` (e.g., Bootstrap icon class).

 * - **Bootstrap Modal Integration**:
 *   - Can trigger modals using Bootstrap’s `data-bs-toggle` and `data-bs-target` attributes.
 *   - Also supports modal dismissal via `data-bs-dismiss`, defaulting to `'modal'`.

 * - **Interactivity**:
 *   - Button can be disabled using `@Input() disabled`.
 *   - Emits an `action` event on click for parent components to handle button behavior.

 * EXECUTION FLOW
 * --------------
 * - On component render:
 *   1) Binds inputs to native `<button>` element attributes and classes.

 * - On user click:
 *   1) Emits `action` event to the parent using `EventEmitter<void>()`.
 */

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  // Label to display inside the button
  @Input() label = '';

  // HTML button type (e.g., 'button', 'submit', 'reset')
  @Input() type = 'button';

  // CSS classes to style the button
  @Input() cssClass = 'btn btn-primary';

  // Icon class to show inside the button
  @Input() icon = '';

  // Whether the button is disabled
  @Input() disabled = false;

  // Bootstrap modal toggle type for opening modals
  @Input() toggle = '';

  // Target modal ID to open
  @Input() target = '';

  // Dismiss type for closing modals (default is 'modal')
  @Input() dismiss = 'modal';

  // Emits an event when the button is clicked
  @Output() buttonClick = new EventEmitter<void>();

  // Handles button click and emits the buttonClick event
  onClick(): void {
    this.buttonClick.emit();
  }
}
