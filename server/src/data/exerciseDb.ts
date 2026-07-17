export type Pattern =
  | "horizontal_push"
  | "vertical_push"
  | "horizontal_pull"
  | "vertical_pull"
  | "squat"
  | "hinge"
  | "quad_extension"
  | "hamstring_curl"
  | "bicep_curl"
  | "tricep_extension";

export type BodyRegion = "upper" | "lower";

export type MainMuscle = 
    | "quads" 
    | "hamstrings" 
    | "glutes" 
    | "shoulders" 
    | "pecs" 
    | "back"
    | "biceps" 
    | "triceps";

export interface ExerciseDefinition {
  pattern: Pattern;
  bodyRegion: BodyRegion;
  mainMuscle: MainMuscle;
}

export const EXERCISE_DB: Record<string, ExerciseDefinition> = {
  "Dumbbell Bench Press": {
    pattern: "horizontal_push",
    bodyRegion: "upper",
    mainMuscle: "pecs"
  },
  "Machine Bench Press": {
    pattern: "horizontal_push",
    bodyRegion: "upper",
    mainMuscle: "pecs"
  },
  "Weighted Pullups": {
    pattern: "vertical_pull",
    bodyRegion: "upper",
    mainMuscle: "back"
  },
  "Machine Row": {
    pattern: "horizontal_pull",
    bodyRegion: "upper",
    mainMuscle: "back"
  },
  "Dumbbell Preacher Curl": {
    pattern: "bicep_curl",
    bodyRegion: "upper",
    mainMuscle: "biceps"
  },
  "Machine Preacher Curl": {
    pattern: "bicep_curl",
    bodyRegion: "upper",
    mainMuscle: "biceps"
  },
  "Dumbbell Skullcrusher": {
    pattern: "tricep_extension",
    bodyRegion: "upper",
    mainMuscle: "triceps"
  },
  "Tricep Extension": {
    pattern: "tricep_extension",
    bodyRegion: "upper",
    mainMuscle: "triceps"
  },
  "Barbell Back Squat": {
    pattern: "squat",
    bodyRegion: "lower",
    mainMuscle: "quads"
  },
  "Romanian Deadlift": {
    pattern: "hinge",
    bodyRegion: "lower",
    mainMuscle: "hamstrings"
  },
  "Quad Extension": {
    pattern: "quad_extension",
    bodyRegion: "lower",
    mainMuscle: "quads"
  },
  "Seated Hamstring Curl": {
    pattern: "hamstring_curl",
    bodyRegion: "lower",
    mainMuscle: "hamstrings"
  }
};
