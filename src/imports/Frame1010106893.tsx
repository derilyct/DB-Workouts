import svgPaths from "./svg-8ibnzagso3";

function OptionsShape4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[21px] left-1/2 top-1/2 w-[24px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 21">
        {children}
      </svg>
    </div>
  );
}

function OptionsShape3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[25px] left-1/2 top-1/2 w-[28px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 25">
        {children}
      </svg>
    </div>
  );
}

function OptionsShape2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[36px] left-1/2 top-1/2 w-[40px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 36">
        {children}
      </svg>
    </div>
  );
}

function OptionsShape1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[11px] left-1/2 top-1/2 w-[12px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
        {children}
      </svg>
    </div>
  );
}

function OptionsShape({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18px] left-1/2 top-1/2 w-[20px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
        {children}
      </svg>
    </div>
  );
}

function AddShape({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[26px] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        {children}
      </svg>
    </div>
  );
}

function Shape4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        {children}
      </svg>
    </div>
  );
}

function Shape3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8.5px] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.5 8.5">
        {children}
      </svg>
    </div>
  );
}

function Shape2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12.5px] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 12.5">
        {children}
      </svg>
    </div>
  );
}

function Shape1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </div>
  );
}

function Shape({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[15.5px] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5 15.5">
        {children}
      </svg>
    </div>
  );
}
type DocumentPageBreakProps = {
  className?: string;
  size?: "20" | "24";
  theme?: "Regular" | "Filled";
};

function DocumentPageBreak({ className, size = "24", theme = "Regular" }: DocumentPageBreakProps) {
  const is20AndIsRegularOrFilled = size === "20" && ["Regular", "Filled"].includes(theme);
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is20AndIsRegularOrFilled ? "size-[20px]" : "size-[24px]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${is20AndIsRegularOrFilled ? "h-[16px] w-[15px]" : "h-[20px] w-[19px]"}`} data-name="Shape">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={is20AndIsRegularOrFilled ? "0 0 15 16.0002" : "0 0 19 20"}>
          <path d={size === "20" && theme === "Filled" ? svgPaths.p1e914300 : size === "20" && theme === "Regular" ? svgPaths.p15067e80 : size === "24" && theme === "Filled" ? svgPaths.p1d9f8e10 : svgPaths.p30d25700} fill="var(--fill-0, #242424)" id="Shape" />
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
        <Shape>
          <path d={svgPaths.p7a03a80} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape>
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
        <Shape1>
          <path d={svgPaths.p301c8b00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape1>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Filled">
        <Shape2>
          <path d={svgPaths.p162d1c00} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape2>
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
        <Shape3>
          <path d={svgPaths.pbfe8d80} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape3>
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
      <Shape4>
        <path d={svgPaths.p3cfa52f0} fill="var(--fill-0, #242424)" id="Shape" />
      </Shape4>
    </div>
  );
}
type AddProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled" | "Light";
};

