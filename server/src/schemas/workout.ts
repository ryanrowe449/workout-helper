import { z } from "zod";

export const SetSchema = z.object({
  weight: z.number().min(0),
  reps: z.number().int().min(1),
});

export const ExerciseSchema = z.object({
  name: z.string(),
  sets: z.array(SetSchema).min(1),
});

export const WorkoutSchema = z.object({
  exercises: z.array(ExerciseSchema).min(1),
  bodyweight: z.number().min(50).max(500),
});

export type WorkoutInput = z.infer<typeof WorkoutSchema>;