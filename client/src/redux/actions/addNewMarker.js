export const addNewMarker = (newMarker) => dispatch => {
    dispatch ({
        type: 'ADD_NEW_MARKER',
        payload: newMarker
    })
}