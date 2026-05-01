import svgPaths from "./svg-6dxtbdxk2v";

function Options1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative shrink-0 size-[20px]" data-name="Options">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Options">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[14px] left-1/2 top-1/2 w-[16px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
            <path d={svgPaths.p3b320500} fill="var(--fill-0, #242424)" id="Shape" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Options() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="Options">
      <Options1 />
    </div>
  );
}