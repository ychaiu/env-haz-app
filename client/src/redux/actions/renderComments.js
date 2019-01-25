export const renderComments = (comments) => dispatch => {
    dispatch ({
        type: 'RENDER_COMMENTS',
        payload: comments
    })
}