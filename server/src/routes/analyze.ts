import { Router } from "express";
import { WorkoutSchema } from "../schemas/workout";
import { analyzeExercise, getStrengthRatios, getVolumeRatios } from "../services/metrics";
import { analyzeWorkoutWithAI } from "../services/ai";

const router = Router();

router.post("/", async (req, res) => {
  const parsed = WorkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const workout = parsed.data;

  const exerciseSummaries = workout.exercises.map(ex => ({
    name: ex.name,
    ...analyzeExercise(ex.sets)
  }));

  const strengthRatios = getStrengthRatios(exerciseSummaries);
  const volumeRatios = getVolumeRatios(exerciseSummaries);

  const aiInput = {
    bodyweight: workout.bodyweight,
    exercises: exerciseSummaries,
    strength_ratios: strengthRatios,
    volume_ratios: volumeRatios
  };

  const aiResult = await analyzeWorkoutWithAI(aiInput);

  res.json({
    metrics: exerciseSummaries,
    analysis: aiResult
  });
});

export default router;