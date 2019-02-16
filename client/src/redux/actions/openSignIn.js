export const openSignIn = (state) => dispatch => {
    dispatch ({
        type: 'OPEN_SIGN_IN',
        payload: state
    })
}