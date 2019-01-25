export default (state={}, action) => {
    switch (action.type) {
        case 'RENDER_COMMENTS':
            return {
                comments: action.payload
            }
        case 'COMMENT_STATE':
        let newState = Object.assign({}, state)
        newState.isCommentOpen = action.payload
            return {
                newState
            }
        case 'ADD_COMMENT':
            return {
                comments: [...state.comments, action.payload]
            }
        default:
            return state

    }
}
