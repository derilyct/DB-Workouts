import { supabase } from "./supabase";
import type { WorkoutTab } from "../app/components/workout-data";
import type { ExerciseValues } from "../app/components/workout-table";

export type ValuesMap = Record<string, Record<string, ExerciseValues>>;
// Outer key = tab id, inner key = exercise id

export interface UserData {
  tabsData: WorkoutTab[] | null;
  exerciseNames: Record<string, string>;
  tabNames: Record<string, string>;
  previousValues: ValuesMap;
  currentValues: ValuesMap;
  workoutStarted: Record<string, boolean>;
}

const EMPTY_VALUES: ExerciseValues = { r1: "", w1: "", r2: "", w2: "" };

// Load everything for the signed-in user
export async function loadAllData(userId: string): Promise<UserData> {
  const [tabsRes, valsRes, startedRes] = await Promise.all([
    supabase.from("workout_tabs").select("tabs_data, exercise_names, tab_names").eq("user_id", userId).maybeSingle(),
    supabase.from("exercise_values").select("tab_id, exercise_id, is_current, r1, w1, r2, w2").eq("user_id", userId),
    supabase.from("workout_started").select("tab_id").eq("user_id", userId),
  ]);

  if (tabsRes.error) console.error("[loadAllData] tabs error:", tabsRes.error);
  if (valsRes.error) console.error("[loadAllData] values error:", valsRes.error);
  if (startedRes.error) console.error("[loadAllData] started error:", startedRes.error);

  const previousValues: ValuesMap = {};
  const currentValues: ValuesMap = {};
  for (const row of valsRes.data ?? []) {
    const target = row.is_current ? currentValues : previousValues;
    if (!target[row.tab_id]) target[row.tab_id] = {};
    target[row.tab_id][row.exercise_id] = {
      r1: row.r1 ?? "",
      w1: row.w1 ?? "",
      r2: row.r2 ?? "",
      w2: row.w2 ?? "",
    };
  }

  const workoutStarted: Record<string, boolean> = {};
  for (const row of startedRes.data ?? []) workoutStarted[row.tab_id] = true;

  return {
    tabsData: (tabsRes.data?.tabs_data as WorkoutTab[] | undefined) ?? null,
    exerciseNames: (tabsRes.data?.exercise_names as Record<string, string> | undefined) ?? {},
    tabNames: (tabsRes.data?.tab_names as Record<string, string> | undefined) ?? {},
    previousValues,
    currentValues,
    workoutStarted,
  };
}

// Save tabs structure (and optionally names) — upserts the single row for this user
export async function saveTabsRecord(
  userId: string,
  fields: Partial<{ tabsData: WorkoutTab[]; exerciseNames: Record<string, string>; tabNames: Record<string, string> }>
) {
  const row: Record<string, any> = { user_id: userId, updated_at: new Date().toISOString() };
  if (fields.tabsData !== undefined) row.tabs_data = fields.tabsData;
  if (fields.exerciseNames !== undefined) row.exercise_names = fields.exerciseNames;
  if (fields.tabNames !== undefined) row.tab_names = fields.tabNames;
  const { error } = await supabase.from("workout_tabs").upsert(row, { onConflict: "user_id" });
  if (error) console.error("[saveTabsRecord] error:", error);
}

