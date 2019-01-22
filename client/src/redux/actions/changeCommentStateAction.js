export const changeCommentStateAction = (state) => dispatch => {
    dispatch ({
        type: 'CHANGE_COMMENT_STATE_ACTION',
        payload: state
    })
}