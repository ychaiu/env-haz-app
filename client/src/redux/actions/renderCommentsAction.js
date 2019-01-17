export const renderCommentsAction = (stateComment) => dispatch => {
    dispatch ({
        type: 'RENDER_COMMENTS_ACTION',
        payload: stateComment
    })
}