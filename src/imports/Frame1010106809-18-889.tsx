import clsx from "clsx";
import svgPaths from "./svg-o46z7tgtvx";

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        {children}
      </svg>
    </div>
  );
}

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
    <div className={clsx("bg-[#d7d7d7] flex-[1_0_0] max-h-[90px] min-h-px min-w-px relative", additionalClassNames)}>
      <div className="flex flex-col items-center justify-center max-h-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center max-h-[inherit] px-[50px] py-[40px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="bg-white relative shrink-0 size-[90px]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[50px] py-[40px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[30px] text-black">{text}</p>
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

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
        <Text text="1" />
        <Text text="2" />
        <Text text="3" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
        <Text text="4" />
        <Text text="5" />
        <Text text="6" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
        <Text text="7" />
        <Text text="8" />
        <Text text="9" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
        <Text text="0" />
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
          <Wrapper additionalClassNames="h-full">
            <Wrapper1>
              <path d={svgPaths.pf360400} fill="var(--fill-0, #242424)" id="Shape" />
            </Wrapper1>
          </Wrapper>
        </div>
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
          <Wrapper additionalClassNames="h-full">
            <Wrapper1>
              <g id="Slash Forward">
                <path d={svgPaths.p38b65700} fill="var(--fill-0, #242424)" id="Shape" />
              </g>
            </Wrapper1>
          </Wrapper>
        </div>
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
          <Wrapper additionalClassNames="h-full">
            <Wrapper2>
              <g id="Add">
                <path d={svgPaths.p2def5e00} fill="var(--fill-0, #242424)" id="Shape" />
              </g>
            </Wrapper2>
          </Wrapper>
        </div>
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
          <Wrapper additionalClassNames="h-full">
            <Wrapper2>
              <g id="Subtract">
                <path d={svgPaths.p239900} fill="var(--fill-0, #242424)" id="Shape" />
              </g>
            </Wrapper2>
          </Wrapper>
        </div>
      </div>
      <div className="content-stretch flex items-center relative shrink-0 w-full">
        <Wrapper additionalClassNames="h-[90px]">
          <ArrowRight className="overflow-clip relative shrink-0 size-[48px]" size="48" />
        </Wrapper>
      </div>
    </div>
  );
}