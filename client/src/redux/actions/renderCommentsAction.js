export const renderCommentsAction = (commentState) => dispatch => {
    dispatch ({
        type: 'RENDER_COMMENTS_ACTION',
        payload: commentState
    })
}