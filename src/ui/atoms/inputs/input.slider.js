
export const SliderInput = ({ state, action }) => {
    return (
       <input type="range" className="z-40 overflow-hidden form-range appearance-none h-1 focus:outline-none focus:ring-0 focus:shadow-none rounded-full bg-slate-400 w-[15rem]" id="range_select" name="ratio" min="0" max="100" step="1" value={state} onChange={action}/>          
    )
}