export const page_state = { page: 1, min: 1, max: 2, data: {}, status: null }
export function pageReducer(state, action){
    switch(action.type){
        case "next":
            return { page: 2, min: state.min, max: state.max, data: action.data, status: state.status }
        case "prev":
            return { page: 1, min: state.min, max: state.max, data: {}, status: state.status}
        case "waiting":
            return { page: state.page, min: state.min, max: state.max, data: state.data, status: "waiting for deposit"}
    }
}

