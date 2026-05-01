import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ExerciseType, WorkoutSection } from "./workout-data";
import svgPaths from "../../imports/svg-8ibnzagso3";
import eraserSvgPaths from "../../imports/svg-rmxktoe2sw";
import numberSvgPaths from "../../imports/svg-3jht15e4am";

// Cell identifier: exerciseId + "r" or "w" for reps/weight field, plus set number (1 or 2)
export interface CellId {
  exerciseId: string;
  field: "r" | "w";
  set: 1 | 2;
}

// Values for a single exercise in a workout
export interface ExerciseValues {
  r1: string;
  w1: string;
  r2: string;
  w2: string;
}

interface WorkoutTableProps {
  sections: WorkoutSection[];
  previousValues: Record<string, ExerciseValues>;
  newValues: Record<string, ExerciseValues>;
  workoutStarted: boolean;
  selectedCell: CellId | null;
  onSelectCell: (cell: CellId | null) => void;
  onNameChange: (exerciseId: string, name: string) => void;
  exerciseNames: Record<string, string>;
  onMoveDivider: (fromSectionIdx: number, direction: "up" | "down") => void;
  doublePreviousColumns?: boolean;
  singleNewColumn?: boolean;
  darkMode?: boolean;
  editingPrevious?: boolean;
  selectedColumn?: "previous" | "new";
  onSelectPreviousCell?: (cell: CellId | null) => void;
  onEditPrevious?: () => void;
  onSavePrevious?: () => void;
  onAddExercise?: (sectionIdx: number, exerciseIdx: number) => void;
  onRemoveExercise?: (sectionIdx: number, exerciseIdx: number) => void;
  onAddDivider?: (sectionIdx: number, exerciseIdx: number) => void;
  onRemoveDivider?: (sectionIdx: number) => void;
  onSetExerciseType?: (sectionIdx: number, exerciseIdx: number, type: ExerciseType) => void;
  onSetDividerNav?: (sectionIdx: number, mode: "wrap" | "down") => void;
}

function HorizontalDivider({
  sectionIdx,
  isLast,
  onMoveDivider,
  darkMode,
}: {
  sectionIdx: number;
  isLast: boolean;
  onMoveDivider: (sectionIdx: number, direction: "up" | "down") => void;
  darkMode?: boolean;
}) {
  const [showControls, setShowControls] = useState(false);

  if (isLast) {
    return <div className={`h-[8px] w-full ${darkMode ? "bg-[#1a1a28]" : "bg-[#e6e6e6]"}`} />;
  }

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className={`h-[8px] w-full transition-colors ${darkMode ? "bg-[#1a1a28] hover:bg-[#2a2a3a]" : "bg-[#e6e6e6] hover:bg-[#d0d0d0]"}`} />
      {showControls && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 z-10">
          <button
            onClick={() => onMoveDivider(sectionIdx, "up")}
            className={`shadow-md px-2 py-0.5 text-[10px] cursor-pointer ${darkMode ? "bg-[#2a2a3a] text-white hover:bg-[#3a3a4a]" : "bg-white hover:bg-gray-100"}`}
            title="Move exercise above divider"
          >
            Move Up
          </button>
          <button
            onClick={() => onMoveDivider(sectionIdx, "down")}
            className={`shadow-md px-2 py-0.5 text-[10px] cursor-pointer ${darkMode ? "bg-[#2a2a3a] text-white hover:bg-[#3a3a4a]" : "bg-white hover:bg-gray-100"}`}
            title="Move exercise below divider"
          >
            Move Down
          </button>
        </div>
      )}
    </div>
  );
}

