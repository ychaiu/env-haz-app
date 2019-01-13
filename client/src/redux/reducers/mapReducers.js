export default (state={}, action) => {
    console.log(action);
    switch (action.type) {
        case 'NEW_MARKER_REFRESH_ACTION':
            return {
                markers: action.payload
            }
        case 'NEW_MARKER_POST_ACTION':
            return {
                markers: [...state.markers, action.payload]
            }
        default:
            return state

    }
}