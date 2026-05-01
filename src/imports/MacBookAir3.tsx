import clsx from "clsx";
import svgPaths from "./svg-xtvw4husvy";
import imgMacBookAir3 from "figma:asset/4ee9f875cc96522adac152ffd26081bd1fae0447.png";

function ArrowRightShape({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[22px] left-1/2 top-1/2 w-[26px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 22">
        {children}
      </svg>
    </div>
  );
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center min-h-[inherit] size-full">{children}</div>
    </div>
  );
}

function Frame1010106856Tabs({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper additionalClassNames="min-h-[24px]">
      <div className="content-stretch flex items-center justify-center min-h-[inherit] relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
          <p className="leading-[normal]">{children}</p>
        </div>
      </div>
    </Wrapper>
  );
}
type Text2Props = {
  text: string;
};

function Text2({ text }: Text2Props) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[50px] py-[40px] relative shrink-0 size-[128px]">
      <p className="font-['Inter:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[40px] text-black w-full whitespace-pre-wrap">{text}</p>
    </div>
  );
}

function Helper3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" property1="Empty double" />
      <Vertical className="h-[56px] relative shrink-0 w-px" />
      <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" property1="Empty double" />
    </div>
  );
}

function Helper2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" />
      <Vertical className="h-[56px] relative shrink-0 w-px" />
      <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" />
    </div>
  );
}

function Helper1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" property1="Complete double" />
      <Vertical className="h-[56px] relative shrink-0 w-px" />
      <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" property1="Complete double" />
    </div>
  );
}

function Helper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" property1="Complete single" />
      <Vertical className="h-[56px] relative shrink-0 w-px" />
      <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" property1="Complete single" />
    </div>
  );
}
type Text1Props = {
  text: string;
};