function WorkoutCell({
  exerciseId,
  field,
  set,
  value,
  type,
  isSelected,
  isEditable,
  onClick,
  darkMode,
  bgClass,
}: {
  exerciseId: string;
  field: "r" | "w";
  set: 1 | 2;
  value: string;
  type: ExerciseType;
  isSelected: boolean;
  isEditable: boolean;
  onClick: () => void;
  darkMode?: boolean;
  bgClass?: string;
}) {
  const hasValue = value !== "";
  const placeholder = field === "r" ? "R" : "W";
  const bg = bgClass || (darkMode ? "bg-[#2A2A39]" : "bg-white");

  return (
    <div
      className={`min-h-[60px] sm:min-h-[72px] lg:min-h-[84px] w-[72px] sm:w-[90px] lg:w-[113px] flex items-center justify-center relative ${bg} ${isEditable ? "cursor-pointer" : ""}`}
      onClick={isEditable ? onClick : undefined}
    >
      {isSelected && (
        <div className={`absolute inset-0 border-2 pointer-events-none z-10 ${darkMode ? "border-[#6e6e8e]" : "border-[#9e9e9e]"}`} />
      )}
      <div className="flex items-center justify-center size-[36px] sm:size-[44px] lg:size-[54px]">
        <span
          className={`font-['Inter',sans-serif] ${
            hasValue
              ? `text-[20px] sm:text-[24px] lg:text-[30px] ${darkMode ? "text-white" : "text-black"}`
              : `text-[14px] sm:text-[16px] lg:text-[18px] ${darkMode ? "text-[#606078]" : "text-[#afafaf]"}`
          }`}
          style={{ fontWeight: 700 }}
        >
          {hasValue ? value : placeholder}
        </span>
      </div>
    </div>
  );
}

function PreviousCell({
  value,
  hasValue,
  darkMode,
}: {
  value: string;
  hasValue: boolean;
  darkMode?: boolean;
}) {
  return (
    <div className={`min-h-[60px] sm:min-h-[72px] lg:min-h-[84px] w-[72px] sm:w-[90px] lg:w-[113px] flex items-center justify-center ${darkMode ? "bg-[#353547]" : "bg-[#F4F4F4]"}`}>
      <div className="flex items-center justify-center size-[36px] sm:size-[44px] lg:size-[54px]">
        <span
          className={`font-['Inter',sans-serif] text-[20px] sm:text-[24px] lg:text-[30px] ${darkMode ? "text-white" : "text-black"}`}
          style={{ fontWeight: 700 }}
        >
          {hasValue ? value : ""}
        </span>
      </div>
    </div>
  );
}

// Combined R/W cell for double exercises in the NEW column
function DoubleCellNew({
  exerciseId,
  set,
  rValue,
  wValue,
  selectedField,
  isEditable,
  onSelectR,
  onSelectW,
  darkMode,
  bgClass,
}: {
  exerciseId: string;
  set: 1 | 2;
  rValue: string;
  wValue: string;
  selectedField: "r" | "w" | null;
  isEditable: boolean;
  onSelectR: () => void;
  onSelectW: () => void;
  darkMode?: boolean;
  bgClass?: string;
}) {
  const hasR = rValue !== "";
  const hasW = wValue !== "";
  const bg = bgClass || (darkMode ? "bg-[#2A2A39]" : "bg-white");

  return (
    <div
      className={`min-h-[60px] sm:min-h-[72px] lg:min-h-[84px] w-[72px] sm:w-[90px] lg:w-[113px] flex items-center justify-center relative ${bg} ${isEditable ? "cursor-pointer" : ""}`}
      onClick={isEditable ? onSelectR : undefined}
    >
      {selectedField && (
        <div className={`absolute inset-0 border-2 pointer-events-none z-10 ${darkMode ? "border-[#6e6e8e]" : "border-[#9e9e9e]"}`} />
      )}
      <div className="flex items-center justify-center gap-[2px] sm:gap-[3px] lg:gap-[4px]">
        <span
          className={`font-['Inter',sans-serif] cursor-pointer ${
            hasR
              ? `text-[16px] sm:text-[18px] lg:text-[22px] ${darkMode ? "text-white" : "text-black"}`
              : `text-[12px] sm:text-[14px] lg:text-[16px] ${darkMode ? "text-[#606078]" : "text-[#afafaf]"}`
          } ${selectedField === "r" ? "underline decoration-2 underline-offset-4" : ""}`}
          style={{ fontWeight: 700 }}
          onClick={isEditable ? (e) => { e.stopPropagation(); onSelectR(); } : undefined}
        >
          {hasR ? rValue : "R"}
        </span>
        <span
          className={`font-['Inter',sans-serif] text-[14px] sm:text-[16px] lg:text-[18px] ${darkMode ? "text-[#505068]" : "text-[#c2c2c2]"}`}
          style={{ fontWeight: 700 }}
        >
          /
        </span>
        <span
          className={`font-['Inter',sans-serif] cursor-pointer ${
            hasW
              ? `text-[16px] sm:text-[18px] lg:text-[22px] ${darkMode ? "text-white" : "text-black"}`
              : `text-[12px] sm:text-[14px] lg:text-[16px] ${darkMode ? "text-[#606078]" : "text-[#afafaf]"}`
          } ${selectedField === "w" ? "underline decoration-2 underline-offset-4" : ""}`}
          style={{ fontWeight: 700 }}
          onClick={isEditable ? (e) => { e.stopPropagation(); onSelectW(); } : undefined}
        >
          {hasW ? wValue : "W"}
        </span>
      </div>
    </div>
  );
}

