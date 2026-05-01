import svgPaths from "../../imports/svg-o46z7tgtvx";

interface NumpadProps {
  onNumber: (num: string) => void;
  onClear: () => void;
  onNext: () => void;
  onSlash: () => void;
  onPlus: () => void;
  onMinus: () => void;
  darkMode?: boolean;
}

function ClearIcon({ darkMode }: { darkMode?: boolean }) {
  return (
    <div className="relative size-[14px] sm:size-[17px] lg:size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <path d={svgPaths.pf360400} fill={darkMode ? "#ffffff" : "#000000"} />
      </svg>
    </div>
  );
}

function SlashIcon({ darkMode }: { darkMode?: boolean }) {
  return (
    <div className="relative size-[14px] sm:size-[17px] lg:size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <path d={svgPaths.p38b65700} fill={darkMode ? "#ffffff" : "#000000"} />
      </svg>
    </div>
  );
}

function PlusIcon({ darkMode }: { darkMode?: boolean }) {
  return (
    <div className="relative size-[14px] sm:size-[17px] lg:size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2def5e00} fill={darkMode ? "#ffffff" : "#000000"} />
      </svg>
    </div>
  );
}

function MinusIcon({ darkMode }: { darkMode?: boolean }) {
  return (
    <div className="relative size-[14px] sm:size-[17px] lg:size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p239900} fill={darkMode ? "#ffffff" : "#000000"} />
      </svg>
    </div>
  );
}

function ArrowRightIcon({ darkMode }: { darkMode?: boolean }) {
  return (
    <div className="relative size-[22px] sm:size-[28px] lg:size-[34px]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[14px] sm:h-[18px] lg:h-[22px] w-[17px] sm:w-[22px] lg:w-[27px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 32">
          <path d={svgPaths.p34f1f680} fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
}

export function Numpad({ onNumber, onClear, onNext, onSlash, onPlus, onMinus, darkMode }: NumpadProps) {
  const numberKeys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  const numBtnClass = `size-[50px] sm:size-[67px] lg:size-[90px] flex items-center justify-center cursor-pointer transition-colors ${
    darkMode
      ? "bg-[#1A1A27] hover:bg-[#252535] active:bg-[#303045]"
      : "bg-white hover:bg-gray-50 active:bg-gray-100"
  }`;

  const actionBtnClass = `flex-1 flex items-center justify-center cursor-pointer transition-colors self-stretch ${
    darkMode
      ? "bg-[#1A1A27] hover:bg-[#252535] active:bg-[#303045]"
      : "bg-white hover:bg-gray-50 active:bg-gray-100"
  }`;

  return (
    <div className="flex flex-col gap-1 sm:gap-1.5 lg:gap-[6px]">
      {numberKeys.map((row, i) => (
        <div key={i} className="flex gap-1 sm:gap-1.5 lg:gap-[6px]">
          {row.map((num) => (
            <button
              key={num}
              onClick={() => onNumber(num)}
              className={numBtnClass}
            >
              <span className={`font-['Inter',sans-serif] text-[17px] sm:text-[22px] lg:text-[28px] ${darkMode ? "text-white" : "text-black"}`} style={{ fontWeight: 400 }}>
                {num}
              </span>
            </button>
          ))}
        </div>
      ))}
      {/* Bottom row: 0, X, /, +, - */}
      <div className="flex gap-1 sm:gap-1.5 lg:gap-[6px] h-[50px] sm:h-[67px] lg:h-[90px]">
        <button
          onClick={() => onNumber("0")}
          className={numBtnClass}
        >
          <span className={`font-['Inter',sans-serif] text-[17px] sm:text-[22px] lg:text-[28px] ${darkMode ? "text-white" : "text-black"}`} style={{ fontWeight: 400 }}>
            0
          </span>
        </button>
        <button
          onClick={onClear}
          className={actionBtnClass}
        >
          <ClearIcon darkMode={darkMode} />
        </button>
        <button
          onClick={onSlash}
          className={actionBtnClass}
        >
          <SlashIcon darkMode={darkMode} />
        </button>
        <button
          onClick={onPlus}
          className={actionBtnClass}
        >
          <PlusIcon darkMode={darkMode} />
        </button>
        <button
          onClick={onMinus}
          className={actionBtnClass}
        >
          <MinusIcon darkMode={darkMode} />
        </button>
      </div>
      {/* Arrow/Next button - full width */}
      <button
        onClick={onNext}
        className={`w-full h-[50px] sm:h-[67px] lg:h-[90px] flex items-center justify-center cursor-pointer transition-colors ${
          darkMode
            ? "bg-[#3a3a4a] hover:bg-[#4a4a5a] active:bg-[#555568]"
            : "bg-[#9A9A9A] hover:bg-[#888888] active:bg-[#777777]"
        }`}
      >
        <ArrowRightIcon darkMode={darkMode} />
      </button>
    </div>
  );
}