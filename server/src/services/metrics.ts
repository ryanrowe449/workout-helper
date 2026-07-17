import { EXERCISE_DB } from "../data/exerciseDb";

export function estimate1RM(weight: number, reps: number): number {
    if (reps == 1){
        return weight;
    }
    return weight * (1 + reps / 30);
}

// takes an array of sets and returns the estimated 1RM of the first set (indicator of peak strength),
// the performance drop off for each set from the first set (indicator of work capacity),
// and total volume (indicator of workload, important for hypertrophy)
export function analyzeExercise(sets: { weight: number; reps: number }[]) {
    const first = sets[0];
    const first1RM = estimate1RM(first.weight, first.reps);

    const intensityDrops = sets.map(set =>
        100 - (estimate1RM(set.weight, set.reps) / first1RM) * 100
    );

    return {
        estimated1RM: Math.round(first1RM),
        intensityDrops: intensityDrops.map(v => Math.round(v * 10) / 10),
        totalVolume: sets.reduce((sum, s) => sum + s.weight * s.reps, 0)
    };
}

// interface used to find ratios
interface ExerciseSummary {
  name: string;
  estimated1RM: number;
  totalVolume: number;
}

// returns the volume ratios of opposing muscle groups (e.g. bicep vs tricep)
export function getVolumeRatios(exercises: ExerciseSummary[]) {
  let pushVol = 0;
  let pullVol = 0;
  let squatVol = 0;
  let hingeVol = 0;
  let chestVol = 0;
  let backVol = 0;
  let hamstringVol = 0;
  let quadVol = 0;

  for (const ex of exercises) {
    const def = EXERCISE_DB[ex.name];
    if (!def) continue;

    const isPush = 
      def.pattern === "vertical_push" ||
      def.pattern === "horizontal_push" ||
      def.pattern === "tricep_extension";
    const isPull =
      def.pattern === "horizontal_pull" ||
      def.pattern === "vertical_pull" ||
      def.pattern === "bicep_curl";
    
    const isSquat =
      def.pattern === "squat";
    const isHinge =
      def.pattern === "hinge";

    const isChest =
      def.mainMuscle === "pecs";
    const isBack =
      def.mainMuscle === "back";

    const isQuads =
      def.mainMuscle === "quads";
    const isHamstrings =
      def.mainMuscle === "hamstrings";
    
    if (isPush) {
      pushVol += ex.totalVolume;
    }
    if (isPull) {
      pullVol += ex.totalVolume;
    }
    if (isSquat) {
      squatVol += ex.totalVolume;
    }
    if (isHinge) {
      hingeVol += ex.totalVolume;
    }
    if (isChest) {
      chestVol += ex.totalVolume;
    }
    if (isBack) {
      backVol += ex.totalVolume;
    }
    if (isQuads) {
      quadVol += ex.totalVolume;
    }
    if (isHamstrings) {
      hamstringVol += ex.totalVolume;
    }
  }
  return {
      pushPullVolRatio: pullVol ? +(pushVol / pullVol).toFixed(2) : 0,
      squatHingeVolRatio: hingeVol ? +(squatVol / hingeVol).toFixed(2) : 0,
      quadHamstringVolRatio: hamstringVol ? +(quadVol / hamstringVol).toFixed(2) : 0,
      chestBackVolRatio: backVol ? +(chestVol / backVol).toFixed(2) : 0
    };
}

// returns the strength ratios of opposing movement patterns (e.g. push vs pull)
export function getStrengthRatios(exercises: ExerciseSummary[]) {
  // total = total strength (sum of 1RMs) for a muscle/movement pattern/body region
  // count = num of exercises for a muscle/movement pattern/body region
  let pushTotal = 0;
  let pullTotal = 0;
  let pushCount = 0;
  let pullCount = 0;
  let squatTotal = 0;
  let hingeTotal = 0;
  let squatCount = 0;
  let hingeCount = 0;

  for (const ex of exercises) {
    const def = EXERCISE_DB[ex.name];
    if (!def) continue;

    // movement patterns
    const isPush =
      def.pattern === "horizontal_push" ||
      def.pattern === "vertical_push";

    const isPull =
      def.pattern === "horizontal_pull" ||
      def.pattern === "vertical_pull";

    const isHinge =
      def.pattern === "hinge"

    const isSquat =
      def.pattern === "squat"

    // get the average strength of each exercise's first set
    if (isPush) {
      pushTotal += ex.estimated1RM;
      pushCount++;
    }

    if (isPull) {
      pullTotal += ex.estimated1RM;
      pullCount++;
    }

    if (isSquat) {
      squatTotal += ex.estimated1RM;
      squatCount++;
    }

    if (isHinge) {
      hingeTotal += ex.estimated1RM;
      hingeCount++;
    }
  }

  const pushAvg = pushCount ? pushTotal / pushCount : 0;
  const pullAvg = pullCount ? pullTotal / pullCount : 0;
  const squatAvg = squatCount ? squatTotal / squatCount : 0;
  const hingeAvg = hingeCount ? hingeTotal / hingeCount : 0;

  return {
    pushPullRatio: pullAvg ? +(pushAvg / pullAvg).toFixed(2) : 0,
    squatHingeRatio: hingeAvg ? +(squatAvg / hingeAvg).toFixed(2) : 0
  };
}