function Text1({ text }: Text1Props) {
  return (
    <Wrapper additionalClassNames="bg-white min-h-[56px] w-full">
      <div className="content-stretch flex items-center justify-center min-h-[inherit] p-[10px] relative w-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black text-center whitespace-pre-wrap">{text}</p>
      </div>
    </Wrapper>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="h-[24px] relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] relative size-full">
          <p className="font-['Inter:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[10px] text-black">{text}</p>
        </div>
      </div>
    </div>
  );
}
type ArrowRightProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function ArrowRight({ className, size = "28", theme = "Regular" }: ArrowRightProps) {
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[28px]"} data-name="Size=28, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19.998px] left-1/2 top-1/2 w-[22.003px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0032 19.9977">
            <path d={svgPaths.p16254e80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Size=24, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15.995px] left-1/2 top-1/2 w-[18px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 15.9955">
            <path d={svgPaths.p3a9520f0} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Size=24, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[16.001px] left-1/2 top-1/2 w-[18.001px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0014 16.0009">
            <path d={svgPaths.p6ccf880} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.997px] left-1/2 top-1/2 w-[16px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 13.9974">
            <path d={svgPaths.p3f0dbf30} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14.002px] left-1/2 top-1/2 w-[16px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14.0021">
            <path d={svgPaths.p1b4e7000} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "16" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[16px]"} data-name="Size=16, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-1/2 top-1/2 w-[12px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
            <path d={svgPaths.p282af580} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[16px]"} data-name="Size=16, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10px] left-[calc(50%+0.12px)] top-1/2 w-[12.25px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 10">
            <path d={svgPaths.pacc5080} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[32px]"} data-name="Size=32, Theme=Regular">
        <ArrowRightShape>
          <path d={svgPaths.p260f5a80} fill="var(--fill-0, #242424)" id="Shape" />
        </ArrowRightShape>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[32px]"} data-name="Size=32, Theme=Filled">
        <ArrowRightShape>
          <path d={svgPaths.p3afe2640} fill="var(--fill-0, #242424)" id="Shape" />
        </ArrowRightShape>
      </div>
    );
  }
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[48px]"} data-name="Size=48, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[32px] left-[calc(50%-1px)] top-1/2 w-[38px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 32">
            <path d={svgPaths.p34f1f680} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[48px]"} data-name="Size=48, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[32.5px] left-[calc(50%-1px)] top-1/2 w-[38.5px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.5 32.5">
            <path d={svgPaths.p137ddb00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "12" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[12px]"} data-name="Size=12, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[8px] left-1/2 top-1/2 w-[9px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8">
            <path d={svgPaths.p33fe0200} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "12" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[12px]"} data-name="Size=12, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[8px] left-[calc(50%+0.13px)] top-1/2 w-[9.25px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.25 8.0002">
            <path d={svgPaths.p12167e00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[28px]"} data-name="Size=28, Theme=Regular">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19.999px] left-1/2 top-1/2 w-[22.003px]" data-name="Shape">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0032 19.9991">
          <path d={svgPaths.p3d71e110} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}
type DismissProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled" | "Light";
};

function Dismiss({ className, size = "28", theme = "Regular" }: DismissProps) {
  if (size === "28" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[28px]"} data-name="Size=28, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[19.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
            <path d={svgPaths.p1ebd8b80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[28px]"} data-name="Size=28, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p1a35ec80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Size=24, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[15.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5 15.5">
            <path d={svgPaths.p7a03a80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Size=24, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p4abf480} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p301c8b00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 12.5">
            <path d={svgPaths.p162d1c00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "16" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[16px]"} data-name="Size=16, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[11px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
            <path d={svgPaths.pd515600} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[16px]"} data-name="Size=16, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[11.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 11.5">
            <path d={svgPaths.pc818090} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "12" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[12px]"} data-name="Size=12, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.5 8.5">
            <path d={svgPaths.pbfe8d80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[32px]"} data-name="Size=32, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[23.997px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9973 23.9972">
            <path d={svgPaths.p2f917800} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[32px]"} data-name="Size=32, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24.497px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.4974 24.4972">
            <path d={svgPaths.p1630a300} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[48px]"} data-name="Size=48, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[36px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.9996 35.9997">
            <path d={svgPaths.p1ab36280} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[48px]"} data-name="Size=48, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[35.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.4995 35.4997">
            <path d={svgPaths.p20572740} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "32" && theme === "Light") {
    return (
      <div className={className || "relative size-[32px]"} data-name="Size=32, Theme=Light">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d={svgPaths.p18eb2000} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[12px]"} data-name="Size=12, Theme=Regular">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2" data-name="Shape">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path d={svgPaths.p3cfa52f0} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

function Horizontal({ className }: { className?: string }) {
  return (
    <div className={className || "relative w-[323px]"} data-name="horizontal">
      <div className="content-stretch flex flex-col items-start relative w-full">
        <div className="bg-[#e6e6e6] h-[8px] shrink-0 w-full" />
      </div>
    </div>
  );
}
type WorkoutCellsProps = {
  className?: string;
  property1?: "Complete double" | "Complete single" | "Empty double" | "Empty single";
  selected?: boolean;
};

function WorkoutCells({ className, property1 = "Empty single", selected = false }: WorkoutCellsProps) {
  const isEmptyDoubleAndNotSelected = property1 === "Empty double" && !selected;
  const isEmptyDoubleAndSelected = property1 === "Empty double" && selected;
  const isSelectedAndIsCompleteDoubleOrCompleteSingleOrEmptyDoubleOr = selected && ["Complete double", "Complete single", "Empty double", "Empty single"].includes(property1);
  const isSelectedAndIsEmptyDoubleOrEmptySingle = selected && ["Empty double", "Empty single"].includes(property1);
  return (
    <div className={className || "bg-white min-h-[56px] min-w-[150px] relative"}>
      <div aria-hidden={isSelectedAndIsCompleteDoubleOrCompleteSingleOrEmptyDoubleOr ? "true" : undefined} className={isSelectedAndIsCompleteDoubleOrCompleteSingleOrEmptyDoubleOr ? "absolute border-2 border-[#9e9e9e] border-solid inset-0 pointer-events-none" : "flex flex-row items-center justify-center min-h-[inherit] min-w-[inherit] size-full"}>
        {!selected && ["Complete double", "Complete single", "Empty double", "Empty single"].includes(property1) && (
          <div className={`content-stretch flex items-center justify-center min-h-[inherit] min-w-[inherit] p-[10px] relative ${!selected && ["Complete single", "Empty single"].includes(property1) ? "" : "gap-[16px]"}`}>
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]">
              <div className={`flex flex-col font-["Inter:Bold",sans-serif] justify-center leading-[0] not-italic relative shrink-0 whitespace-nowrap ${!selected && ["Empty double", "Empty single"].includes(property1) ? "text-[#afafaf] text-[12px]" : "text-[20px] text-black"}`}>
                <p className="leading-[normal]">{isEmptyDoubleAndNotSelected ? "R" : !selected && ["Complete double", "Complete single"].includes(property1) ? "8" : "R"}</p>
              </div>
            </div>
            {!selected && ["Complete double", "Empty double"].includes(property1) && (
              <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]">
                <div className={`flex flex-col font-["Inter:Bold",sans-serif] justify-center leading-[0] not-italic relative shrink-0 whitespace-nowrap ${isEmptyDoubleAndNotSelected ? "text-[#afafaf] text-[12px]" : "text-[20px] text-black"}`}>
                  <p className="leading-[normal]">{isEmptyDoubleAndNotSelected ? "W" : property1 === "Complete double" && !selected ? "30" : ""}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isSelectedAndIsCompleteDoubleOrCompleteSingleOrEmptyDoubleOr && (
        <div className="flex flex-row items-center justify-center min-h-[inherit] min-w-[inherit] size-full">
          <div className={`content-stretch flex items-center justify-center min-h-[inherit] min-w-[inherit] p-[10px] relative ${selected && ["Complete single", "Empty single"].includes(property1) ? "" : "gap-[16px]"}`}>
            <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]">
              <div className={`flex flex-col font-["Inter:Bold",sans-serif] justify-center leading-[0] not-italic relative shrink-0 whitespace-nowrap ${isSelectedAndIsEmptyDoubleOrEmptySingle ? "text-[#afafaf] text-[12px]" : "text-[20px] text-black"}`}>
                <p className="leading-[normal]">{isSelectedAndIsEmptyDoubleOrEmptySingle ? "R" : selected && ["Complete double", "Complete single"].includes(property1) ? "8" : ""}</p>
              </div>
            </div>
            {selected && ["Complete double", "Empty double"].includes(property1) && (
              <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]">
                <div className={`flex flex-col font-["Inter:Bold",sans-serif] justify-center leading-[0] not-italic relative shrink-0 whitespace-nowrap ${isEmptyDoubleAndSelected ? "text-[#afafaf] text-[12px]" : "text-[20px] text-black"}`}>
                  <p className="leading-[normal]">{isEmptyDoubleAndSelected ? "W" : property1 === "Complete double" && selected ? "30" : ""}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Vertical({ className }: { className?: string }) {
  return (
    <div className={className || "h-[56px] relative w-px"} data-name="vertical">
      <div className="absolute bg-[#c2c2c2] h-[56px] left-0 top-0 w-px" />
    </div>
  );
}
type TabsProps = {
  className?: string;
  property1?: boolean;
};

function Tabs({ className, property1 = true }: TabsProps) {
  const isNotProperty1 = !property1;
  const isProperty1 = property1;
  return (
    <div className={className || `relative ${isNotProperty1 ? "min-h-[24px]" : "w-[127px]"}`}>
      <div className={`flex ${isNotProperty1 ? "flex-row items-center justify-center min-h-[inherit] size-full" : "content-stretch flex-col items-start relative w-full"}`}>
        <div className={`content-stretch flex items-center justify-center relative ${isNotProperty1 ? "min-h-[inherit]" : "shrink-0 w-full"}`}>
          {isProperty1 && <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[20px] text-black whitespace-pre-wrap">{`Chest & Back`}</p>}
          {isNotProperty1 && (
            <div className="flex flex-col font-['Inter:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black whitespace-nowrap">
              <p className="leading-[normal]">{`Shoulders & Arms`}</p>
            </div>
          )}
        </div>
        {isProperty1 && (
          <div className="relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start px-[16px] py-[10px] relative w-full">
              <div className="bg-[#006aff] h-[2px] shrink-0 w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MacBookAir() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start px-[64px] py-[32px] relative size-full" data-name="MacBook Air - 3">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#ededed] inset-0" />
        <img alt="" className="absolute max-w-none object-cover opacity-20 size-full" src={imgMacBookAir3} />
      </div>
      <div className="content-stretch flex gap-[29px] items-start relative shrink-0">
        <Tabs className="relative shrink-0 w-[127px]" />
        <Tabs className="min-h-[24px] relative shrink-0" property1={false} />
        <Frame1010106856Tabs>{`Chest, Shoulders, & Triceps`}</Frame1010106856Tabs>
        <Frame1010106856Tabs>{`Shoulders & Arms`}</Frame1010106856Tabs>
        <Frame1010106856Tabs>{`Legs & Back`}</Frame1010106856Tabs>
      </div>
      <div className="content-stretch flex gap-[73px] items-start relative shrink-0 w-full">
        <div className="bg-[#e6e6e6] content-stretch flex gap-[4px] items-start relative shrink-0">
          <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-[150px]" data-name="Lift">
            <Text text="LIFT" />
            <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full">
              <Text1 text="Standard Pushup" />
              <Text1 text="Wide Pullup" />
              <Text1 text="Military Pushup" />
              <Text1 text="Reverse Pullup" />
              <Horizontal className="relative shrink-0 w-full" />
              <Text1 text="Wide-Fly Pushup" />
              <Text1 text="Overhand Pullup" />
              <Text1 text="Decline Pushup" />
              <Text1 text="Heavy Pants" />
              <Horizontal className="relative shrink-0 w-full" />
              <Text1 text="Diamond Pushup" />
              <Text1 text="Lawnmower" />
              <Text1 text="Dive-bomber" />
              <Text1 text="Back Fly" />
              <Horizontal className="relative shrink-0 w-full" />
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
            <div className="content-stretch flex flex-col gap-px items-start relative shrink-0" data-name="Previous">
              <Text text="PREVIOUS" />
              <div className="content-stretch flex flex-col gap-px items-start relative shrink-0">
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
              </div>
              <Horizontal className="relative shrink-0 w-full" />
              <div className="content-stretch flex flex-col gap-px items-start relative shrink-0">
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper1 />
                </div>
              </div>
              <Horizontal className="relative shrink-0 w-full" />
              <div className="content-stretch flex flex-col gap-px items-start relative shrink-0">
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper1 />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper />
                </div>
                <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                  <Helper1 />
                </div>
              </div>
              <Horizontal className="relative shrink-0 w-full" />
            </div>
            <div className="content-stretch flex flex-col gap-px items-start relative shrink-0" data-name="New">
              <Text text="NEW" />
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <div className="content-stretch flex items-center relative shrink-0 w-full">
                  <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" property1="Complete double" selected />
                  <Vertical className="h-[56px] relative shrink-0 w-px" />
                  <WorkoutCells className="bg-white min-h-[56px] min-w-[150px] relative shrink-0" />
                </div>
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper2 />
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper2 />
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper2 />
              </div>
              <Horizontal className="relative shrink-0 w-full" />
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper2 />
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper2 />
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper2 />
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper3 />
              </div>
              <Horizontal className="relative shrink-0 w-full" />
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper2 />
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper3 />
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper2 />
              </div>
              <div className="bg-[#e6e6e6] content-stretch flex flex-col items-start relative shrink-0">
                <Helper3 />
              </div>
              <Horizontal className="relative shrink-0 w-full" />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <Text2 text="1" />
            <Text2 text="2" />
            <Text2 text="3" />
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <Text2 text="4" />
            <Text2 text="5" />
            <Text2 text="6" />
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <Text2 text="7" />
            <Text2 text="8" />
            <Text2 text="9" />
          </div>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
            <div className="bg-[#d7d7d7] content-stretch flex flex-col items-center justify-center px-[50px] py-[40px] relative rounded-[16px] shrink-0 size-[128px]">
              <Dismiss className="overflow-clip relative shrink-0 size-[48px]" size="48" />
            </div>
            <Text2 text="0" />
            <div className="bg-[#d7d7d7] content-stretch flex flex-col items-center justify-center px-[50px] py-[40px] relative rounded-[16px] shrink-0 size-[128px]">
              <ArrowRight className="overflow-clip relative shrink-0 size-[48px]" size="48" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[24px] left-[39px] top-[103px] w-[150px]" />
    </div>
  );
}