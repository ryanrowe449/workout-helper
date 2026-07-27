import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

interface Set {
  weight: number | null;
  reps: number | null;
}

interface ExerciseEntry {
  selectedExercise: string;
  sets: Set[];
}

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './workout-form.html',
  styleUrl: './workout-form.css',
})


export class WorkoutForm {
  bodyweight: number | null = null;
  
  exercises = [
    'Dumbbell Bench Press',
    'Machine Bench Press',
    'Weighted Pullups',
    'Machine Row',
    'Dumbbell Preacher Curl',
    'Machine Preacher Curl',
    'Dumbbell Skullcrusher',
    'Tricep Extension',
    'Barbell Back Squat',
    'Romanian Deadlift',
    'Quad Extension',
    'Seated Hamstring Curl'
  ];

  // create an empty array of exercise entries, then add one with constructor
  exerciseEntries: ExerciseEntry[] = [];

  constructor(private workoutService: WorkoutService) {
    this.addExercise();
  }

  addExercise() {
    this.exerciseEntries.push({
      selectedExercise: '',
      sets: [
        {
          weight: null,
          reps: null
        }
      ]
    });
  }

  removeExercise(index: number) {
    this.exerciseEntries.splice(index, 1);
  }

  addSet(exerciseIndex: number) {
    this.exerciseEntries[exerciseIndex].sets.push({
      weight: null,
      reps: null
    });
  }

  removeSet(exerciseIndex: number, setIndex: number) {
    this.exerciseEntries[exerciseIndex].sets.splice(setIndex, 1);
  }

  private buildWorkout(): any {
    return {
      bodyweight: this.bodyweight,
      exercises: this.exerciseEntries.map(entry => ({
        name: entry.selectedExercise,
        sets: entry.sets
      }))
    };
  }

  @Output() metricsRequested = new EventEmitter<any>();
  @Output() aiAnalysisRequested = new EventEmitter<any>();

  submitMetrics() {
    const workout = this.buildWorkout();
    this.metricsRequested.emit(workout);
  }

  submitAIAnalysis() {
    const workout = this.buildWorkout();
    this.aiAnalysisRequested.emit(workout);
  }
  // @Output() workoutSubmitted = new EventEmitter<any>();
  // submitWorkout() {
  //   const workout = {
  //     bodyweight: this.bodyweight,
  //     exercises: this.exerciseEntries.map(entry => ({
  //       name: entry.selectedExercise,
  //       sets: entry.sets
  //     }))
  //   };
  //   // emit workout data to the parent object (App)
  //   this.workoutSubmitted.emit(workout);
  // }
}
