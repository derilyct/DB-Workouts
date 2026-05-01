export default function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[34px] items-center justify-center p-[32px] relative shadow-[0px_2px_20px_0px_rgba(0,0,0,0.25)] size-full">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">
        <p className="leading-[normal]">Edit Workout Titles</p>
      </div>
      <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] gap-[34px] items-center justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">
        <div className="flex flex-col justify-center relative shrink-0">
          <p className="leading-[normal]">Tab 1</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0">
          <p className="leading-[normal]">Tab 2</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0">
          <p className="leading-[normal]">Tab 3</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0">
          <p className="leading-[normal]">Tab 4</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0">
          <p className="leading-[normal]">Tab 5</p>
        </div>
      </div>
      <div className="content-stretch flex gap-[34px] items-center justify-center relative shrink-0">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">
          <p className="leading-[normal]">Cancel</p>
        </div>
        <div className="bg-[#008ede] content-stretch flex items-center justify-center px-[16px] py-[8px] relative shrink-0">
          <div className="flex flex-col font-['Inter:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Save</p>
          </div>
        </div>
      </div>
    </div>
  );
}