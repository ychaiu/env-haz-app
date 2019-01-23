export const addComment = (newComment) => dispatch => {
    dispatch ({
        type: 'ADD_COMMENT',
        payload: newComment
    })
}