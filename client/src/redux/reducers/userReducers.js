export default (state={}, action) => {
    let newState = Object.assign({}, state)
    switch (action.type) {
        case 'OPEN_SIGN_IN':
            newState.openSignIn = action.payload
            return newState
        case 'OPEN_SIGN_UP':
            newState.openSignUp = action.payload
            return newState
        default:
            return state
    }
}