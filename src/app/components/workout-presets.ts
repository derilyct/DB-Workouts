import type { WorkoutTab } from "./workout-data";
import { defaultWorkoutTabs } from "./workout-data";

export interface WorkoutPreset {
  id: string;
  name: string;
  tabs: WorkoutTab[];
}

// "P90X Redux" — based on the layout & exercise selection from
// derick.berry@gmail.com's account (with all values blank). Exercise / tab
// names have already been resolved (no need for separate override maps).
const p90xReduxTabs: WorkoutTab[] = [
  {
    id: "redux-mon-push",
    name: "Mon / Push",
    columns: 2,
    sections: [
      {
        nextDividerNav: "wrap",
        exercises: [
          { id: "redux-mon-1", name: "Standard Pushup", type: "single" },
          { id: "redux-mon-2", name: "Alternating Shoulder Press", type: "double" },
          { id: "redux-mon-3", name: "Military Pushup", type: "single" },
          { id: "redux-mon-4", name: "Triceps Kickback", type: "double" },
        ],
      },
      {
        nextDividerNav: "wrap",
        exercises: [
          { id: "redux-mon-5", name: "Wide-Fly Pushup", type: "single" },
          { id: "redux-mon-6", name: "Deep Swimmer's Press", type: "double" },
          { id: "redux-mon-7", name: "Decline Bench", type: "double" },
          { id: "redux-mon-8", name: "Chair Dips", type: "single" },
        ],
      },
      {
        nextDividerNav: "wrap",
        exercises: [
          { id: "redux-mon-9", name: "Diamond Pushup", type: "single" },
          { id: "redux-mon-10", name: "Upright Row", type: "double" },
          { id: "redux-mon-11", name: "Dive-bomber", type: "single" },
          { id: "redux-mon-12", name: "Overhead Triceps Extensions", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-mon-13", name: "Two Angle Shoulder Fly", type: "double" },
          { id: "redux-mon-14", name: "Laying Down Triceps Extensions", type: "double" },
        ],
      },
    ],
  },
  {
    id: "redux-tue-pull",
    name: "Tue / Pull",
    columns: 1,
    sections: [
      {
        exercises: [
          { id: "redux-tue-1", name: "Wide Pullup", type: "single" },
          { id: "redux-tue-2", name: "Twenty-ones", type: "double" },
          { id: "redux-tue-3", name: "Reverse Pullup", type: "single" },
          { id: "redux-tue-4", name: "Cross-Body Pullup", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-tue-5", name: "Overhand Pullup", type: "single" },
          { id: "redux-tue-6", name: "Standing Curl", type: "double" },
          { id: "redux-tue-7", name: "Bench Row", type: "double" },
          { id: "redux-tue-8", name: "Concentration Curls", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-tue-9", name: "Lawnmower", type: "double" },
          { id: "redux-tue-10", name: "Open Arm Curl", type: "double" },
          { id: "redux-tue-11", name: "Dive-Bomber", type: "single" },
          { id: "redux-tue-12", name: "Static Arm Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-tue-13", name: "Offset Pullup", type: "single" },
          { id: "redux-tue-14", name: "Sitting Curls", type: "double" },
          { id: "redux-tue-15", name: "Hammer Pullup", type: "single" },
          { id: "redux-tue-16", name: "Corkscrew Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-tue-17", name: "Wide Pullup", type: "single" },
          { id: "redux-tue-18", name: "Curl Up / Hammer Down", type: "double" },
          { id: "redux-tue-19", name: "Elbow-out Lawnmower", type: "double" },
          { id: "redux-tue-20", name: "Hammer Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-tue-21", name: "Overhand Pullup", type: "single" },
          { id: "redux-tue-22", name: "In-out Hammer Curl", type: "double" },
          { id: "redux-tue-23", name: "Bench Row", type: "double" },
          { id: "redux-tue-24", name: "Strip-set Curl", type: "single" },
        ],
      },
    ],
  },
  {
    id: "redux-wed-legs",
    name: "Wed / Legs",
    columns: 1,
    sections: [
      {
        exercises: [
          { id: "redux-wed-1", name: "Balance Lunge", type: "single" },
          { id: "redux-wed-2", name: "Calf-Raise Squat", type: "double" },
          { id: "redux-wed-3", name: "Super Skater", type: "single" },
          { id: "redux-wed-4", name: "Wall Squat", type: "single" },
          { id: "redux-wed-5", name: "Step-back Lunge", type: "double" },
          { id: "redux-wed-6", name: "Side Lunge", type: "double" },
          { id: "redux-wed-7", name: "Deadlift Squat", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-wed-8", name: "Three-way Lunge", type: "single" },
          { id: "redux-wed-9", name: "Sneaky Lunge", type: "single" },
          { id: "redux-wed-10", name: "Chair Salutation", type: "single" },
          { id: "redux-wed-11", name: "Toe-roll Lunge", type: "single" },
          { id: "redux-wed-12", name: "Groucho Walk", type: "single" },
          { id: "redux-wed-13", name: "Calf Raises", type: "double" },
          { id: "redux-wed-14", name: "80/20 Speed Squats", type: "single" },
        ],
      },
    ],
  },
  {
    id: "redux-thu-push",
    name: "Thu / Push",
    columns: 1,
    sections: [
      {
        exercises: [
          { id: "redux-thu-1", name: "Slow-motion Pushup", type: "single" },
          { id: "redux-thu-2", name: "In-out Shoulder Fly", type: "double" },
          { id: "redux-thu-3", name: "Chair Dips", type: "single" },
          { id: "redux-thu-4", name: "Plange Pushup", type: "single" },
          { id: "redux-thu-5", name: "Pike Press", type: "single" },
          { id: "redux-thu-6", name: "Side-tri Rise", type: "single" },
          { id: "redux-thu-7", name: "Floor Fly", type: "double" },
          { id: "redux-thu-8", name: "Scarecrow", type: "double" },
          { id: "redux-thu-9", name: "Overhead Triceps Extention", type: "double" },
          { id: "redux-thu-10", name: "Two-speed Pushup", type: "single" },
          { id: "redux-thu-11", name: "Y-Press", type: "single" },
          { id: "redux-thu-12", name: "Lying-down Triceps Extentions", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-thu-13", name: "Side-to-side Pushup", type: "single" },
          { id: "redux-thu-14", name: "Pour Fly", type: "double" },
          { id: "redux-thu-15", name: "Side-leaning Triceps Extention", type: "double" },
          { id: "redux-thu-16", name: "One-arm Pushup", type: "single" },
          { id: "redux-thu-17", name: "Weighted Circles", type: "double" },
          { id: "redux-thu-18", name: "Throw the Bomb", type: "double" },
          { id: "redux-thu-19", name: "Clap Pushup", type: "single" },
          { id: "redux-thu-20", name: "Slo-mo Throw", type: "double" },
          { id: "redux-thu-21", name: "Front-to-back Triceps Extensions", type: "double" },
          { id: "redux-thu-22", name: "One-Arm Balance Pushup", type: "single" },
          { id: "redux-thu-23", name: "Fly-row Press", type: "double" },
          { id: "redux-thu-24", name: "Cross-body Blows", type: "double" },
        ],
      },
    ],
  },
  {
    id: "redux-fri-pull",
    name: "Fri / Pull",
    columns: 1,
    sections: [
      {
        exercises: [
          { id: "redux-fri-1", name: "Wide Pullup", type: "single" },
          { id: "redux-fri-2", name: "Twenty-ones", type: "double" },
          { id: "redux-fri-3", name: "Reverse Pullup", type: "single" },
          { id: "redux-fri-4", name: "Cross-Body Pullup", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-fri-5", name: "Overhand Pullup", type: "single" },
          { id: "redux-fri-6", name: "Standing Curl", type: "double" },
          { id: "redux-fri-7", name: "Bench Row", type: "double" },
          { id: "redux-fri-8", name: "Concentration Curls", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-fri-9", name: "Lawnmower", type: "double" },
          { id: "redux-fri-10", name: "Open Arm Curl", type: "double" },
          { id: "redux-fri-11", name: "Dive-Bomber", type: "single" },
          { id: "redux-fri-12", name: "Static Arm Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-fri-13", name: "Offset Pullup", type: "single" },
          { id: "redux-fri-14", name: "Sitting Curls", type: "double" },
          { id: "redux-fri-15", name: "Hammer Pullup", type: "single" },
          { id: "redux-fri-16", name: "Corkscrew Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-fri-17", name: "Wide Pullup", type: "single" },
          { id: "redux-fri-18", name: "Curl Up / Hammer Down", type: "double" },
          { id: "redux-fri-19", name: "Elbow-out Lawnmower", type: "double" },
          { id: "redux-fri-20", name: "Hammer Curl", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-fri-21", name: "Overhand Pullup", type: "single" },
          { id: "redux-fri-22", name: "In-out Hammer Curl", type: "double" },
          { id: "redux-fri-23", name: "Bench Row", type: "double" },
          { id: "redux-fri-24", name: "Strip-set Curl", type: "single" },
        ],
      },
    ],
  },
  {
    id: "redux-sat-legs",
    name: "Sat / Legs",
    columns: 1,
    sections: [
      {
        exercises: [
          { id: "redux-sat-1", name: "Balance Lunge", type: "single" },
          { id: "redux-sat-2", name: "Calf-Raise Squat", type: "double" },
          { id: "redux-sat-3", name: "Super Skater", type: "single" },
          { id: "redux-sat-4", name: "Wall Squat", type: "single" },
          { id: "redux-sat-5", name: "Step-back Lunge", type: "double" },
          { id: "redux-sat-6", name: "Side Lunge", type: "double" },
          { id: "redux-sat-7", name: "Deadlift Squat", type: "double" },
        ],
      },
      {
        exercises: [
          { id: "redux-sat-8", name: "Three-way Lunge", type: "single" },
          { id: "redux-sat-9", name: "Sneaky Lunge", type: "single" },
          { id: "redux-sat-10", name: "Chair Salutation", type: "single" },
          { id: "redux-sat-11", name: "Toe-roll Lunge", type: "single" },
          { id: "redux-sat-12", name: "Groucho Walk", type: "single" },
          { id: "redux-sat-13", name: "Calf Raises", type: "double" },
          { id: "redux-sat-14", name: "80/20 Speed Squats", type: "single" },
        ],
      },
    ],
  },
];

export const workoutPresets: WorkoutPreset[] = [
  { id: "p90x-redux", name: "P90X Redux", tabs: p90xReduxTabs },
  { id: "p90x-standard", name: "P90X Standard", tabs: defaultWorkoutTabs },
];

// Returns a deep copy of the preset's tabs with all IDs freshly minted so they
// do not collide with the user's existing tab/exercise ids in storage.
export function instantiatePreset(preset: WorkoutPreset): WorkoutTab[] {
  const stamp = Date.now();
  return preset.tabs.map((tab, tabIdx) => {
    const newTabId = `preset-${preset.id}-${stamp}-t${tabIdx}`;
    return {
      ...tab,
      id: newTabId,
      sections: tab.sections.map((section, sIdx) => ({
        ...section,
        exercises: section.exercises.map((ex, eIdx) => ({
          ...ex,
          id: `${newTabId}-s${sIdx}-e${eIdx}`,
        })),
      })),
    };
  });
}
