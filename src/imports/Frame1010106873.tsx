import svgPaths from "./svg-rmxktoe2sw";

function EraserShape6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[17px] top-[calc(50%+0.5px)]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        {children}
      </svg>
    </div>
  );
}

function EraserShape5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[17px] left-1/2 top-[calc(50%+0.5px)] w-[16.002px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0023 17">
        {children}
      </svg>
    </div>
  );
}

function EraserShape4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16.004px] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0037 16.0037">
        {children}
      </svg>
    </div>
  );
}

function EraserShape3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16.002px] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0023 16.0023">
        {children}
      </svg>
    </div>
  );
}

function EraserShape2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18.995px] top-[calc(50%-0.49px)]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9948 18.9948">
        {children}
      </svg>
    </div>
  );
}

function EraserShape1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[20.763px] left-[calc(50%-0.11px)] top-[calc(50%+0.37px)] w-[19.008px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0085 20.7632">
        {children}
      </svg>
    </div>
  );
}

function EraserShape({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19.016px] left-[calc(50%-0.11px)] top-[calc(50%-0.51px)] w-[19.008px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0085 19.016">
        {children}
      </svg>
    </div>
  );
}
type EraserProps = {
  className?: string;
  modifier?: "Default" | "Medium" | "Small" | "Segment";
  size?: "20" | "24";
  theme?: "Regular" | "Filled";
};

function Eraser({ className, modifier = "Small", size = "24", theme = "Regular" }: EraserProps) {
  if (modifier === "Small" && size === "24" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Modifier=Small, Size=24, Theme=Filled">
        <EraserShape>
          <path d={svgPaths.p1c6f3500} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape>
      </div>
    );
  }
  if (modifier === "Segment" && size === "24" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Modifier=Segment, Size=24, Theme=Regular">
        <EraserShape1>
          <path d={svgPaths.p3ce88900} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape1>
      </div>
    );
  }
  if (modifier === "Segment" && size === "24" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Modifier=Segment, Size=24, Theme=Filled">
        <EraserShape1>
          <path d={svgPaths.p17812540} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape1>
      </div>
    );
  }
  if (modifier === "Medium" && size === "24" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Modifier=Medium, Size=24, Theme=Regular">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[21.013px] left-[calc(50%+0.69px)] top-[calc(50%+0.49px)] w-[20.614px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.614 21.0132">
            <g id="Shape">
              <path d={svgPaths.pef55e00} fill="var(--fill-0, #242424)" />
              <path d={svgPaths.p2d5d1100} fill="var(--fill-0, #242424)" />
              <path d={svgPaths.p2813ed00} fill="var(--fill-0, #242424)" />
            </g>
          </svg>
        </div>
      </div>
    );
  }
  if (modifier === "Medium" && size === "24" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Modifier=Medium, Size=24, Theme=Filled">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[21.013px] left-[calc(50%+0.69px)] top-[calc(50%+0.49px)] w-[20.614px]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6138 21.0132">
            <path d={svgPaths.p102b3b80} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    );
  }
  if (modifier === "Default" && size === "24" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Modifier=Default, Size=24, Theme=Regular">
        <EraserShape2>
          <path d={svgPaths.p2ec058c0} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape2>
      </div>
    );
  }
  if (modifier === "Default" && size === "24" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Modifier=Default, Size=24, Theme=Filled">
        <EraserShape2>
          <path d={svgPaths.peca4100} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape2>
      </div>
    );
  }
  if (modifier === "Default" && size === "20" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Modifier=Default, Size=20, Theme=Regular">
        <EraserShape3>
          <path d={svgPaths.p19347600} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape3>
      </div>
    );
  }
  if (modifier === "Default" && size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Modifier=Default, Size=20, Theme=Filled">
        <EraserShape3>
          <path d={svgPaths.p14b35900} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape3>
      </div>
    );
  }
  if (modifier === "Small" && size === "20" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Modifier=Small, Size=20, Theme=Regular">
        <EraserShape4>
          <path d={svgPaths.p3d3e0400} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape4>
      </div>
    );
  }
  if (modifier === "Small" && size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Modifier=Small, Size=20, Theme=Filled">
        <EraserShape4>
          <path d={svgPaths.p168ed900} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape4>
      </div>
    );
  }
  if (modifier === "Segment" && size === "20" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Modifier=Segment, Size=20, Theme=Regular">
        <EraserShape5>
          <path d={svgPaths.p11cc6a80} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape5>
      </div>
    );
  }
  if (modifier === "Segment" && size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Modifier=Segment, Size=20, Theme=Filled">
        <EraserShape5>
          <path d={svgPaths.p3618c880} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape5>
      </div>
    );
  }
  if (modifier === "Medium" && size === "20" && theme === "Regular") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Modifier=Medium, Size=20, Theme=Regular">
        <EraserShape6>
          <path d={svgPaths.p1e547000} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape6>
      </div>
    );
  }
  if (modifier === "Medium" && size === "20" && theme === "Filled") {
    return (
      <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[20px]"} data-name="Modifier=Medium, Size=20, Theme=Filled">
        <EraserShape6>
          <path d={svgPaths.p23628fc0} fill="var(--fill-0, #242424)" id="Shape" />
        </EraserShape6>
      </div>
    );
  }
  return (
    <div className={className || "-translate-x-1/2 -translate-y-1/2 relative size-[24px]"} data-name="Modifier=Small, Size=24, Theme=Regular">
      <EraserShape>
        <path d={svgPaths.p2d0aca40} fill="var(--fill-0, #242424)" id="Shape" />
      </EraserShape>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center p-[8px] relative size-full">
      <Eraser className="overflow-clip relative shrink-0 size-[20px]" modifier="Default" size="20" />
    </div>
  );
}