export default (state={}, action) => {
    switch (action.type) {
        case 'NEW_MARKER_REFRESH_ACTION':
            return {
                result: action.payload
            }
        default:
            return state
    }
}