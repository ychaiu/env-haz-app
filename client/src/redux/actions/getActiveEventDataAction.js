export const getActiveEventDataAction = (activeEvent) => dispatch => {
    dispatch ({
        type: 'GET_ACTIVE_EVENT_DATA_ACTION',
        payload: activeEvent
    })
}

