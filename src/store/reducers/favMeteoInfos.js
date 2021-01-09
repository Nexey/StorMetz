const initialState = { favMeteoInfoID: [] }

function favMeteoInfos(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'SAVE_OBJECT':
            nextState = {
                ...state,
                favMeteoInfoID: [...state.favMeteoInfoID, action.value]
            };
            return nextState || state
        case 'UNSAVE_OBJECT':
            nextState = {
                ...state,
                favMeteoInfoID: state.favMeteoInfoID.filter(id => id !== action.value)
            };
            return nextState || state
        default:
            return state
    }
}

export default favMeteoInfos;