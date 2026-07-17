import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './workout-form.html',
  styleUrl: './workout-form.css',
})


export class WorkoutForm {
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

  constructor() {
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
}
