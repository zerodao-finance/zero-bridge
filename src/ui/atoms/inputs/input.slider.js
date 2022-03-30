
export const SliderInput = ({ ratio, effect }) => {
    return (
        <input type="range" className="z-40 overflow-hidden form-range cursor-pointer h-1 outline-none ring-0 shadow-none rounded-full bg-slate-400 w-[15rem]" id="range_select" name="ratio" min="0" max="100" step="1" value={ratio} onChange={effect}/>
        )
}