export const data_state = {
    value: 0,
    ratio: 0,
    ETH: 0, 
    renBTC: 0
}

export function dataReducer(state, action) {
    switch (action.type) {
        case 'changeValue':
            if (!isNaN(action.event.nativeEvent.data) || '.'){
                return (action.event.target.value == '' ?  {value: 0, ratio: state.ratio, ETH: state.ETH, renBTC: state.renBTC} : {value: action.event.target.value, ratio: state.ratio, ETH: state.ETH, renBTC: state.renBTC})
            }
            break
        case 'changeRatio':
            console.log(state.ratio)
            return {value: state.value, ratio: action.event.target.value, ETH: state.ETH, renBTC: state.renBTC}
            break
        case 'changeETH':
            return {value: state.value, ratio: state.ratio, ETH: action.value, renBTC: state.renBTC}
            break
        case 'changeRenBTC':
            return {value: state.value, ratio: state.ratio, ETH: state.ETH, renBTC: action.value}
        case 'reset':
            return initialState
        default:
		    return state;
    }
}