export default (state={}, action) => {
    switch (action.type) {
        case 'NEW_MARKER_REFRESH_ACTION':
            return {
                markers: action.payload
            }
        case 'NEW_MARKER_POST_ACTION':
            return {
                markers: [...state.markers, action.payload]
            }
        case 'GET_ACTIVE_EVENT_DATA_ACTION':
            // shallow copy (vs deep copy!! need lodash for that. what was happening was that I was replacing the entire state)
            let newState = Object.assign({}, state)
            newState.activeEvent = action.payload
            return newState
        default:
            return state
    }
}