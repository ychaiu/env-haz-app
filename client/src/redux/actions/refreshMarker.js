export const refreshMarker = (markers) => dispatch => {
    dispatch ({
        type: 'REFRESH_MARKER',
        payload: markers
    })
}