// Upsert a single exercise's values
export async function saveExerciseValues(
  userId: string,
  tabId: string,
  exerciseId: string,
  isCurrent: boolean,
  values: ExerciseValues
) {
  const { error } = await supabase
    .from("exercise_values")
    .upsert(
      {
        user_id: userId,
        tab_id: tabId,
        exercise_id: exerciseId,
        is_current: isCurrent,
        r1: values.r1 ?? "",
        w1: values.w1 ?? "",
        r2: values.r2 ?? "",
        w2: values.w2 ?? "",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,tab_id,exercise_id,is_current" }
    );
  if (error) console.error("[saveExerciseValues] error:", error);
}

// Bulk upsert many exercises (used by debounced sync of a whole tab)
export async function saveExerciseValuesBulk(
  userId: string,
  tabId: string,
  isCurrent: boolean,
  exercises: Record<string, ExerciseValues>
) {
  const rows = Object.entries(exercises).map(([exerciseId, v]) => ({
    user_id: userId,
    tab_id: tabId,
    exercise_id: exerciseId,
    is_current: isCurrent,
    r1: v.r1 ?? "",
    w1: v.w1 ?? "",
    r2: v.r2 ?? "",
    w2: v.w2 ?? "",
    updated_at: new Date().toISOString(),
  }));
  if (rows.length === 0) return;
  const { error } = await supabase
    .from("exercise_values")
    .upsert(rows, { onConflict: "user_id,tab_id,exercise_id,is_current" });
  if (error) console.error("[saveExerciseValuesBulk] error:", error);
}

// Mark a workout started for a tab
export async function startWorkoutDb(userId: string, tabId: string) {
  const { error } = await supabase
    .from("workout_started")
    .upsert({ user_id: userId, tab_id: tabId }, { onConflict: "user_id,tab_id" });
  if (error) console.error("[startWorkoutDb] error:", error);
}

// End a workout: copy current values into previous, then clear current rows
export async function endWorkoutDb(
  userId: string,
  tabId: string,
  currentTabValues: Record<string, ExerciseValues>
) {
  // Only commit exercises that have actual data
  const toCommit = Object.entries(currentTabValues).filter(([, v]) =>
    v.r1 || v.w1 || v.r2 || v.w2
  );
  if (toCommit.length > 0) {
    const previousRows = toCommit.map(([exerciseId, v]) => ({
      user_id: userId,
      tab_id: tabId,
      exercise_id: exerciseId,
      is_current: false,
      r1: v.r1 ?? "",
      w1: v.w1 ?? "",
      r2: v.r2 ?? "",
      w2: v.w2 ?? "",
      updated_at: new Date().toISOString(),
    }));
    const { error: upsertErr } = await supabase
      .from("exercise_values")
      .upsert(previousRows, { onConflict: "user_id,tab_id,exercise_id,is_current" });
    if (upsertErr) console.error("[endWorkoutDb] upsert error:", upsertErr);
  }
  // Delete all current rows for this tab
  const { error: delErr } = await supabase
    .from("exercise_values")
    .delete()
    .eq("user_id", userId)
    .eq("tab_id", tabId)
    .eq("is_current", true);
  if (delErr) console.error("[endWorkoutDb] delete error:", delErr);
  // Clear started flag
  const { error: startedErr } = await supabase
    .from("workout_started")
    .delete()
    .eq("user_id", userId)
    .eq("tab_id", tabId);
  if (startedErr) console.error("[endWorkoutDb] started delete error:", startedErr);
}

// Cancel a workout: drop current rows + started flag without touching previous
export async function cancelWorkoutDb(userId: string, tabId: string) {
  const { error: delErr } = await supabase
    .from("exercise_values")
    .delete()
    .eq("user_id", userId)
    .eq("tab_id", tabId)
    .eq("is_current", true);
  if (delErr) console.error("[cancelWorkoutDb] delete error:", delErr);
  const { error: startedErr } = await supabase
    .from("workout_started")
    .delete()
    .eq("user_id", userId)
    .eq("tab_id", tabId);
  if (startedErr) console.error("[cancelWorkoutDb] started delete error:", startedErr);
}

// Edit a previous value directly (when user is in "edit previous" mode)
export async function deleteExercisePrevious(userId: string, tabId: string, exerciseId: string) {
  const { error } = await supabase
    .from("exercise_values")
    .delete()
    .eq("user_id", userId)
    .eq("tab_id", tabId)
    .eq("exercise_id", exerciseId)
    .eq("is_current", false);
  if (error) console.error("[deleteExercisePrevious] error:", error);
}

// Delete every persisted row for a single tab (values + started flag).
// Used when a tab is removed from the UI so we don't leave orphaned rows.
export async function deleteTabData(userId: string, tabId: string) {
  const [valsRes, startedRes] = await Promise.all([
    supabase.from("exercise_values").delete().eq("user_id", userId).eq("tab_id", tabId),
    supabase.from("workout_started").delete().eq("user_id", userId).eq("tab_id", tabId),
  ]);
  if (valsRes.error) console.error("[deleteTabData] values error:", valsRes.error);
  if (startedRes.error) console.error("[deleteTabData] started error:", startedRes.error);
}

// Wipe all per-tab/per-exercise state for a user (used when applying a preset).
// Keeps the auth user but clears values, started flags, exercise/tab name overrides.
export async function resetUserWorkoutData(userId: string) {
  const [valsRes, startedRes, tabsRes] = await Promise.all([
    supabase.from("exercise_values").delete().eq("user_id", userId),
    supabase.from("workout_started").delete().eq("user_id", userId),
    supabase
      .from("workout_tabs")
      .upsert(
        {
          user_id: userId,
          tabs_data: null,
          exercise_names: {},
          tab_names: {},
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      ),
  ]);
  if (valsRes.error) console.error("[resetUserWorkoutData] values error:", valsRes.error);
  if (startedRes.error) console.error("[resetUserWorkoutData] started error:", startedRes.error);
  if (tabsRes.error) console.error("[resetUserWorkoutData] tabs error:", tabsRes.error);
}

// Re-export for convenience
export { EMPTY_VALUES };
