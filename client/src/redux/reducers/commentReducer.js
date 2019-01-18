export default (state=false, action) => {
    switch (action.type) {
        case 'RENDER_COMMENTS_ACTION':
            return {
                commentState: action.payload
            }
        default:
            return state

    }
}
