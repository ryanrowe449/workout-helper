import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private http = inject(HttpClient);

  analyzeWorkout(workout: any) {
    return this.http.post(
      'http://localhost:3000/analyze/metrics',
      workout
    );
  }

  analyzeWorkoutWithAI(workout: any) {
    return this.http.post(
      'http://localhost:3000/analyze',
      workout
    );
  }

}