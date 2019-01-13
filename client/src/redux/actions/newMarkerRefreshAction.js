export const newMarkerRefreshAction = (markers) => dispatch => {
    dispatch ({
        type: 'NEW_MARKER_REFRESH_ACTION',
        payload: markers
    })
}