import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workout-metrics',
  standalone: true,
  imports: [],
  templateUrl: './workout-metrics.html',
  styleUrl: './workout-metrics.css',
})
export class WorkoutMetrics {
  @Input() analysis: any;
}
