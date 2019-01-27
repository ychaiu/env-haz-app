export default (state={}, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case 'REFRESH_MARKER':
            newState.markers = action.payload
            return newState
        case 'ADD_NEW_MARKER':
            newState.markers = [...state.markers, action.payload]
            return newState
        case 'GET_ACTIVE_EVENT':
            newState.activeEvent = action.payload
            return newState
        default:
            return state
    }
}