
export const SliderInput = ({ ratio, effect }) => {
    return (
        <input type="range" className="slider w-[15rem]" id="range_select" name="ratio" min="0" max="100" step="1" value={ratio} onChange={effect}/>
        )
}