export const renderCommentsAction = (comments) => dispatch => {
    dispatch ({
        type: 'RENDER_COMMENTS_ACTION',
        payload: comments
    })
}