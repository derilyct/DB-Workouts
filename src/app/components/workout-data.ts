export type ExerciseType = "single" | "double";

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
}

export interface WorkoutSection {
  exercises: Exercise[];
  // Controls tab navigation when reaching end of this section's column 1.
  // "wrap" (default): go back up to column 2 of this section.
  // "down": skip column 2 and continue into next section's column 1.
  nextDividerNav?: "wrap" | "down";
}

export interface WorkoutTab {
  id: string;
  name: string;
  sections: WorkoutSection[];
  // Number of NEW/PREVIOUS columns shown in the table (1 = single, 2 = side-by-side).
  columns?: 1 | 2;
}

export const defaultWorkoutTabs: WorkoutTab[] = [
  {
    id: "chest-back",
    name: "Chest & Back",
    columns: 2,
    sections: [
      {
        exercises: [
          { id: "cb-1", name: "Standard Pushup", type: "single" },
          { id: "cb-2", name: "Wide Pullup", type: "single" },
          { id: "cb-3", name: "Military Pushup", type: "single" },
          { id: "cb-4", name: "Reverse Pullup", type: "single" },
        ],
      },
      {
        exercises: [
          { id: "cb-5", name: "Wide-Fly Pushup", type: "single" },
          { id: "cb-6", name: "Overhand Pullup", type: "single" },
          { id: "cb-7", name: "Decline Pushup", type: "single" },
          { id: "cb-8", name: "Heavy Pants", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "cb-9", name: "Diamond Pushup", type: "single" },
          { id: "cb-10", name: "Lawnmower", type: "double" },
          { id: "cb-11", name: "Dive-bomber", type: "single" },
          { id: "cb-12", name: "Back Fly", type: "double" },
        ],
      },
    ],
  },
  {
    id: "shoulders-arms-1",
    name: "Shoulders & Arms",
    columns: 2,
    sections: [
      {
        exercises: [
          { id: "sa1-1", name: "Alternating Shoulder Press", type: "double" },
          { id: "sa1-2", name: "In & Out Bicep Curl", type: "double" },
          { id: "sa1-3", name: "Two-Arm Tricep Kickback", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "sa1-4", name: "Deep Swimmer's Press", type: "double" },
          { id: "sa1-5", name: "Full Supination Curl", type: "double" },
          { id: "sa1-6", name: "Chair Dip", type: "single" },
        ],
      },
      {
        exercises: [
          { id: "sa1-7", name: "Upright Row", type: "double" },
          { id: "sa1-8", name: "Static Arm Curl", type: "double" },
          { id: "sa1-9", name: "Flip-Grip Twist Kickback", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "sa1-10", name: "Two-Angle Shoulder Fly", type: "double" },
          { id: "sa1-11", name: "Crouching Cohen Curl", type: "double" },
          { id: "sa1-12", name: "Laying-down Triceps Ex", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "sa1-13", name: "In-Out Straight Arm Shoulder Fly", type: "double" },
          { id: "sa1-14", name: "Congdon Curl", type: "double" },
          { id: "sa1-15", name: "Side Tri-Rise", type: "single" },
        ],
      },
    ],
  },
  {
    id: "chest-shoulders-triceps",
    name: "Chest, Shoulders, & Triceps",
    columns: 1,
    sections: [
      {
        exercises: [
          { id: "cst-1", name: "Slow-Motion Push-Up", type: "single" },
          { id: "cst-2", name: "In & Out Shoulder Fly", type: "double" },
          { id: "cst-3", name: "Chair Dip", type: "single" },
          { id: "cst-4", name: "Plange Pushup", type: "single" },
          { id: "cst-5", name: "Pike Press", type: "single" },
          { id: "cst-6", name: "Side Tri-Rise", type: "single" },
          { id: "cst-7", name: "Floor Fly", type: "double" },
          { id: "cst-8", name: "Scarecrow", type: "double" },
          { id: "cst-9", name: "Overhead Tricep Extension", type: "double" },
          { id: "cst-10", name: "Two-Twitch Speed Push-Up", type: "single" },
          { id: "cst-11", name: "Y-Press", type: "double" },
          { id: "cst-12", name: "Lying Tricep Extension", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "cst-13", name: "Side-to-Side Push-Up", type: "single" },
          { id: "cst-14", name: "Pour Fly", type: "double" },
          { id: "cst-15", name: "Side-Leaning Tricep Extension", type: "double" },
          { id: "cst-16", name: "One-Arm Push-Up", type: "single" },
          { id: "cst-17", name: "Weighted Circle", type: "double" },
          { id: "cst-18", name: "Throw the Bomb", type: "double" },
          { id: "cst-19", name: "Clap or Plyo Push-Up", type: "single" },
          { id: "cst-20", name: "Slo-Mo Throw", type: "double" },
          { id: "cst-21", name: "Front-to-Back Tricep Extension", type: "double" },
          { id: "cst-22", name: "One-Arm Balance Push-Up", type: "single" },
          { id: "cst-23", name: "Fly-Row-Press", type: "double" },
          { id: "cst-24", name: "Dumbbell Cross-Body Blow", type: "double" },
        ],
      },
    ],
  },
  {
    id: "shoulders-arms-2",
    name: "Back & Biceps",
    columns: 1,
    sections: [
      {
        exercises: [
          { id: "bb-1", name: "Wide Front Pull-Up", type: "single" },
          { id: "bb-2", name: "Lawnmower", type: "double" },
          { id: "bb-3", name: "Twenty-Ones", type: "double" },
          { id: "bb-4", name: "One-Arm Cross-Body Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "bb-5", name: "Switch Grip Pull-Up", type: "single" },
          { id: "bb-6", name: "Elbow-Out Lawnmower", type: "double" },
          { id: "bb-7", name: "Standing Bicep Curl", type: "double" },
          { id: "bb-8", name: "One-Arm Concentration Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "bb-9", name: "Chin-Up", type: "single" },
          { id: "bb-10", name: "Seated Bent-Over Back Fly", type: "double" },
          { id: "bb-11", name: "Open Arm Curl", type: "double" },
          { id: "bb-12", name: "Static Arm Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "bb-13", name: "Towel Pull-Up", type: "single" },
          { id: "bb-14", name: "Congdon Locomotive", type: "double" },
          { id: "bb-15", name: "Crouching Cohen Curl", type: "double" },
          { id: "bb-16", name: "One-Arm Corkscrew Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "bb-17", name: "Chin-Up", type: "single" },
          { id: "bb-18", name: "Seated Bent-Over Back Fly", type: "double" },
          { id: "bb-19", name: "Curl-Up/Hammer Down", type: "double" },
          { id: "bb-20", name: "Hammer Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "bb-21", name: "Max Rep Pull-Up", type: "single" },
          { id: "bb-22", name: "Superman", type: "single" },
          { id: "bb-23", name: "In-Out Hammer Curl", type: "double" },
          { id: "bb-24", name: "Strip-Set Curl", type: "double" },
        ],
      },
    ],
  },
  {
    id: "legs-back",
    name: "Legs & Back",
    columns: 1,
    sections: [
      {
        exercises: [
          { id: "lb-1", name: "Balance Lunge", type: "single" },
          { id: "lb-2", name: "Calf-Raise Squat", type: "double" },
          { id: "lb-3", name: "Reverse Grip Chin-Up", type: "single" },
          { id: "lb-4", name: "Super Skater", type: "single" },
          { id: "lb-5", name: "Wall Squat", type: "single" },
          { id: "lb-6", name: "Wide Front Pull-Up", type: "single" },
          { id: "lb-7", name: "Step Back Lunge", type: "double" },
          { id: "lb-8", name: "Alternating Side Lunge", type: "double" },
          { id: "lb-9", name: "Close Grip Overhand Pull-Up", type: "single" },
          { id: "lb-10", name: "Single Leg Wall Squat", type: "single" },
          { id: "lb-11", name: "Deadlift Squat", type: "double" },
          { id: "lb-12", name: "Switch Grip Pull-Up", type: "single" },
        ],
      },
      {
        exercises: [
          { id: "lb-13", name: "Three-Way Lunge", type: "single" },
          { id: "lb-14", name: "Sneaky Lunge", type: "single" },
          { id: "lb-15", name: "Reverse Grip Chin-Up", type: "single" },
          { id: "lb-16", name: "Chair Salutation", type: "single" },
          { id: "lb-17", name: "Toe Roll Iso Lunge", type: "double" },
          { id: "lb-18", name: "Wide Front Pull-Up", type: "single" },
          { id: "lb-19", name: "Groucho Walk", type: "single" },
          { id: "lb-20", name: "Calf Raise", type: "double" },
          { id: "lb-21", name: "Close Grip Overhand Pull-Up", type: "single" },
          { id: "lb-22", name: "80/20 Siebers-Speed Squat", type: "single" },
          { id: "lb-23", name: "Switch Grip Pull-Up", type: "single" },
        ],
      },
    ],
  },
];