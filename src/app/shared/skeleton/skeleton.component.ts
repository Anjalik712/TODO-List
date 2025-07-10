import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  @Input() width = '100%'; // e.g., "100%", "50%", "200px"
  @Input() height = '1rem'; // optional height
  @Input() rounded = true; // optional border radius
}
