import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { defaultWorkoutTabs } from "./components/workout-data";
import type { WorkoutTab } from "./components/workout-data";
import { WorkoutTable } from "./components/workout-table";
import type { CellId, ExerciseValues } from "./components/workout-table";
import { Numpad } from "./components/numpad";
import { LoginScreen } from "./components/login-screen";
import Logo from "../imports/Logo";
import bgImage from "figma:asset/ed52ae13ae2120a23f5536a3aa9c66f94a092885.png";
import darkBgImage from "figma:asset/ffddf1ccef21438495da3e4084f67698ccbfd94e.png";
import { supabase } from "../lib/supabase";
import {
  loadAllData,
  saveTabsRecord,
  saveExerciseValues,
  saveExerciseValuesBulk,
  startWorkoutDb,
  endWorkoutDb,
  cancelWorkoutDb,
  deleteExercisePrevious,
  EMPTY_VALUES,
  type ValuesMap,
} from "../lib/workout-api";
import type { Session } from "@supabase/supabase-js";

const STORAGE_KEY_DARK_MODE = "workout-dark-mode";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DARK_MODE);
      return saved ? JSON.parse(saved) : false;
    } catch { return false; }
  });

  // Subscribe to auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  if (authLoading) {
    return (
      <div className={`relative h-full flex items-center justify-center ${darkMode ? "bg-[#121218]" : "bg-[#ededed]"}`} />
    );
  }

  // Show login screen if not signed in
  if (!session) {
    return (
      <div
        className={`relative h-full flex flex-col overflow-hidden ${darkMode ? "bg-[#121218]" : "bg-[#ededed]"}`}
        style={darkMode
          ? { backgroundImage: `url(${darkBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
          : { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
        }
      >
        <LoginScreen darkMode={darkMode} />
      </div>
    );
  }

  return <WorkoutApp key={session.user.id} userId={session.user.id} loggedInUser={session.user.email ?? session.user.id} darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} />;
}

function ColumnCountIcon({
  n,
  selected,
  darkMode,
  onClick,
}: {
  n: 1 | 2;
  selected: boolean;
  darkMode?: boolean;
  onClick: () => void;
}) {
  const fg = darkMode ? "#ffffff" : "#242424";
  const bg = selected ? fg : "transparent";
  const text = selected ? (darkMode ? "#1e1e2e" : "#ffffff") : fg;
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-[6px] cursor-pointer transition-opacity hover:opacity-70"
      title={n === 1 ? "Single column" : "Two columns"}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 18,
          height: 18,
          borderRadius: 9999,
          background: bg,
          border: selected ? `1px solid ${fg}` : `1.5px solid ${fg}`,
          color: text,
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: 11,
          lineHeight: 1,
        }}
      >
        {n}
      </div>
    </button>
  );
}

interface WorkoutAppProps {
  userId: string;
  loggedInUser: string;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
}

function WorkoutApp({ userId, loggedInUser, darkMode, setDarkMode, onLogout }: WorkoutAppProps) {
  const [tabs, setTabs] = useState<WorkoutTab[]>(defaultWorkoutTabs);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState<Record<string, boolean>>({});
  const [previousValues, setPreviousValues] = useState<ValuesMap>({});
  const [newValues, setNewValues] = useState<ValuesMap>({});
  const [selectedCell, setSelectedCell] = useState<CellId | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [exerciseNames, setExerciseNames] = useState<Record<string, string>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editingPrevious, setEditingPrevious] = useState<Record<string, boolean>>({});
  const [selectedColumn, setSelectedColumn] = useState<"previous" | "new">("new");
  const [showEditTitles, setShowEditTitles] = useState(false);
  const [draftTabNames, setDraftTabNames] = useState<string[]>([]);
  const [editingTitleIdx, setEditingTitleIdx] = useState<number | null>(null);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null);
  const [dragFromIdx, setDragFromIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [showTabDropdown, setShowTabDropdown] = useState(false);
  const tabDropdownRef = useRef<HTMLDivElement>(null);
  const [tabNames, setTabNames] = useState<Record<string, string>>({});
  const [dataLoaded, setDataLoaded] = useState(false);

  // Apply persisted tab names to tabs
  const displayTabs = useMemo(() => {
    return tabs.map((tab) => ({
      ...tab,
      name: tabNames[tab.id] || tab.name,
    }));
  }, [tabs, tabNames]);

  // Listen for fullscreen changes (e.g. user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Close tab dropdown when clicking outside
  useEffect(() => {
    if (!showTabDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (tabDropdownRef.current && !tabDropdownRef.current.contains(e.target as Node)) {
        setShowTabDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTabDropdown]);

  // Load all data from Supabase on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await loadAllData(userId);
      if (cancelled) return;
      if (data.tabsData && data.tabsData.length > 0) {
        setTabs(data.tabsData);
      } else {
        // First-time user: seed their tabs structure with defaults
        await saveTabsRecord(userId, { tabsData: defaultWorkoutTabs });
      }
      setExerciseNames(data.exerciseNames);
      setTabNames(data.tabNames);
      setPreviousValues(data.previousValues);
      setNewValues(data.currentValues);
      setWorkoutStarted(data.workoutStarted);
      setDataLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [userId]);

  // Sync tabs structure to Supabase when it changes (after initial load)
  const tabsInitialSkip = useRef(true);
  useEffect(() => {
    if (!dataLoaded) return;
    if (tabsInitialSkip.current) {
      tabsInitialSkip.current = false;
      return;
    }
    saveTabsRecord(userId, { tabsData: tabs });
  }, [tabs, dataLoaded, userId]);

  // Debounced sync of newValues for the active tab
  const newValuesSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const newValuesInitialSkip = useRef(true);
  useEffect(() => {
    if (!dataLoaded) return;
    if (newValuesInitialSkip.current) {
      newValuesInitialSkip.current = false;
      return;
    }
    if (newValuesSaveTimer.current) clearTimeout(newValuesSaveTimer.current);
    const snapshot = newValues;
    newValuesSaveTimer.current = setTimeout(() => {
      // Save each tab's current values
      for (const [tabId, exercises] of Object.entries(snapshot)) {
        saveExerciseValuesBulk(userId, tabId, true, exercises);
      }
    }, 600);
    return () => { if (newValuesSaveTimer.current) clearTimeout(newValuesSaveTimer.current); };
  }, [newValues, dataLoaded, userId]);

  // Debounced sync of previousValues for the active tab (used during edit-previous mode)
  const prevValuesSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevValuesInitialSkip = useRef(true);
  useEffect(() => {
    if (!dataLoaded) return;
    if (prevValuesInitialSkip.current) {
      prevValuesInitialSkip.current = false;
      return;
    }
    if (prevValuesSaveTimer.current) clearTimeout(prevValuesSaveTimer.current);
    const snapshot = previousValues;
    prevValuesSaveTimer.current = setTimeout(() => {
      for (const [tabId, exercises] of Object.entries(snapshot)) {
        saveExerciseValuesBulk(userId, tabId, false, exercises);
      }
    }, 600);
    return () => { if (prevValuesSaveTimer.current) clearTimeout(prevValuesSaveTimer.current); };
  }, [previousValues, dataLoaded, userId]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const activeTab = displayTabs[activeTabIdx];

  // Effective column count for the active tab. Falls back to legacy index-based defaults
  // for tabs without an explicit `columns` value (idx <= 1 → 2, otherwise 1).
  const activeColumns: 1 | 2 = activeTab.columns ?? (activeTabIdx <= 1 ? 2 : 1);
  const isSingleNewColumn = activeColumns === 1;

  const allExercisesOrdered = useMemo(() => {
    const exercises: { exerciseId: string; type: "single" | "double" }[] = [];
    for (const section of activeTab.sections) {
      for (const exercise of section.exercises) {
        exercises.push({ exerciseId: exercise.id, type: exercise.type });
      }
    }
    return exercises;
  }, [activeTab]);

  // Get all selectable cells in order for the arrow/next navigation
  const allCells = useMemo(() => {
    const cells: CellId[] = [];

    // Helper to push cells for one exercise in a given set
    const pushExerciseCells = (ex: { exerciseId: string; type: "single" | "double" }, set: number) => {
      if (ex.type === "double") {
        cells.push({ exerciseId: ex.exerciseId, field: "r", set });
        cells.push({ exerciseId: ex.exerciseId, field: "w", set });
      } else {
        cells.push({ exerciseId: ex.exerciseId, field: "r", set });
      }
    };

    // Walk col 1 of each section. For two-column tabs, always wrap up to col 2
    // of the same section before moving on to the next section's col 1.
    const sections = activeTab.sections;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      for (const e of section.exercises) {
        pushExerciseCells({ exerciseId: e.id, type: e.type }, 1);
      }
      if (!isSingleNewColumn) {
        for (const e of section.exercises) {
          pushExerciseCells({ exerciseId: e.id, type: e.type }, 2);
        }
      }
    }

    return cells;
  }, [allExercisesOrdered, isSingleNewColumn, activeTab.sections]);

  // Previous column cells for navigation when editing previous
  const previousCells = useMemo(() => {
    const doublePrev = activeColumns === 2;
    const cells: CellId[] = [];
    for (const ex of allExercisesOrdered) {
      if (ex.type === "double") {
        cells.push({ exerciseId: ex.exerciseId, field: "r", set: 1 });
        cells.push({ exerciseId: ex.exerciseId, field: "w", set: 1 });
        if (doublePrev) {
          cells.push({ exerciseId: ex.exerciseId, field: "r", set: 2 });
          cells.push({ exerciseId: ex.exerciseId, field: "w", set: 2 });
        }
      } else {
        cells.push({ exerciseId: ex.exerciseId, field: "r", set: 1 });
        if (doublePrev) {
          cells.push({ exerciseId: ex.exerciseId, field: "r", set: 2 });
        }
      }
    }
    return cells;
  }, [allExercisesOrdered, activeColumns]);

  // The active cell list depends on which column is selected
  const activeCells = selectedColumn === "previous" ? previousCells : allCells;

  const handleStartWorkout = useCallback(() => {
    const tabId = activeTab.id;
    // Initialize empty new values for this tab
    const init: Record<string, ExerciseValues> = {};
    for (const section of activeTab.sections) {
      for (const exercise of section.exercises) {
        init[exercise.id] = { ...EMPTY_VALUES };
      }
    }
    setWorkoutStarted((prev) => ({ ...prev, [tabId]: true }));
    setNewValues((prev) => ({ ...prev, [tabId]: init }));
    setSelectedCell(null);
    // Persist to Supabase
    startWorkoutDb(userId, tabId);
    saveExerciseValuesBulk(userId, tabId, true, init);
  }, [activeTab, userId]);

  const handleEndWorkout = useCallback(() => {
    const tabId = activeTab.id;
    const tabNewVals = newValues[tabId] ?? {};
    const hasData = Object.values(tabNewVals).some(ex =>
      ex.r1 || ex.w1 || ex.r2 || ex.w2
    );
    // Update local state
    if (hasData) {
      setPreviousValues((prev) => ({ ...prev, [tabId]: { ...tabNewVals } }));
    }
    setWorkoutStarted((prev) => {
      const next = { ...prev };
      delete next[tabId];
      return next;
    });
    setNewValues((prev) => {
      const next = { ...prev };
      delete next[tabId];
      return next;
    });
    setSelectedCell(null);
    // Persist to Supabase: copy current → previous, then clear current
    endWorkoutDb(userId, tabId, tabNewVals);
  }, [activeTab.id, newValues, userId]);

  const handleCancelWorkout = useCallback(() => {
    setShowCancelConfirm(true);
  }, []);

  const handleConfirmCancel = useCallback(() => {
    const tabId = activeTab.id;
    setWorkoutStarted((prev) => {
      const next = { ...prev };
      delete next[tabId];
      return next;
    });
    setNewValues((prev) => {
      const next = { ...prev };
      delete next[tabId];
      return next;
    });
    setSelectedCell(null);
    setShowCancelConfirm(false);
    // Persist to Supabase: clear current rows + started flag
    cancelWorkoutDb(userId, tabId);
  }, [activeTab.id, userId]);

  const handleDismissCancel = useCallback(() => {
    setShowCancelConfirm(false);
  }, []);

  const handleSelectCell = useCallback((cell: CellId | null) => {
    setSelectedCell(cell);
    setSelectedColumn("new");
  }, []);

  const handleSelectPreviousCell = useCallback((cell: CellId | null) => {
    setSelectedCell(cell);
    setSelectedColumn("previous");
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedCell) {
      // Select first cell
      if (activeCells.length > 0) {
        setSelectedCell(activeCells[0]);
      }
      return;
    }
    const currentIdx = activeCells.findIndex(
      (c) =>
        c.exerciseId === selectedCell.exerciseId &&
        c.field === selectedCell.field &&
        c.set === selectedCell.set
    );
    if (currentIdx >= 0 && currentIdx < activeCells.length - 1) {
      setSelectedCell(activeCells[currentIdx + 1]);
    } else {
      // Wrap to first
      setSelectedCell(activeCells[0]);
    }
  }, [selectedCell, activeCells]);

  const handleNumber = useCallback(
    (num: string) => {
      if (!selectedCell) return;
      const tabId = activeTab.id;
      let nextCell: CellId | null = null;
      const setter = selectedColumn === "previous" ? setPreviousValues : setNewValues;
      setter((prev) => {
        const tabVals = { ...(prev[tabId] || {}) };
        const exerciseVals = { ...(tabVals[selectedCell.exerciseId] || { r1: "", w1: "", r2: "", w2: "" }) };
        const key = `${selectedCell.field}${selectedCell.set}` as keyof ExerciseValues;
        const currentVal = exerciseVals[key];
        const exercise = allExercisesOrdered.find(e => e.exerciseId === selectedCell.exerciseId);
        const hasSpecial = currentVal.includes("/") || currentVal.includes("+") || currentVal.includes("-");
        const maxLen = hasSpecial ? 5 : (exercise?.type === "double" ? 2 : 3);
        if (currentVal.length < maxLen) {
          const newVal = currentVal + num;
          exerciseVals[key] = newVal;
          // Auto-advance after 2 digits (skip if has special characters)
          if (newVal.length >= 2 && !hasSpecial) {
            const currentIdx = activeCells.findIndex(
              (c) =>
                c.exerciseId === selectedCell.exerciseId &&
                c.field === selectedCell.field &&
                c.set === selectedCell.set
            );
            if (currentIdx >= 0 && currentIdx < activeCells.length - 1) {
              nextCell = activeCells[currentIdx + 1];
            } else if (activeCells.length > 0) {
              nextCell = activeCells[0];
            }
          }
        }
        tabVals[selectedCell.exerciseId] = exerciseVals;
        return { ...prev, [tabId]: tabVals };
      });
      if (nextCell) {
        setSelectedCell(nextCell);
      }
    },
    [selectedCell, activeTab.id, allExercisesOrdered, activeCells, selectedColumn]
  );

  const handleClear = useCallback(() => {
    if (!selectedCell) return;
    const tabId = activeTab.id;
    const exercise = allExercisesOrdered.find(e => e.exerciseId === selectedCell.exerciseId);
    const setter = selectedColumn === "previous" ? setPreviousValues : setNewValues;
    setter((prev) => {
      const tabVals = { ...(prev[tabId] || {}) };
      const exerciseVals = { ...(tabVals[selectedCell.exerciseId] || { r1: "", w1: "", r2: "", w2: "" }) };
      if (exercise?.type === "double") {
        const rKey = `r${selectedCell.set}` as keyof ExerciseValues;
        const wKey = `w${selectedCell.set}` as keyof ExerciseValues;
        exerciseVals[rKey] = "";
        exerciseVals[wKey] = "";
      } else {
        const key = `${selectedCell.field}${selectedCell.set}` as keyof ExerciseValues;
        exerciseVals[key] = "";
      }
      tabVals[selectedCell.exerciseId] = exerciseVals;
      return { ...prev, [tabId]: tabVals };
    });
  }, [selectedCell, activeTab.id, allExercisesOrdered, selectedColumn]);

  const handleSlash = useCallback(() => {
    if (!selectedCell) return;
    const tabId = activeTab.id;
    const setter = selectedColumn === "previous" ? setPreviousValues : setNewValues;
    setter((prev) => {
      const tabVals = { ...(prev[tabId] || {}) };
      const exerciseVals = { ...(tabVals[selectedCell.exerciseId] || { r1: "", w1: "", r2: "", w2: "" }) };
      const key = `${selectedCell.field}${selectedCell.set}` as keyof ExerciseValues;
      const currentVal = exerciseVals[key];
      if (!currentVal.includes("/") && currentVal.length > 0 && currentVal.length < 5) {
        exerciseVals[key] = currentVal + "/";
      }
      tabVals[selectedCell.exerciseId] = exerciseVals;
      return { ...prev, [tabId]: tabVals };
    });
  }, [selectedCell, activeTab.id, selectedColumn]);

  const handlePlus = useCallback(() => {
    if (!selectedCell) return;
    const tabId = activeTab.id;
    const setter = selectedColumn === "previous" ? setPreviousValues : setNewValues;
    setter((prev) => {
      const tabVals = { ...(prev[tabId] || {}) };
      const exerciseVals = { ...(tabVals[selectedCell.exerciseId] || { r1: "", w1: "", r2: "", w2: "" }) };
      const key = `${selectedCell.field}${selectedCell.set}` as keyof ExerciseValues;
      const currentVal = exerciseVals[key];
      if (!currentVal.includes("+") && !currentVal.includes("-") && currentVal.length > 0 && currentVal.length < 5) {
        exerciseVals[key] = currentVal + "+";
      }
      tabVals[selectedCell.exerciseId] = exerciseVals;
      return { ...prev, [tabId]: tabVals };
    });
  }, [selectedCell, activeTab.id, selectedColumn]);

  const handleMinus = useCallback(() => {
    if (!selectedCell) return;
    const tabId = activeTab.id;
    const setter = selectedColumn === "previous" ? setPreviousValues : setNewValues;
    setter((prev) => {
      const tabVals = { ...(prev[tabId] || {}) };
      const exerciseVals = { ...(tabVals[selectedCell.exerciseId] || { r1: "", w1: "", r2: "", w2: "" }) };
      const key = `${selectedCell.field}${selectedCell.set}` as keyof ExerciseValues;
      const currentVal = exerciseVals[key];
      if (!currentVal.includes("+") && !currentVal.includes("-") && currentVal.length > 0 && currentVal.length < 5) {
        exerciseVals[key] = currentVal + "-";
      }
      tabVals[selectedCell.exerciseId] = exerciseVals;
      return { ...prev, [tabId]: tabVals };
    });
  }, [selectedCell, activeTab.id, selectedColumn]);

  const handleNameChange = useCallback((exerciseId: string, name: string) => {
    setExerciseNames((prev) => {
      const updated = { ...prev, [exerciseId]: name };
      saveTabsRecord(userId, { exerciseNames: updated });
      return updated;
    });
  }, [userId]);

  const handleTabChange = useCallback((idx: number) => {
    setActiveTabIdx(idx);
    setSelectedCell(null);
    setSelectedColumn("new");
  }, []);

  const handleAddTab = useCallback(() => {
    const newId = `custom-tab-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const exId = `${newId}-ex-1`;
    const newTab: WorkoutTab = {
      id: newId,
      name: "New Workout",
      sections: [
        { exercises: [{ id: exId, name: "New Exercise", type: "single" }] },
      ],
      columns: 1,
    };
    setTabs((prev) => {
      const next = [...prev, newTab];
      setActiveTabIdx(next.length - 1);
      return next;
    });
    setPreviousValues((prev) => ({
      ...prev,
      [newId]: { [exId]: { r1: "", w1: "", r2: "", w2: "" } },
    }));
    setSelectedCell(null);
    setSelectedColumn("new");
  }, []);

  const handleSetTabColumns = useCallback((tabIdx: number, columns: 1 | 2) => {
    setTabs((prev) => {
      const next = [...prev];
      if (next[tabIdx]) next[tabIdx] = { ...next[tabIdx], columns };
      return next;
    });
  }, []);

  const handleCopyTab = useCallback((tabIdx: number) => {
    setTabs((prev) => {
      const source = prev[tabIdx];
      if (!source) return prev;
      const newId = `custom-tab-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      // Map old exercise ids to new ones so we can carry over names + values.
      const idMap: Record<string, string> = {};
      const newSections = source.sections.map((s, sIdx) => ({
        ...s,
        exercises: s.exercises.map((e, eIdx) => {
          const newExId = `${newId}-s${sIdx}-e${eIdx}`;
          idMap[e.id] = newExId;
          return { ...e, id: newExId };
        }),
      }));
      const copy: WorkoutTab = {
        ...source,
        id: newId,
        name: `${source.name} (Copy)`,
        sections: newSections,
      };

      // Carry over previous values from source tab, remapped to new exercise ids.
      setPreviousValues((pv) => {
        const sourcePrev = pv[source.id] || {};
        const next: Record<string, ExerciseValues> = {};
        for (const [oldId, newExId] of Object.entries(idMap)) {
          const v = sourcePrev[oldId];
          next[newExId] = v
            ? { r1: v.r1, w1: v.w1, r2: v.r2, w2: v.w2 }
            : { r1: "", w1: "", r2: "", w2: "" };
        }
        return { ...pv, [newId]: next };
      });

      // Carry over any in-progress NEW values too (rare but possible).
      setNewValues((nv) => {
        const sourceNew = nv[source.id];
        if (!sourceNew) return nv;
        const next: Record<string, ExerciseValues> = {};
        for (const [oldId, newExId] of Object.entries(idMap)) {
          const v = sourceNew[oldId];
          if (v) next[newExId] = { r1: v.r1, w1: v.w1, r2: v.r2, w2: v.w2 };
        }
        return Object.keys(next).length ? { ...nv, [newId]: next } : nv;
      });

      // Carry over per-exercise renamed names.
      setExerciseNames((en) => {
        const updated = { ...en };
        let changed = false;
        for (const [oldId, newExId] of Object.entries(idMap)) {
          if (en[oldId] !== undefined) {
            updated[newExId] = en[oldId];
            changed = true;
          }
        }
        if (changed) {
          saveTabsRecord(userId, { exerciseNames: updated });
        }
        return changed ? updated : en;
      });

      return [...prev, copy];
    });
  }, [userId]);

  const handleReorderTabs = useCallback((from: number, to: number) => {
    if (from === to) return;
    setTabs((prev) => {
      if (from < 0 || from >= prev.length || to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setActiveTabIdx((idx) => {
      if (idx === from) return to;
      if (from < idx && to >= idx) return idx - 1;
      if (from > idx && to <= idx) return idx + 1;
      return idx;
    });
  }, []);

  const handleDeleteTab = useCallback((tabIdx: number) => {
    setTabs((prev) => {
      if (prev.length <= 1) return prev;
      const removed = prev[tabIdx];
      const next = prev.filter((_, i) => i !== tabIdx);
      // Also clean per-tab persisted state for that tab
      if (removed) {
        setPreviousValues((pv) => {
          const u = { ...pv }; delete u[removed.id]; return u;
        });
        setNewValues((nv) => {
          const u = { ...nv }; delete u[removed.id]; return u;
        });
        setWorkoutStarted((ws) => {
          const u = { ...ws }; delete u[removed.id]; return u;
        });
        setTabNames((tn) => {
          const u = { ...tn }; delete u[removed.id]; return u;
        });
      }
      return next;
    });
    setActiveTabIdx((idx) => {
      if (tabIdx < idx) return idx - 1;
      if (tabIdx === idx) return Math.max(0, idx - 1);
      return idx;
    });
  }, []);

  const handleMoveDivider = useCallback(
    (sectionIdx: number, direction: "up" | "down") => {
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        const tab = { ...newTabs[activeTabIdx] };
        const sections = tab.sections.map((s) => ({ ...s, exercises: [...s.exercises] }));

        if (direction === "up" && sectionIdx > 0) {
          // Move last exercise from previous section to current section
          const prevSection = sections[sectionIdx - 1];
          const currentSection = sections[sectionIdx];
          if (prevSection.exercises.length > 1) {
            const moved = prevSection.exercises.pop()!;
            currentSection.exercises.unshift(moved);
          }
        } else if (direction === "down" && sectionIdx < sections.length - 1) {
          // Move first exercise from next section to current section
          const currentSection = sections[sectionIdx];
          const nextSection = sections[sectionIdx + 1];
          if (nextSection.exercises.length > 1) {
            const moved = nextSection.exercises.shift()!;
            currentSection.exercises.push(moved);
          }
        }

        tab.sections = sections.filter((s) => s.exercises.length > 0);
        newTabs[activeTabIdx] = tab;
        return newTabs;
      });
    },
    [activeTabIdx]
  );

  const handleAddExercise = useCallback(
    (sectionIdx: number, exerciseIdx: number) => {
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        const tab = { ...newTabs[activeTabIdx] };
        const sections = tab.sections.map((s) => ({ ...s, exercises: [...s.exercises] }));
        const section = sections[sectionIdx];
        const newId = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const newExercise = { id: newId, name: "New Exercise", type: "single" as const };
        section.exercises.splice(exerciseIdx + 1, 0, newExercise);
        tab.sections = sections;
        newTabs[activeTabIdx] = tab;
        return newTabs;
      });
    },
    [activeTabIdx]
  );

  const handleRemoveExercise = useCallback(
    (sectionIdx: number, exerciseIdx: number) => {
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        const tab = { ...newTabs[activeTabIdx] };
        const sections = tab.sections.map((s) => ({ ...s, exercises: [...s.exercises] }));
        const section = sections[sectionIdx];
        // Don't remove if it's the last exercise in the entire tab
        const totalExercises = sections.reduce((sum, s) => sum + s.exercises.length, 0);
        if (totalExercises <= 1) return prevTabs;
        section.exercises.splice(exerciseIdx, 1);
        // Filter out empty sections
        tab.sections = sections.filter((s) => s.exercises.length > 0);
        newTabs[activeTabIdx] = tab;
        return newTabs;
      });
    },
    [activeTabIdx]
  );

  const handleAddDivider = useCallback(
    (sectionIdx: number, exerciseIdx: number) => {
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        const tab = { ...newTabs[activeTabIdx] };
        const sections = tab.sections.map((s) => ({ ...s, exercises: [...s.exercises] }));
        const section = sections[sectionIdx];
        // Only add divider if there are exercises below the current one in this section
        if (exerciseIdx < section.exercises.length - 1) {
          const exercisesBelow = section.exercises.splice(exerciseIdx + 1);
          sections.splice(sectionIdx + 1, 0, { exercises: exercisesBelow });
        }
        // If this is the last exercise in the section but not the last section,
        // we don't need to do anything as a divider already exists
        tab.sections = sections.filter((s) => s.exercises.length > 0);
        newTabs[activeTabIdx] = tab;
        return newTabs;
      });
    },
    [activeTabIdx]
  );

  const handleRemoveDivider = useCallback(
    (sectionIdx: number) => {
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        const tab = { ...newTabs[activeTabIdx] };
        const sections = tab.sections.map((s) => ({ ...s, exercises: [...s.exercises] }));
        // Merge the current section with the next one by moving all exercises from the next section into this one
        if (sectionIdx < sections.length - 1) {
          const nextSection = sections[sectionIdx + 1];
          sections[sectionIdx].exercises.push(...nextSection.exercises);
          sections.splice(sectionIdx + 1, 1);
        }
        tab.sections = sections;
        newTabs[activeTabIdx] = tab;
        return newTabs;
      });
    },
    [activeTabIdx]
  );

  const handleSetDividerNav = useCallback(
    (sectionIdx: number, mode: "wrap" | "down") => {
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        const tab = { ...newTabs[activeTabIdx] };
        const sections = tab.sections.map((s) => ({ ...s, exercises: [...s.exercises] }));
        if (sections[sectionIdx]) {
          sections[sectionIdx].nextDividerNav = mode;
        }
        tab.sections = sections;
        newTabs[activeTabIdx] = tab;
        return newTabs;
      });
    },
    [activeTabIdx]
  );

  const handleSetExerciseType = useCallback(
    (sectionIdx: number, exerciseIdx: number, type: "single" | "double") => {
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        const tab = { ...newTabs[activeTabIdx] };
        const sections = tab.sections.map((s) => ({
          ...s,
          exercises: s.exercises.map((e) => ({ ...e })),
        }));
        const exercise = sections[sectionIdx].exercises[exerciseIdx];
        if (exercise) {
          exercise.type = type;
        }
        tab.sections = sections;
        newTabs[activeTabIdx] = tab;
        return newTabs;
      });
    },
    [activeTabIdx]
  );

  const handleEditPrevious = useCallback(() => {
    const tabId = activeTab.id;
    setEditingPrevious((prev) => ({ ...prev, [tabId]: true }));
    setSelectedCell(null);
    setSelectedColumn("previous");
  }, [activeTab.id]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev: boolean) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_DARK_MODE, JSON.stringify(next));
      return next;
    });
  }, [setDarkMode]);

  const handleSavePrevious = useCallback(() => {
    const tabId = activeTab.id;
    setEditingPrevious((prev) => ({ ...prev, [tabId]: false }));
    setSelectedCell(null);
    setSelectedColumn("new");
    // Persist this tab's previous values to Supabase
    const tabPrev = previousValues[tabId] ?? {};
    saveExerciseValuesBulk(userId, tabId, false, tabPrev);
  }, [activeTab.id, previousValues, userId]);

  const tabPrevious = previousValues[activeTab.id] || {};
  const tabNew = newValues[activeTab.id] || {};
  const isStarted = workoutStarted[activeTab.id] || false;
  const isEditingPrev = editingPrevious[activeTab.id] || false;
  const showNumpad = isStarted || isEditingPrev;

  return (
    <div
      className={`relative h-full flex flex-col overflow-hidden ${darkMode ? "bg-[#121218]" : "bg-[#ededed]"}`}
      style={darkMode
        ? { backgroundImage: `url(${darkBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
        : { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }
      }
    >
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-[30px] shrink-0 px-[64px] py-[16px]">
        {/* Top bar: Logo, Tabs (centered), Dark mode toggle */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo - left */}
          <Logo darkMode={darkMode} />

          {/* Tabs - centered (hidden on tablet and below, shown on large screens) */}
          <div className="hidden lg:flex gap-3 xl:gap-[29px] items-center">
            {displayTabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(idx)}
                className={`cursor-pointer shrink-0 ${
                  idx === activeTabIdx ? "flex flex-col items-center" : ""
                }`}
              >
                {idx === activeTabIdx ? (
                  <div className="flex flex-col items-center w-full">
                    <span className={`font-['Inter',sans-serif] text-[14px] lg:text-[20px] ${darkMode ? "text-white" : "text-black"}`} style={{ fontWeight: 400 }}>
                      {tab.name}
                    </span>
                    
                  </div>
                ) : (
                  <span className={`font-['Inter',sans-serif] text-[10px] lg:text-[12px] ${darkMode ? "text-[#a0a0b0]" : "text-black"}`} style={{ fontWeight: 400 }}>
                    {tab.name}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab dropdown - shown on tablet and below */}
          <div className="lg:hidden relative" ref={tabDropdownRef}>
            <button
              onClick={() => setShowTabDropdown((prev) => !prev)}
              className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 cursor-pointer transition-colors font-['Inter',sans-serif] text-[12px] sm:text-[13px] shrink-0 ${
                darkMode
                  ? "bg-[#2a2a3a] text-white hover:bg-[#3a3a4a]"
                  : "bg-white/80 text-black hover:bg-white"
              }`}
              style={{ fontWeight: 600 }}
            >
              <span className="truncate max-w-[120px] sm:max-w-[180px]">{activeTab.name}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${showTabDropdown ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showTabDropdown && (
              <div className={`absolute top-full left-0 mt-1 min-w-[180px] max-h-[300px] overflow-y-auto z-50 shadow-lg border ${
                darkMode
                  ? "bg-[#1e1e2e] border-[#3a3a4a]"
                  : "bg-white border-gray-200"
              }`}>
                {displayTabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      handleTabChange(idx);
                      setShowTabDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 font-['Inter',sans-serif] text-[12px] sm:text-[13px] cursor-pointer transition-colors ${
                      idx === activeTabIdx
                        ? darkMode
                          ? "bg-[#006aff]/20 text-white font-semibold"
                          : "bg-[#006aff]/10 text-black font-semibold"
                        : darkMode
                          ? "text-[#c0c0d0] hover:bg-[#2a2a3a]"
                          : "text-black hover:bg-gray-100"
                    }`}
                    style={{ fontWeight: idx === activeTabIdx ? 600 : 400 }}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Edit titles, Dark mode toggle + Fullscreen - right */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Logged in user indicator + logout */}
            <button
              onClick={onLogout}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-colors font-['Inter',sans-serif] text-[11px] sm:text-[12px] shrink-0 ${
                darkMode
                  ? "bg-[#2a2a3a] text-white hover:bg-[#3a3a4a]"
                  : "bg-white/80 text-black hover:bg-white"
              }`}
              style={{ fontWeight: 600 }}
              title={`Signed in as ${loggedInUser}. Click to sign out.`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="hidden sm:inline">Sign out</span>
            </button>

            <button
              onClick={() => {
                setDraftTabNames(displayTabs.map((t) => t.name));
                setEditingTitleIdx(null);
                setShowEditTitles(true);
              }}
              className={`flex items-center justify-center p-1.5 sm:p-2 cursor-pointer transition-colors shrink-0 ${
                darkMode
                  ? "bg-[#2a2a3a] text-white hover:bg-[#3a3a4a]"
                  : "bg-white/80 text-black hover:bg-white"
              }`}
              title="Edit workout titles"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>

            <button
              onClick={toggleDarkMode}
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 cursor-pointer transition-colors font-['Inter',sans-serif] text-[11px] sm:text-[12px] shrink-0 ${
                darkMode
                  ? "bg-[#2a2a3a] text-white hover:bg-[#3a3a4a]"
                  : "bg-white/80 text-black hover:bg-white"
              }`}
              style={{ fontWeight: 600 }}
            >
              {darkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
              <span className="hidden sm:inline">{darkMode ? "Light" : "Dark"}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className={`flex items-center justify-center p-1.5 sm:p-2 cursor-pointer transition-colors shrink-0 ${
                darkMode
                  ? "bg-[#2a2a3a] text-white hover:bg-[#3a3a4a]"
                  : "bg-white/80 text-black hover:bg-white"
              }`}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Start New Workout button - always available */}
        {!isStarted && (
          <button
            onClick={handleStartWorkout}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 font-['Inter',sans-serif] transition-colors cursor-pointer self-start text-[11px] sm:text-[12px] ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200 active:bg-gray-300"
                : "bg-black text-white hover:bg-gray-800 active:bg-gray-700"
            }`}
            style={{ fontWeight: 700 }}
          >
            Start New Workout
          </button>
        )}

        {isStarted && (
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleEndWorkout}
              className="bg-[#006AFF] text-white px-4 sm:px-6 py-2.5 sm:py-3 font-['Inter',sans-serif] hover:bg-[#0055cc] active:bg-[#004ab3] transition-colors cursor-pointer text-[11px] sm:text-[12px]"
              style={{ fontWeight: 700 }}
            >End Workout</button>
            <button
              onClick={handleCancelWorkout}
              className={`bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 font-['Inter',sans-serif] transition-colors cursor-pointer text-[11px] sm:text-[12px] border ${
                darkMode
                  ? "text-white border-white hover:bg-white/10 active:bg-white/20"
                  : "text-black border-black hover:bg-black/5 active:bg-black/10"
              }`}
              style={{ fontWeight: 700 }}
            >Cancel</button>
          </div>
        )}
      </div>

      {/* Content - scrollable area */}
      <div className="flex-1 overflow-y-auto min-h-0 px-3 sm:px-6 lg:px-[64px] pb-4 sm:pb-6 lg:pb-[32px]">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[73px] items-start">
          <div className="w-full lg:w-auto overflow-x-auto">
            <WorkoutTable
              sections={activeTab.sections}
              previousValues={tabPrevious}
              newValues={tabNew}
              workoutStarted={isStarted}
              selectedCell={selectedCell}
              onSelectCell={handleSelectCell}
              onNameChange={handleNameChange}
              exerciseNames={exerciseNames}
              onMoveDivider={handleMoveDivider}
              doublePreviousColumns={activeColumns === 2}
              singleNewColumn={isSingleNewColumn}
              darkMode={darkMode}
              editingPrevious={isEditingPrev}
              selectedColumn={selectedColumn}
              onSelectPreviousCell={handleSelectPreviousCell}
              onEditPrevious={handleEditPrevious}
              onSavePrevious={handleSavePrevious}
              onAddExercise={handleAddExercise}
              onRemoveExercise={handleRemoveExercise}
              onAddDivider={handleAddDivider}
              onRemoveDivider={handleRemoveDivider}
              onSetExerciseType={handleSetExerciseType}
              onSetDividerNav={handleSetDividerNav}
              tabColumns={activeColumns}
              onSetTabColumns={(n) => handleSetTabColumns(activeTabIdx, n)}
            />
          </div>

          {showNumpad && (
            <div className="sticky top-0 w-full lg:w-auto">
              <Numpad
                onNumber={handleNumber}
                onClear={handleClear}
                onSlash={handleSlash}
                onPlus={handlePlus}
                onMinus={handleMinus}
                onNext={handleNext}
                darkMode={darkMode}
              />
            </div>
          )}
        </div>
      </div>
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`flex flex-col gap-5 sm:gap-[34px] items-center justify-center p-5 sm:p-[32px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] max-w-[90vw] ${
            darkMode ? "bg-[#1e1e2e]" : "bg-white"
          }`}>
            <div className={`font-['Inter',sans-serif] text-[14px] sm:text-[18px] lg:text-[20px] text-center ${darkMode ? "text-white" : "text-black"}`} style={{ fontWeight: 700 }}>
              <p>Are you sure you want to cancel this workout?</p>
            </div>
            <div className="flex gap-6 sm:gap-[34px] items-center justify-center">
              <button
                onClick={handleDismissCancel}
                className={`font-['Inter',sans-serif] text-[16px] sm:text-[20px] cursor-pointer bg-transparent border-none hover:opacity-70 transition-opacity ${darkMode ? "text-white" : "text-black"}`}
                style={{ fontWeight: 700 }}
              >
                No
              </button>
              <button
                onClick={handleConfirmCancel}
                className="bg-[#008ede] px-[16px] py-[8px] font-['Inter',sans-serif] text-[16px] sm:text-[20px] text-white cursor-pointer border-none hover:bg-[#007acc] active:bg-[#006bb3] transition-colors"
                style={{ fontWeight: 700 }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Workout Titles Modal */}
      {showEditTitles && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`flex flex-col gap-5 sm:gap-[34px] items-center justify-center p-5 sm:p-[32px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] max-w-[90vw] w-full sm:w-auto min-w-[280px] sm:min-w-[360px] ${
            darkMode ? "bg-[#1e1e2e]" : "bg-white"
          }`}>
            <div className={`font-['Inter',sans-serif] text-[16px] sm:text-[20px] text-center ${darkMode ? "text-white" : "text-black"}`} style={{ fontWeight: 700 }}>
              <p>Edit Workout Titles</p>
            </div>
            <div className="flex flex-col gap-4 items-stretch justify-center w-full">
              {draftTabNames.map((name, idx) => {
                const tabCols: 1 | 2 = tabs[idx]?.columns ?? (idx <= 1 ? 2 : 1);
                const isDragging = dragFromIdx === idx;
                const isDropTarget = dragOverIdx === idx && dragFromIdx !== null && dragFromIdx !== idx;
                return (
                  <div
                    key={tabs[idx]?.id ?? idx}
                    className={`flex flex-col w-full transition-opacity ${isDragging ? "opacity-40" : ""} ${isDropTarget ? (darkMode ? "bg-[#2a2a3a]" : "bg-[#f0f7ff]") : ""}`}
                    onDragOver={(e) => {
                      if (dragFromIdx === null) return;
                      e.preventDefault();
                      e.dataTransfer.dropEffect = "move";
                      if (dragOverIdx !== idx) setDragOverIdx(idx);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragFromIdx !== null && dragFromIdx !== idx) {
                        const from = dragFromIdx;
                        const to = idx;
                        // Sync drafts
                        setDraftTabNames((prev) => {
                          const next = [...prev];
                          const [m] = next.splice(from, 1);
                          next.splice(to, 0, m);
                          return next;
                        });
                        handleReorderTabs(from, to);
                      }
                      setDragFromIdx(null);
                      setDragOverIdx(null);
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 w-full">
                      <button
                        draggable
                        onDragStart={(e) => {
                          setDragFromIdx(idx);
                          e.dataTransfer.effectAllowed = "move";
                        }}
                        onDragEnd={() => {
                          setDragFromIdx(null);
                          setDragOverIdx(null);
                        }}
                        className={`flex items-center justify-center p-[6px] cursor-grab active:cursor-grabbing shrink-0 ${darkMode ? "text-[#a0a0b0]" : "text-[#888]"}`}
                        title="Drag to reorder"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="9" cy="6" r="1.5" /><circle cx="15" cy="6" r="1.5" />
                          <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                          <circle cx="9" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" />
                        </svg>
                      </button>
                      {editingTitleIdx === idx ? (
                        <input
                          autoFocus
                          type="text"
                          value={name}
                          onChange={(e) => {
                            const updated = [...draftTabNames];
                            updated[idx] = e.target.value;
                            setDraftTabNames(updated);
                          }}
                          onBlur={() => setEditingTitleIdx(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingTitleIdx(null);
                            if (e.key === "Escape") setEditingTitleIdx(null);
                          }}
                          className={`font-['Inter',sans-serif] text-[16px] sm:text-[20px] text-left border-b-2 border-[#006aff] outline-none bg-transparent flex-1 min-w-0 ${darkMode ? "text-white" : "text-black"}`}
                          style={{ fontWeight: 400 }}
                        />
                      ) : (
                        <button
                          onClick={() => setEditingTitleIdx(idx)}
                          className={`font-['Inter',sans-serif] text-[16px] sm:text-[20px] cursor-pointer bg-transparent border-none hover:opacity-70 transition-opacity text-left flex-1 min-w-0 truncate ${darkMode ? "text-white" : "text-black"}`}
                          style={{ fontWeight: 400 }}
                          title="Rename"
                        >
                          {name}
                        </button>
                      )}
                      <div className="flex items-center gap-2 shrink-0">
                        <ColumnCountIcon
                          n={1}
                          selected={tabCols === 1}
                          darkMode={darkMode}
                          onClick={() => handleSetTabColumns(idx, 1)}
                        />
                        <ColumnCountIcon
                          n={2}
                          selected={tabCols === 2}
                          darkMode={darkMode}
                          onClick={() => handleSetTabColumns(idx, 2)}
                        />
                        <button
                          onClick={() => {
                            handleCopyTab(idx);
                            // Sync draft names so the new copy appears at the end
                            setDraftTabNames((prev) => [...prev, `${prev[idx]} (Copy)`]);
                          }}
                          className="flex items-center justify-center p-[8px] cursor-pointer transition-opacity hover:opacity-70"
                          title="Copy workout"
                        >
                          <svg width="14" height="18" viewBox="0 0 12 16" fill="none">
                            <path d="M4 0C2.89543 0 2 0.895431 2 2V12C2 13.1046 2.89543 14 4 14H10C11.1046 14 12 13.1046 12 12V2C12 0.89543 11.1046 0 10 0H4ZM3 2C3 1.44772 3.44772 1 4 1H10C10.5523 1 11 1.44772 11 2V12C11 12.5523 10.5523 13 10 13H4C3.44772 13 3 12.5523 3 12V2ZM0 4.00001C0 3.25973 0.402199 2.61339 1 2.26758V12.5C1 13.8807 2.11929 15 3.5 15H9.73244C9.38663 15.5978 8.74028 16 8 16H3.5C1.567 16 0 14.433 0 12.5V4.00001Z" fill={darkMode ? "#ffffff" : "#242424"} />
                          </svg>
                        </button>
                        <button
                          onClick={() => setConfirmDeleteIdx(idx)}
                          disabled={tabs.length <= 1}
                          className={`flex items-center justify-center p-[8px] cursor-pointer transition-opacity hover:opacity-70 ${tabs.length <= 1 ? "opacity-30 cursor-not-allowed" : ""}`}
                          title={tabs.length <= 1 ? "Can't delete the last workout" : "Delete workout"}
                        >
                          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                            <path d="M0.0885911 0.215694L0.146447 0.146447C0.320013 -0.0271197 0.589437 -0.046405 0.784306 0.0885911L0.853553 0.146447L6 5.293L11.1464 0.146447C11.32 -0.0271197 11.5894 -0.046405 11.7843 0.0885911L11.8536 0.146447C12.0271 0.320013 12.0464 0.589437 11.9114 0.784306L11.8536 0.853553L6.707 6L11.8536 11.1464C12.0271 11.32 12.0464 11.5894 11.9114 11.7843L11.8536 11.8536C11.68 12.0271 11.4106 12.0464 11.2157 11.9114L11.1464 11.8536L6 6.707L0.853553 11.8536C0.679987 12.0271 0.410563 12.0464 0.215694 11.9114L0.146447 11.8536C-0.0271197 11.68 -0.046405 11.4106 0.0885911 11.2157L0.146447 11.1464L5.293 6L0.146447 0.853553C-0.0271197 0.679987 -0.046405 0.410563 0.0885911 0.215694L0.146447 0.146447L0.0885911 0.215694Z" fill="#DE0000" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {idx < draftTabNames.length - 1 && (
                      <div className={`h-px w-full mt-4 ${darkMode ? "bg-[#3a3a4a]" : "bg-[#f0f0f0]"}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                handleAddTab();
                setDraftTabNames((prev) => [...prev, "New Workout"]);
              }}
              className={`flex items-center justify-center gap-2 w-full py-3 cursor-pointer transition-colors font-['Inter',sans-serif] text-[14px] sm:text-[16px] border-2 border-dashed ${
                darkMode
                  ? "border-[#3a3a4a] text-[#a0a0b0] hover:bg-[#2a2a3a] hover:text-white"
                  : "border-[#ccc] text-[#888] hover:bg-[#f0f0f0] hover:text-black"
              }`}
              style={{ fontWeight: 600 }}
              title="Add new workout"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add New Workout
            </button>
            <div className="flex gap-6 sm:gap-[34px] items-center justify-center">
              <button
                onClick={() => {
                  setShowEditTitles(false);
                  setEditingTitleIdx(null);
                }}
                className={`font-['Inter',sans-serif] text-[16px] sm:text-[20px] cursor-pointer bg-transparent border-none hover:opacity-70 transition-opacity ${darkMode ? "text-white" : "text-black"}`}
                style={{ fontWeight: 700 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newTabNames: Record<string, string> = { ...tabNames };
                  tabs.forEach((tab, idx) => {
                    newTabNames[tab.id] = draftTabNames[idx];
                  });
                  setTabNames(newTabNames);
                  saveTabsRecord(userId, { tabNames: newTabNames });
                  setShowEditTitles(false);
                  setEditingTitleIdx(null);
                }}
                className="bg-[#008ede] px-[16px] py-[8px] font-['Inter',sans-serif] text-[16px] sm:text-[20px] text-white cursor-pointer border-none hover:bg-[#007acc] active:bg-[#006bb3] transition-colors"
                style={{ fontWeight: 700 }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Workout Confirmation */}
      {confirmDeleteIdx !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className={`flex flex-col gap-5 sm:gap-[34px] items-center justify-center p-5 sm:p-[32px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] max-w-[90vw] ${darkMode ? "bg-[#1e1e2e]" : "bg-white"}`}>
            <div className={`font-['Inter',sans-serif] text-[14px] sm:text-[18px] lg:text-[20px] text-center ${darkMode ? "text-white" : "text-black"}`} style={{ fontWeight: 700 }}>
              <p>Delete "{tabs[confirmDeleteIdx]?.name ?? "this workout"}"?</p>
              <p className={`mt-2 text-[12px] sm:text-[14px] ${darkMode ? "text-[#a0a0b0]" : "text-[#666]"}`} style={{ fontWeight: 400 }}>This will remove the workout and its data.</p>
            </div>
            <div className="flex gap-6 sm:gap-[34px] items-center justify-center">
              <button
                onClick={() => setConfirmDeleteIdx(null)}
                className={`font-['Inter',sans-serif] text-[16px] sm:text-[20px] cursor-pointer bg-transparent border-none hover:opacity-70 transition-opacity ${darkMode ? "text-white" : "text-black"}`}
                style={{ fontWeight: 700 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const idx = confirmDeleteIdx;
                  setConfirmDeleteIdx(null);
                  // Sync draft names to remove the deleted tab's entry
                  setDraftTabNames((prev) => prev.filter((_, i) => i !== idx));
                  if (editingTitleIdx === idx) setEditingTitleIdx(null);
                  handleDeleteTab(idx);
                }}
                className="bg-[#DE0000] px-[16px] py-[8px] font-['Inter',sans-serif] text-[16px] sm:text-[20px] text-white cursor-pointer border-none hover:bg-[#b80000] active:bg-[#9a0000] transition-colors"
                style={{ fontWeight: 700 }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}