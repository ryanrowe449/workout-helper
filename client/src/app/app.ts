import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutForm } from './components/workout-form/workout-form';

@Component({
  selector: 'app-root',
  imports: [WorkoutForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('workout-helper-frontend');
}
