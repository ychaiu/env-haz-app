export const openSignUp = (state) => dispatch => {
    dispatch ({
        type: 'OPEN_SIGN_UP',
        payload: state
    })
}