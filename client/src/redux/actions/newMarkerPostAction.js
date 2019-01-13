export const newMarkerPostAction = (newMarker) => dispatch => {
    dispatch ({
        type: 'NEW_MARKER_POST_ACTION',
        payload: newMarker
    })
}