function Add({ className, size = "28", theme = "Regular" }: AddProps) {
  if (size === "28" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[28px]"} data-name="Size=28, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[21.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
            <path d={svgPaths.p39ba4780} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[28px]"} data-name="Size=28, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[22px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p17bb2880} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Size=24, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[17.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
            <path d={svgPaths.p2967cd00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Size=24, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.p21d4cf00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[15px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <path d={svgPaths.p38be5300} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Filled">
        <Shape>
          <path d={svgPaths.pfb9b280} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape>
      </div>
    );
  }
  if (size === "16" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[16px]"} data-name="Size=16, Theme=Regular">
        <Shape1>
          <path d={svgPaths.p28b2ea80} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape1>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[16px]"} data-name="Size=16, Theme=Filled">
        <Shape2>
          <path d={svgPaths.p38d67000} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape2>
      </div>
    );
  }
  if (size === "12" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[12px]"} data-name="Size=12, Theme=Filled">
        <Shape3>
          <path d={svgPaths.p21fab900} fill="var(--fill-0, #242424)" id="Shape" />
        </Shape3>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[32px]"} data-name="Size=32, Theme=Regular">
        <AddShape>
          <path d={svgPaths.p2456f780} fill="var(--fill-0, #242424)" id="Shape" />
        </AddShape>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[32px]"} data-name="Size=32, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[26.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.5 26.5">
            <path d={svgPaths.p15e3e200} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[48px]"} data-name="Size=48, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[37.5px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.5 37.5">
            <path d={svgPaths.p3019ad00} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[48px]"} data-name="Size=48, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[38px] top-1/2" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
            <path d={svgPaths.p1e790680} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "32" && theme === "Light") {
    return (
      <div className={className || "relative size-[32px]"} data-name="Size=32, Theme=Light">
        <AddShape>
          <path d={svgPaths.p331ba280} fill="var(--fill-0, #242424)" id="Shape" />
        </AddShape>
      </div>
    );
  }
  return (
    <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[12px]"} data-name="Size=12, Theme=Regular">
      <Shape4>
        <path d={svgPaths.pdccda00} fill="var(--fill-0, #242424)" id="Shape" />
      </Shape4>
    </div>
  );
}
type OptionsProps = {
  className?: string;
  size?: "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled" | "Light";
};

function Options({ className, size = "16", theme = "Regular" }: OptionsProps) {
  if (size === "24" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Size=24, Theme=Regular">
        <OptionsShape>
          <path d={svgPaths.p1f54bf00} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape>
      </div>
    );
  }
  if (size === "24" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Size=24, Theme=Filled">
        <OptionsShape>
          <path d={svgPaths.p31b8b200} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape>
      </div>
    );
  }
  if (size === "20" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14px] left-1/2 top-1/2 w-[16px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
            <path d={svgPaths.p3b320500} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Size=20, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13.5px] left-1/2 top-1/2 w-[16px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 13.5">
            <path d={svgPaths.p2ae46100} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (size === "16" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[16px]"} data-name="Size=16, Theme=Filled">
        <OptionsShape1>
          <path d={svgPaths.p4733b00} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape1>
      </div>
    );
  }
  if (size === "48" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[48px]"} data-name="Size=48, Theme=Filled">
        <OptionsShape2>
          <path d={svgPaths.p33cada00} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape2>
      </div>
    );
  }
  if (size === "48" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[48px]"} data-name="Size=48, Theme=Regular">
        <OptionsShape2>
          <path d={svgPaths.p12a1d00} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape2>
      </div>
    );
  }
  if (size === "32" && theme === "Regular") {
    return (
      <div className={className || "relative size-[32px]"} data-name="Size=32, Theme=Regular">
        <OptionsShape3>
          <path d={svgPaths.p2a887600} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape3>
      </div>
    );
  }
  if (size === "32" && theme === "Filled") {
    return (
      <div className={className || "relative size-[32px]"} data-name="Size=32, Theme=Filled">
        <OptionsShape3>
          <path d={svgPaths.p33c7800} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape3>
      </div>
    );
  }
  if (size === "28" && theme === "Regular") {
    return (
      <div className={className || "relative size-[28px]"} data-name="Size=28, Theme=Regular">
        <OptionsShape4>
          <path d={svgPaths.p2cc0d500} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape4>
      </div>
    );
  }
  if (size === "28" && theme === "Filled") {
    return (
      <div className={className || "relative size-[28px]"} data-name="Size=28, Theme=Filled">
        <OptionsShape4>
          <path d={svgPaths.p31b3b00} fill="var(--fill-0, #242424)" id="Shape" />
        </OptionsShape4>
      </div>
    );
  }
  if (size === "32" && theme === "Light") {
    return (
      <div className={className || "relative size-[32px]"} data-name="Size=32, Theme=Light">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[24px] left-1/2 top-1/2 w-[28px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 24">
            <path d={svgPaths.p2e7376c0} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[16px]"} data-name="Size=16, Theme=Regular">
      <OptionsShape1>
        <path d={svgPaths.p34015100} fill="var(--fill-0, #242424)" id="Shape" />
      </OptionsShape1>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative size-full">
      <div className="content-stretch flex h-[20px] items-center relative shrink-0">
        <div className="content-stretch flex items-center justify-center p-[8px] relative shrink-0 size-[20px]" data-name="Options">
          <Options className="overflow-clip relative shrink-0 size-[20px]" size="20" />
        </div>
      </div>
      <div className="bg-white content-stretch flex flex-col items-center justify-center p-[16px] relative shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] shrink-0" data-name="Options popup">
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
          <div className="content-stretch flex items-center p-[8px] relative shrink-0">
            <Add className="overflow-clip relative shrink-0 size-[20px]" size="20" />
          </div>
          <div className="content-stretch flex items-center p-[8px] relative shrink-0">
            <Dismiss className="overflow-clip relative shrink-0 size-[20px]" size="20" />
          </div>
          <div className="content-stretch flex items-center p-[8px] relative shrink-0">
            <DocumentPageBreak className="overflow-clip relative shrink-0 size-[20px]" size="20" />
          </div>
        </div>
      </div>
    </div>
  );
}