export default (state={}, action) => {
    switch (action.type) {
        case 'RENDER_COMMENTS_ACTION':
            return {
                comments: action.payload
            }
        case 'CHANGE_COMMENT_STATE_ACTION':
            return {
                isCommentOpen: action.payload
            }
        default:
            return state

    }
}