// Combined R/W cell for double exercises in the PREVIOUS column
function DoubleCellPrevious({
  rValue,
  wValue,
  darkMode,
}: {
  rValue: string;
  wValue: string;
  darkMode?: boolean;
}) {
  const hasR = rValue !== "";
  const hasW = wValue !== "";
  const hasAny = hasR || hasW;

  return (
    <div className={`min-h-[60px] sm:min-h-[72px] lg:min-h-[84px] w-[72px] sm:w-[90px] lg:w-[113px] flex items-center justify-center ${darkMode ? "bg-[#353547]" : "bg-[#F4F4F4]"}`}>
      <div className="flex items-center justify-center gap-[2px] sm:gap-[3px] lg:gap-[4px]">
        {hasAny ? (
          <>
            <span
              className={`font-['Inter',sans-serif] text-[16px] sm:text-[18px] lg:text-[22px] ${darkMode ? "text-white" : "text-black"}`}
              style={{ fontWeight: 700 }}
            >
              {hasR ? rValue : "\u2013"}
            </span>
            <span
              className={`font-['Inter',sans-serif] text-[14px] sm:text-[16px] lg:text-[18px] ${darkMode ? "text-[#505068]" : "text-[#c2c2c2]"}`}
              style={{ fontWeight: 700 }}
            >
              /
            </span>
            <span
              className={`font-['Inter',sans-serif] text-[16px] sm:text-[18px] lg:text-[22px] ${darkMode ? "text-white" : "text-black"}`}
              style={{ fontWeight: 700 }}
            >
              {hasW ? wValue : "\u2013"}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}

function VerticalLine({ darkMode }: { darkMode?: boolean }) {
  return (
    <div className="w-px min-h-[60px] sm:min-h-[72px] lg:min-h-[84px] relative shrink-0">
      <div className={`absolute h-full left-0 top-0 w-px ${darkMode ? "bg-[#404058]" : "bg-[#c2c2c2]"}`} />
    </div>
  );
}

// Options button with popup menu
function OptionsButton({
  sectionIdx,
  exerciseIdx,
  exerciseType,
  darkMode,
  onAddExercise,
  onRemoveExercise,
  onAddDivider,
  onRemoveDivider,
  onSetExerciseType,
  hasDividerBelow,
}: {
  sectionIdx: number;
  exerciseIdx: number;
  exerciseType: ExerciseType;
  darkMode?: boolean;
  onAddExercise: (sectionIdx: number, exerciseIdx: number) => void;
  onRemoveExercise: (sectionIdx: number, exerciseIdx: number) => void;
  onAddDivider: (sectionIdx: number, exerciseIdx: number) => void;
  onRemoveDivider?: (sectionIdx: number) => void;
  onSetExerciseType?: (sectionIdx: number, exerciseIdx: number, type: ExerciseType) => void;
  hasDividerBelow: boolean;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.top + rect.height / 2,
        left: rect.right + 4,
      });
    }
    setOpen((v) => !v);
  };

  return (
    <div className="flex items-center min-h-[60px] sm:min-h-[72px] lg:min-h-[84px]">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center justify-center w-[28px] cursor-pointer transition-opacity hover:opacity-70 px-[8px] mx-[8px]"
        title="Options"
      >
        <div className="relative size-[20px]" style={{ "--fill-0": darkMode ? "#a0a0b0" : "#242424" } as React.CSSProperties}>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14px] left-1/2 top-1/2 w-[16px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p3b320500} fill="var(--fill-0, #242424)" />
            </svg>
          </div>
        </div>
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          className={`fixed z-[9999] flex flex-col items-center justify-center p-[16px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] ${
            darkMode ? "bg-[#2a2a3a]" : "bg-white"
          }`}
          style={{
            top: menuPos.top,
            left: menuPos.left,
            transform: "translateY(-50%)",
          }}
        >
          <div className="flex flex-col gap-[8px] items-start">
            {/* Add Row */}
            <button
              onClick={() => { onAddExercise(sectionIdx, exerciseIdx); setOpen(false); }}
              className={`flex items-center p-[8px] cursor-pointer transition-colors ${
                darkMode ? "hover:bg-[#3a3a4a]" : "hover:bg-gray-100"
              }`}
              title="Add row"
            >
              <div className="relative size-[20px]" style={{ "--fill-0": darkMode ? "#ffffff" : "#242424" } as React.CSSProperties}>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[15px] top-1/2">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                    <path d={svgPaths.p38be5300} fill="var(--fill-0, #242424)" />
                  </svg>
                </div>
              </div>
            </button>
            {/* Remove Row */}
            <button
              onClick={() => { onRemoveExercise(sectionIdx, exerciseIdx); setOpen(false); }}
              className={`flex items-center p-[8px] cursor-pointer transition-colors ${
                darkMode ? "hover:bg-[#3a3a4a]" : "hover:bg-gray-100"
              }`}
              title="Remove row"
            >
              <div className="relative size-[20px]" style={{ "--fill-0": darkMode ? "#ffffff" : "#242424" } as React.CSSProperties}>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                    <path d={svgPaths.p301c8b00} fill="var(--fill-0, #242424)" />
                  </svg>
                </div>
              </div>
            </button>
            {/* Add Divider */}
            <button
              onClick={() => { onAddDivider(sectionIdx, exerciseIdx); setOpen(false); }}
              className={`flex items-center p-[8px] cursor-pointer transition-colors ${
                darkMode ? "hover:bg-[#3a3a4a]" : "hover:bg-gray-100"
              }`}
              title="Add divider below"
            >
              <div className="relative size-[20px]" style={{ "--fill-0": darkMode ? "#ffffff" : "#242424" } as React.CSSProperties}>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16px] left-1/2 top-1/2 w-[15px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.0002">
                    <path d={svgPaths.p15067e80} fill="var(--fill-0, #242424)" />
                  </svg>
                </div>
              </div>
            </button>
            {/* Remove Divider */}
            {hasDividerBelow && onRemoveDivider && (
              <button
                onClick={() => { onRemoveDivider(sectionIdx); setOpen(false); }}
                className={`flex items-center p-[8px] cursor-pointer transition-colors ${
                  darkMode ? "hover:bg-[#3a3a4a]" : "hover:bg-gray-100"
                }`}
                title="Remove divider"
              >
                <div className="overflow-clip relative shrink-0 size-[20px]" style={{ "--fill-0": darkMode ? "#ffffff" : "#242424" } as React.CSSProperties}>
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0023 16.0023">
                      <path d={eraserSvgPaths.p19347600} fill="var(--fill-0, #242424)" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
            {/* Set Exercise Type */}
            {onSetExerciseType && (
              <>
                {/* Set to Single (R only) */}
                <button
                  onClick={() => { onSetExerciseType(sectionIdx, exerciseIdx, "single"); setOpen(false); }}
                  className={`flex items-center p-[8px] cursor-pointer transition-colors ${
                    exerciseType === "single" ? (darkMode ? "bg-[#4a4a5a]" : "bg-gray-200") : ""
                  } ${
                    darkMode ? "hover:bg-[#3a3a4a]" : "hover:bg-gray-100"
                  }`}
                  title="Single input (R only)"
                >
                  <div className="relative size-[20px]" style={{ "--fill-0": darkMode ? "#ffffff" : "#242424" } as React.CSSProperties}>
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <path d={numberSvgPaths.p31e95100} fill="var(--fill-0, #242424)" />
                      </svg>
                    </div>
                  </div>
                </button>
                {/* Set to Double (R/W) */}
                <button
                  onClick={() => { onSetExerciseType(sectionIdx, exerciseIdx, "double"); setOpen(false); }}
                  className={`flex items-center p-[8px] cursor-pointer transition-colors ${
                    exerciseType === "double" ? (darkMode ? "bg-[#4a4a5a]" : "bg-gray-200") : ""
                  } ${
                    darkMode ? "hover:bg-[#3a3a4a]" : "hover:bg-gray-100"
                  }`}
                  title="Dual input (R/W)"
                >
                  <div className="relative size-[20px]" style={{ "--fill-0": darkMode ? "#ffffff" : "#242424" } as React.CSSProperties}>
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <path d={numberSvgPaths.pfbecb80} fill="var(--fill-0, #242424)" />
                      </svg>
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// Options popup for a divider — toggles tab-navigation mode
function DividerOptionsButton({
  sectionIdx,
  navMode,
  darkMode,
  onSetDividerNav,
}: {
  sectionIdx: number;
  navMode: "wrap" | "down";
  darkMode?: boolean;
  onSetDividerNav: (sectionIdx: number, mode: "wrap" | "down") => void;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.top + rect.height / 2, left: rect.right + 4 });
    }
    setOpen((v) => !v);
  };

  return (
    <div className="flex items-center h-[8px]">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center justify-center w-[28px] cursor-pointer transition-opacity hover:opacity-70 px-[8px] mx-[8px]"
        title="Divider navigation options"
      >
        <div className="relative size-[20px]" style={{ "--fill-0": darkMode ? "#a0a0b0" : "#242424" } as React.CSSProperties}>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14px] left-1/2 top-1/2 w-[16px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p3b320500} fill="var(--fill-0, #242424)" />
            </svg>
          </div>
        </div>
      </button>
      {open && createPortal(
        <div
          ref={menuRef}
          className={`fixed z-[9999] flex flex-col items-stretch p-[8px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] ${
            darkMode ? "bg-[#2a2a3a]" : "bg-white"
          }`}
          style={{ top: menuPos.top, left: menuPos.left, transform: "translateY(-50%)" }}
        >
          <button
            onClick={() => { onSetDividerNav(sectionIdx, "wrap"); setOpen(false); }}
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer font-['Inter',sans-serif] text-[11px] text-left ${
              navMode === "wrap" ? (darkMode ? "bg-[#4a4a5a]" : "bg-gray-200") : ""
            } ${darkMode ? "text-white hover:bg-[#3a3a4a]" : "text-black hover:bg-gray-100"}`}
            style={{ fontWeight: 600 }}
            title="Wrap up to column 2 of this section"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 11 12 6 7 11" />
              <polyline points="17 18 12 13 7 18" />
            </svg>
            Wrap to column 2
          </button>
          <button
            onClick={() => { onSetDividerNav(sectionIdx, "down"); setOpen(false); }}
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer font-['Inter',sans-serif] text-[11px] text-left ${
              navMode === "down" ? (darkMode ? "bg-[#4a4a5a]" : "bg-gray-200") : ""
            } ${darkMode ? "text-white hover:bg-[#3a3a4a]" : "text-black hover:bg-gray-100"}`}
            style={{ fontWeight: 600 }}
            title="Continue down into next section"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7 6 12 11 17 6" />
              <polyline points="7 13 12 18 17 13" />
            </svg>
            Continue down
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}

export function WorkoutTable({
  sections,
  previousValues,
  newValues,
  workoutStarted,
  selectedCell,
  onSelectCell,
  onNameChange,
  exerciseNames,
  onMoveDivider,
  doublePreviousColumns,
  singleNewColumn,
  darkMode,
  editingPrevious,
  selectedColumn,
  onSelectPreviousCell,
  onEditPrevious,
  onSavePrevious,
  onAddExercise,
  onRemoveExercise,
  onAddDivider,
  onRemoveDivider,
  onSetExerciseType,
  onSetDividerNav,
}: WorkoutTableProps) {
  const [editingName, setEditingName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingName]);

  const isCellSelected = useCallback(
    (exerciseId: string, field: "r" | "w", set: 1 | 2) => {
      if (!selectedCell) return false;
      return (
        selectedCell.exerciseId === exerciseId &&
        selectedCell.field === field &&
        selectedCell.set === set
      );
    },
    [selectedCell]
  );

  return (
    <div className={`flex gap-[4px] ${darkMode ? "bg-[#1a1a28]" : "bg-[#e6e6e6]"}`}>
      {/* LIFT Column */}
      <div className="flex flex-col gap-px w-[100px] sm:w-[120px] lg:w-[150px] shrink-0">
        <div className="h-[24px] flex items-center justify-center">
          <span className={`font-['Inter',sans-serif] text-[9px] sm:text-[10px] ${darkMode ? "text-[#a0a0b0]" : "text-black"}`} style={{ fontWeight: 700 }}>
            LIFT
          </span>
        </div>
        {sections.map((section, sIdx) => (
          <div key={sIdx} className={`flex flex-col gap-px ${darkMode ? "bg-[#1a1a28]" : "bg-[#e6e6e6]"}`}>
            {section.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`min-h-[60px] sm:min-h-[72px] lg:min-h-[84px] w-full flex items-center justify-center p-[6px] sm:p-[8px] lg:p-[10px] ${darkMode ? "bg-[#2A2A39]" : "bg-white"}`}
              >
                {editingName === exercise.id ? (
                  <input
                    ref={inputRef}
                    className={`font-['Inter',sans-serif] text-[10px] sm:text-[11px] lg:text-[12px] text-center w-full bg-transparent outline-none border-b ${
                      darkMode ? "text-white border-[#505068]" : "text-black border-gray-300"
                    }`}
                    style={{ fontWeight: 400 }}
                    value={exerciseNames[exercise.id] || exercise.name}
                    onChange={(e) => onNameChange(exercise.id, e.target.value)}
                    onBlur={() => setEditingName(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setEditingName(null);
                    }}
                  />
                ) : (
                  <p
                    className={`font-['Inter',sans-serif] text-[10px] sm:text-[11px] lg:text-[12px] text-center w-full cursor-pointer hover:underline ${darkMode ? "text-white" : "text-black"}`}
                    style={{ fontWeight: 700 }}
                    onClick={() => setEditingName(exercise.id)}
                  >
                    {exerciseNames[exercise.id] || exercise.name}
                  </p>
                )}
              </div>
            ))}
            <HorizontalDivider
              sectionIdx={sIdx}
              isLast={sIdx === sections.length - 1}
              onMoveDivider={onMoveDivider}
              darkMode={darkMode}
            />
          </div>
        ))}
      </div>

      {/* PREVIOUS + NEW columns */}
      <div className="flex gap-[8px]">
        {/* PREVIOUS Column */}
        <div className="flex flex-col gap-px shrink-0">
          <div className="h-[24px] flex items-center justify-center px-[10px] gap-2">
            <span className={`font-['Inter',sans-serif] text-[10px] ${darkMode ? "text-[#a0a0b0]" : "text-black"}`} style={{ fontWeight: 700 }}>
              PREVIOUS
            </span>
            {onEditPrevious && onSavePrevious && (
              <button
                onClick={editingPrevious ? onSavePrevious : onEditPrevious}
                className={`font-['Inter',sans-serif] text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 cursor-pointer transition-colors ${
                  editingPrevious
                    ? "bg-[#006AFF] text-white hover:bg-[#0055cc]"
                    : darkMode
                      ? "text-[#6e9eff] hover:text-[#8eb4ff] hover:bg-[#2a2a3a]"
                      : "text-[#006AFF] hover:text-[#0055cc] hover:bg-gray-100"
                }`}
                style={{ fontWeight: 700 }}
              >
                {editingPrevious ? "Save" : "Edit"}
              </button>
            )}
          </div>
          {sections.map((section, sIdx) => (
            <div key={sIdx} className={`flex flex-col gap-px ${darkMode ? "bg-[#1a1a28]" : "bg-[#e6e6e6]"}`}>
              {section.exercises.map((exercise) => {
                const prev = previousValues[exercise.id] || {
                  r1: "",
                  w1: "",
                  r2: "",
                  w2: "",
                };
                const isPrevSelected = selectedColumn === "previous";
                const prevBgClass = darkMode ? "bg-[#353547]" : "bg-[#F4F4F4]";
                return (
                  <div
                    key={exercise.id}
                    className={`flex flex-col ${darkMode ? "bg-[#1a1a28]" : "bg-[#e6e6e6]"}`}
                  >
                    <div className="flex items-center w-full">
                      {editingPrevious && onSelectPreviousCell ? (
                        // Editable previous cells
                        exercise.type === "double" ? (
                          <>
                            <DoubleCellNew
                              exerciseId={exercise.id}
                              set={1}
                              rValue={prev.r1}
                              wValue={prev.w1}
                              selectedField={
                                isPrevSelected &&
                                selectedCell?.exerciseId === exercise.id &&
                                selectedCell?.set === 1
                                  ? selectedCell.field
                                  : null
                              }
                              isEditable={true}
                              onSelectR={() =>
                                onSelectPreviousCell({
                                  exerciseId: exercise.id,
                                  field: "r",
                                  set: 1,
                                })
                              }
                              onSelectW={() =>
                                onSelectPreviousCell({
                                  exerciseId: exercise.id,
                                  field: "w",
                                  set: 1,
                                })
                              }
                              darkMode={darkMode}
                              bgClass={prevBgClass}
                            />
                            {doublePreviousColumns && (
                              <>
                                <VerticalLine darkMode={darkMode} />
                                <DoubleCellNew
                                  exerciseId={exercise.id}
                                  set={2}
                                  rValue={prev.r2}
                                  wValue={prev.w2}
                                  selectedField={
                                    isPrevSelected &&
                                    selectedCell?.exerciseId === exercise.id &&
                                    selectedCell?.set === 2
                                      ? selectedCell.field
                                      : null
                                  }
                                  isEditable={true}
                                  onSelectR={() =>
                                    onSelectPreviousCell({
                                      exerciseId: exercise.id,
                                      field: "r",
                                      set: 2,
                                    })
                                  }
                                  onSelectW={() =>
                                    onSelectPreviousCell({
                                      exerciseId: exercise.id,
                                      field: "w",
                                      set: 2,
                                    })
                                  }
                                  darkMode={darkMode}
                                  bgClass={prevBgClass}
                                />
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <WorkoutCell
                              exerciseId={exercise.id}
                              field="r"
                              set={1}
                              value={prev.r1}
                              type={exercise.type}
                              isSelected={isPrevSelected && isCellSelected(exercise.id, "r", 1)}
                              isEditable={true}
                              onClick={() =>
                                onSelectPreviousCell({
                                  exerciseId: exercise.id,
                                  field: "r",
                                  set: 1,
                                })
                              }
                              darkMode={darkMode}
                              bgClass={prevBgClass}
                            />
                            {doublePreviousColumns && (
                              <>
                                <VerticalLine darkMode={darkMode} />
                                <WorkoutCell
                                  exerciseId={exercise.id}
                                  field="r"
                                  set={2}
                                  value={prev.r2}
                                  type={exercise.type}
                                  isSelected={isPrevSelected && isCellSelected(exercise.id, "r", 2)}
                                  isEditable={true}
                                  onClick={() =>
                                    onSelectPreviousCell({
                                      exerciseId: exercise.id,
                                      field: "r",
                                      set: 2,
                                    })
                                  }
                                  darkMode={darkMode}
                                  bgClass={prevBgClass}
                                />
                              </>
                            )}
                          </>
                        )
                      ) : (
                        // Read-only previous cells
                        exercise.type === "double" ? (
                          doublePreviousColumns ? (
                            <>
                              <DoubleCellPrevious rValue={prev.r1} wValue={prev.w1} darkMode={darkMode} />
                              <VerticalLine darkMode={darkMode} />
                              <DoubleCellPrevious rValue={prev.r2} wValue={prev.w2} darkMode={darkMode} />
                            </>
                          ) : (
                            <DoubleCellPrevious rValue={prev.r1} wValue={prev.w1} darkMode={darkMode} />
                          )
                        ) : (
                          doublePreviousColumns ? (
                            <>
                              <PreviousCell value={prev.r1} hasValue={prev.r1 !== ""} darkMode={darkMode} />
                              <VerticalLine darkMode={darkMode} />
                              <PreviousCell value={prev.r2} hasValue={prev.r2 !== ""} darkMode={darkMode} />
                            </>
                          ) : (
                            <PreviousCell value={prev.r1} hasValue={prev.r1 !== ""} darkMode={darkMode} />
                          )
                        )
                      )}
                    </div>
                  </div>
                );
              })}
              <HorizontalDivider
                sectionIdx={sIdx}
                isLast={sIdx === sections.length - 1}
                onMoveDivider={onMoveDivider}
                darkMode={darkMode}
              />
            </div>
          ))}
        </div>

        {/* NEW Column */}
        {workoutStarted && (
          <div className="flex flex-col gap-px shrink-0">
            <div className="h-[24px] flex items-center justify-center">
              <span className={`font-['Inter',sans-serif] text-[9px] sm:text-[10px] ${darkMode ? "text-[#a0a0b0]" : "text-black"}`} style={{ fontWeight: 700 }}>
                NEW
              </span>
            </div>
            {sections.map((section, sIdx) => (
              <div key={sIdx} className={`flex flex-col gap-px ${darkMode ? "bg-[#1a1a28]" : "bg-[#e6e6e6]"}`}>
                {section.exercises.map((exercise) => {
                  const vals = newValues[exercise.id] || {
                    r1: "",
                    w1: "",
                    r2: "",
                    w2: "",
                  };
                  const isNewSelected = selectedColumn === "new";
                  const newBgClass = darkMode ? "bg-[#2A2A39]" : "bg-white";
                  return (
                    <div key={exercise.id} className="flex items-center w-full">
                      {exercise.type === "double" ? (
                        <>
                          <DoubleCellNew
                            exerciseId={exercise.id}
                            set={1}
                            rValue={vals.r1}
                            wValue={vals.w1}
                            selectedField={
                              isNewSelected &&
                              selectedCell?.exerciseId === exercise.id &&
                              selectedCell?.set === 1
                                ? selectedCell.field
                                : null
                            }
                            isEditable={true}
                            onSelectR={() =>
                              onSelectCell({
                                exerciseId: exercise.id,
                                field: "r",
                                set: 1,
                              })
                            }
                            onSelectW={() =>
                              onSelectCell({
                                exerciseId: exercise.id,
                                field: "r",
                                set: 1,
                              })
                            }
                            darkMode={darkMode}
                            bgClass={newBgClass}
                          />
                          {!singleNewColumn && (
                            <>
                              <VerticalLine darkMode={darkMode} />
                              <DoubleCellNew
                                exerciseId={exercise.id}
                                set={2}
                                rValue={vals.r2}
                                wValue={vals.w2}
                                selectedField={
                                  isNewSelected &&
                                  selectedCell?.exerciseId === exercise.id &&
                                  selectedCell?.set === 2
                                    ? selectedCell.field
                                    : null
                                }
                                isEditable={true}
                                onSelectR={() =>
                                  onSelectCell({
                                    exerciseId: exercise.id,
                                    field: "r",
                                    set: 2,
                                  })
                                }
                                onSelectW={() =>
                                  onSelectCell({
                                    exerciseId: exercise.id,
                                    field: "r",
                                    set: 2,
                                  })
                                }
                                darkMode={darkMode}
                                bgClass={newBgClass}
                              />
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <WorkoutCell
                            exerciseId={exercise.id}
                            field="r"
                            set={1}
                            value={vals.r1}
                            type={exercise.type}
                            isSelected={isNewSelected && isCellSelected(exercise.id, "r", 1)}
                            isEditable={true}
                            onClick={() =>
                              onSelectCell({
                                exerciseId: exercise.id,
                                field: "r",
                                set: 1,
                              })
                            }
                            darkMode={darkMode}
                            bgClass={newBgClass}
                          />
                          {!singleNewColumn && (
                            <>
                              <VerticalLine darkMode={darkMode} />
                              <WorkoutCell
                                exerciseId={exercise.id}
                                field="r"
                                set={2}
                                value={vals.r2}
                                type={exercise.type}
                                isSelected={isNewSelected && isCellSelected(exercise.id, "r", 2)}
                                isEditable={true}
                                onClick={() =>
                                  onSelectCell({
                                    exerciseId: exercise.id,
                                    field: "r",
                                    set: 2,
                                  })
                                }
                                darkMode={darkMode}
                                bgClass={newBgClass}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
                <HorizontalDivider
                  sectionIdx={sIdx}
                  isLast={sIdx === sections.length - 1}
                  onMoveDivider={onMoveDivider}
                  darkMode={darkMode}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Options Column - only visible when in edit mode (Previous column "Edit" clicked) */}
      {editingPrevious && !workoutStarted && onAddExercise && onRemoveExercise && onAddDivider && (
        <div className="flex flex-col shrink-0">
          <div className="h-[24px]" />
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="flex flex-col gap-px">
              {section.exercises.map((exercise, eIdx) => (
                <OptionsButton
                  key={exercise.id}
                  sectionIdx={sIdx}
                  exerciseIdx={eIdx}
                  exerciseType={exercise.type}
                  darkMode={darkMode}
                  onAddExercise={onAddExercise}
                  onRemoveExercise={onRemoveExercise}
                  onAddDivider={onAddDivider}
                  onRemoveDivider={onRemoveDivider}
                  onSetExerciseType={onSetExerciseType}
                  hasDividerBelow={eIdx === section.exercises.length - 1 && sIdx < sections.length - 1}
                />
              ))}
              {sIdx < sections.length - 1 && onSetDividerNav ? (
                <DividerOptionsButton
                  sectionIdx={sIdx}
                  navMode={section.nextDividerNav || "wrap"}
                  darkMode={darkMode}
                  onSetDividerNav={onSetDividerNav}
                />
              ) : (
                <div className="h-[8px] w-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}