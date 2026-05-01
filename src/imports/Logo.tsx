import svgPaths from "./svg-b4ifa59xmh";

export default function Logo({ darkMode }: { darkMode?: boolean }) {
  const strokeColor = darkMode ? "white" : "black";
  const fillColor = darkMode ? "white" : "black";
  return (
    <div className="relative h-[30px] w-[180px] shrink-0" data-name="logo">
      <div className="absolute left-0 size-[30px] top-0">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
          <g id="Frame 1010106891">
            <g id="Mask group">
              <mask height="30" id="mask0_11_381" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="30" x="0" y="0">
                <circle cx="15" cy="15" fill="white" id="Ellipse 5" r="14.5" stroke={strokeColor} />
              </mask>
              <g mask="url(#mask0_11_381)">
                <path d={svgPaths.p11ca8200} fill={fillColor} id="Vector" stroke={strokeColor} />
              </g>
            </g>
            <circle cx="15" cy="15" id="Ellipse 5_2" r="14.5" stroke={strokeColor} />
          </g>
        </svg>
      </div>
      <div className={`-translate-y-1/2 absolute flex flex-col font-['Inter',sans-serif] justify-center leading-[0] left-[37px] not-italic text-[20px] top-[15px] whitespace-nowrap ${darkMode ? "text-white" : "text-black"}`} style={{ fontWeight: 700 }}>
        <p className="leading-[normal]">DB WORKOUTS</p>
      </div>
    </div>
  );
}