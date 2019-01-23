export const commentState = (state) => dispatch => {
    dispatch ({
        type: 'COMMENT_STATE',
        payload: state
    })
}