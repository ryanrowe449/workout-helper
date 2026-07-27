import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutForm } from './components/workout-form/workout-form';
import { WorkoutMetrics } from './components/workout-metrics/workout-metrics';
import { WorkoutService } from './services/workout.service';

@Component({
  selector: 'app-root',
  imports: [WorkoutForm, WorkoutMetrics],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('workout-helper-frontend');
  private workoutService = inject(WorkoutService);
  analysis: any = null;

  analyzeWorkout(workout: any) {
    this.workoutService.analyzeWorkout(workout).subscribe({
      next: response => {
        this.analysis = response;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  analyzeWorkoutWithAI(workout: any) {
    this.workoutService.analyzeWorkoutWithAI(workout).subscribe({
      next: response => {
        this.analysis = response;
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
