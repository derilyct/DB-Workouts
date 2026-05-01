import svgPaths from "./svg-d410xzhft7";
type WorkoutCellsProps = {
  text: string;
};

function WorkoutCells({ children, text }: React.PropsWithChildren<WorkoutCellsProps>) {
  return (
    <div className="bg-white min-h-[56px] min-w-[150px] relative shrink-0">
      <div className="flex flex-row items-center justify-center min-h-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-h-[inherit] min-w-[inherit] p-[10px] relative">
          <div className="content-stretch flex items-center justify-center relative shrink-0 size-[36px]">
            <div className="flex flex-col font-['Inter:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#afafaf] text-[12px] whitespace-nowrap">
              <p className="leading-[normal]">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[34px] items-center justify-center p-[32px] relative shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] size-full">
      <div className="h-[30px] relative shrink-0 w-[188px]" data-name="logo">
        <div className="absolute left-0 size-[30px] top-0">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
            <g id="Frame 1010106891">
              <g id="Mask group">
                <mask height="30" id="mask0_43_70" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="30" x="0" y="0">
                  <circle cx="15" cy="15" fill="var(--fill-0, white)" id="Ellipse 5" r="14.5" stroke="var(--stroke-0, #060606)" />
                </mask>
                <g mask="url(#mask0_43_70)">
                  <path d={svgPaths.p11ca8200} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, #060606)" />
                </g>
              </g>
              <circle cx="15" cy="15" id="Ellipse 5_2" r="14.5" stroke="var(--stroke-0, black)" />
            </g>
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] justify-center leading-[0] left-[37px] not-italic text-[20px] text-black top-[15px] whitespace-nowrap">
          <p className="leading-[normal]">DB WORKOUTS</p>
        </div>
      </div>
      <div className="content-stretch flex items-start justify-center relative shrink-0">
        <div aria-hidden="true" className="absolute border border-[#c2c2c2] border-solid inset-[-1px] pointer-events-none" />
        <WorkoutCells text="Username" />
        <div className="h-[56px] relative shrink-0 w-px" data-name="vertical">
          <div className="absolute bg-[#c2c2c2] h-[56px] left-0 top-0 w-px" />
        </div>
        <WorkoutCells text="Password" />
      </div>
      <div className="content-stretch flex gap-[34px] items-start relative shrink-0">
        <div className="content-stretch flex items-center justify-center relative shrink-0">
          <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative shrink-0">
            <div className="flex flex-col font-['Inter:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#008ede] text-[20px] whitespace-nowrap">
              <p className="leading-[normal]">Create</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-center relative shrink-0">
          <div className="bg-[#008ede] content-stretch flex items-center justify-center px-[16px] py-[8px] relative shrink-0">
            <div className="flex flex-col font-['Inter:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">
              <p className="leading-[normal]">Sign in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}