export default (state={}, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case 'RENDER_COMMENTS':
            newState.comments = action.payload
            return newState 
        case 'COMMENT_STATE':
            newState.isCommentOpen = action.payload
            return newState 
        case 'ADD_COMMENT':
            newState.comments = [...state.comments, action.payload]
            return newState
        default:
            return state
    }
}
