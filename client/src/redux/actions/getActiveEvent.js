export const getActiveEvent = (activeEvent) => dispatch => {
    dispatch ({
        type: 'GET_ACTIVE_EVENT',
        payload: activeEvent
    })
}

