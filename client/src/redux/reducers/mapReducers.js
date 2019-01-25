export default (state={}, action) => {
    switch (action.type) {
        case 'REFRESH_MARKER':
            return {
                markers: action.payload
            }
        case 'ADD_NEW_MARKER':
            return {
                markers: [...state.markers, action.payload]
            }
        case 'GET_ACTIVE_EVENT':
            // shallow copy vs deep copy!! need lodash for that. what was happening was that I was replacing the entire state)
            let newState = Object.assign({}, state)
            newState.activeEvent = action.payload
            return newState
        default:
            return state
    }
}