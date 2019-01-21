export default (state={}, action) => {
    switch (action.type) {
        case 'RENDER_COMMENTS_ACTION':
            return {
                comments: action.payload
            }
        default:
            return state

    }
}
