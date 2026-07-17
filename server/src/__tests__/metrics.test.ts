import { estimate1RM, analyzeExercise, getStrengthRatios,
  getVolumeRatios
 } from "../services/metrics";

describe("estimate1RM", () => {
  test("calculates 1RM given a weight and reps > 1", () => {
    const result = estimate1RM(100, 5);
    expect(result).toBeCloseTo(116.67);
  });

  test("returns the weight when reps = 1", () => {
    const result = estimate1RM(225, 1);
    expect(result).toBe(225);
  });

//   test("handles zero reps safely", () => {
//     const result = estimate1RM(200, 0);
//     expect(result).toBe(0); // or whatever behavior you decided on
//   });
});

describe("analyzeExercise", () => {
  test("computes correct 1RM, total volume, and intesity drops", () => {
    const sets = [
      { weight: 120, reps: 3 },
      { weight: 100, reps: 5 },
      { weight: 90, reps: 8 },
    ];

    const result = analyzeExercise(sets);
    // Calculate intensity drops and total volume
    const totalVolume = 120*3 + 100*5 + 90*8;
    const first1RM = 132;
    const dropSecond = 100 - (estimate1RM(100, 5) / first1RM) * 100;
    const dropThird = 100 - (estimate1RM(90, 8) / first1RM) * 100;
    const expectedDrops = [
      0,
      Math.round(dropSecond * 10) / 10,
      Math.round(dropThird * 10) / 10
    ];

    expect(result.estimated1RM).toBe(first1RM);
    expect(result.intensityDrops).toEqual(expectedDrops);
    expect(result.totalVolume).toBe(totalVolume);
  });
});

describe("getStrengthRatios", () => {
  test("computes correct ratios with data for every ratio", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getStrengthRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = ((136 + 170) / 2) / ((204 + 66) / 2);
    const squatHingeRatio = 240 / 366;

    // Test
    expect(result.pushPullRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeRatio).toEqual(+squatHingeRatio.toFixed(2));
  });

  test("no data for push/extension movement pattern", () => {
    const exercises = [
      // Upper 1
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getStrengthRatios(exercises);

    const pushPullRatio = 0;
    const squatHingeRatio = 240 / 366;

    expect(result.pushPullRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeRatio).toEqual(+squatHingeRatio.toFixed(2));
  });

  test("no data for pull/curl movement pattern", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getStrengthRatios(exercises);

    const pushPullRatio = 0;
    const squatHingeRatio = 240 / 366;

    expect(result.pushPullRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeRatio).toEqual(+squatHingeRatio.toFixed(2));
  });

  test("no data for squat/leg extension movement pattern", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getStrengthRatios(exercises);

    const pushPullRatio = ((136 + 170) / 2) / ((204 + 66) / 2);
    const squatHingeRatio = 0;

    expect(result.pushPullRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeRatio).toEqual(+squatHingeRatio.toFixed(2));
  });

  test("no data for hinge/leg curl movement pattern", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
    ];

    const result = getStrengthRatios(exercises);

    const pushPullRatio = ((136 + 170) / 2) / ((204 + 66) / 2);
    const squatHingeRatio = 0;

    expect(result.pushPullRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeRatio).toEqual(+squatHingeRatio.toFixed(2));
  });
});

describe("getVolumeRatios", () => {
  test("computes correct ratios with data for every ratio", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = (700 + 495 + 1120 + 750) / (2070 + 1030 + 555 + 780);
    const squatHingeRatio = 1270 / 3010;
    const chestBackRatio = (700 + 1120) / (2070 + 555);
    const quadHamstringRatio = (1270 + 2070) / (3010 + 1100);

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });

  test("no data for push/extension movement pattern", () => {
    const exercises = [
      // Upper 1
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = 0;
    const squatHingeRatio = 1270 / 3010;
    const chestBackRatio = 0;
    const quadHamstringRatio = (1270 + 2070) / (3010 + 1100);

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });

  test("no data for pull/curl movement pattern", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = 0;
    const squatHingeRatio = 1270 / 3010;
    const chestBackRatio = 0;
    const quadHamstringRatio = (1270 + 2070) / (3010 + 1100);

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });

  test("no data for squat/leg extension movement pattern", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = (700 + 495 + 1120 + 750) / (2070 + 1030 + 555 + 780);
    const squatHingeRatio = 0;
    const chestBackRatio = (700 + 1120) / (2070 + 555);
    const quadHamstringRatio = 0;

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });

  test("no data for hinge/leg curl movement pattern", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = (700 + 495 + 1120 + 750) / (2070 + 1030 + 555 + 780);
    const squatHingeRatio = 0;
    const chestBackRatio = (700 + 1120) / (2070 + 555);
    const quadHamstringRatio = 0;

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });

  test("no data for chest movement", () => {
    const exercises = [
      // Upper 1
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = (495 + 750) / (2070 + 1030 + 555 + 780);
    const squatHingeRatio = 1270 / 3010;
    const chestBackRatio = 0;
    const quadHamstringRatio = (1270 + 2070) / (3010 + 1100);

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });

  test("no data for back movement", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = (700 + 495 + 1120 + 750) / (1030 + 780);
    const squatHingeRatio = 1270 / 3010;
    const chestBackRatio = 0;
    const quadHamstringRatio = (1270 + 2070) / (3010 + 1100);

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });

  test("no data for hamstring movement", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Lower 1
      { name: "Barbell Back Squat", estimated1RM: 240, totalVolume: 1270 },
      { name: "Quad Extension", estimated1RM: 276, totalVolume: 2070 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = (700 + 495 + 1120 + 750) / (2070 + 1030 + 555 + 780);
    const squatHingeRatio = 0;
    const chestBackRatio = (700 + 1120) / (2070 + 555);
    const quadHamstringRatio = 0;

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });

  test("no data for quad movement", () => {
    const exercises = [
      // Upper 1
      { name: "Dumbbell Bench Press", estimated1RM: 136, totalVolume: 700 },
      { name: "Machine Row", estimated1RM: 204, totalVolume: 2070 },
      { name: "Tricep Extension", estimated1RM: 56, totalVolume: 495 },
      { name: "Machine Preacher Curl", estimated1RM: 111, totalVolume: 1030 },
      // Upper 2
      { name: "Weighted Pullups", estimated1RM: 66, totalVolume: 555 },
      { name: "Machine Bench Press", estimated1RM: 170, totalVolume: 1120 },
      { name: "Dumbbell Preacher Curl", estimated1RM: 84, totalVolume: 780 },
      { name: "Dumbbell Skullcrusher", estimated1RM: 65, totalVolume: 750 },
      // Lower 2
      { name: "Romanian Deadlift", estimated1RM: 366, totalVolume: 3010 },
      { name: "Seated Hamstring Curl", estimated1RM: 127, totalVolume: 1100 }
    ];

    const result = getVolumeRatios(exercises);
    // Calculate the ratios
    const pushPullRatio = (700 + 495 + 1120 + 750) / (2070 + 1030 + 555 + 780);
    const squatHingeRatio = 0;
    const chestBackRatio = (700 + 1120) / (2070 + 555);
    const quadHamstringRatio = 0;

    // Test
    expect(result.pushPullVolRatio).toEqual(+pushPullRatio.toFixed(2));
    expect(result.squatHingeVolRatio).toEqual(+squatHingeRatio.toFixed(2));
    expect(result.chestBackVolRatio).toEqual(+chestBackRatio.toFixed(2));
    expect(result.quadHamstringVolRatio).toEqual(+quadHamstringRatio.toFixed(2));
  });
});