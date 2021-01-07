const initialState = { favRestaurantsID: [] }

function favLocations(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'SAVE_LOCATION':
            nextState = {
                ...state,
                favLocationsID: [...state.favLocationsID, action.value]
            };
            return nextState || state
        case 'UNSAVE_LOCATION':
            nextState = {
                ...state,
                favLocationsID: state.favLocationsID.filter(id => id !== action.value)
            };
            return nextState || state
        default:
            return state
    }
}

export default favLocations;