// Definition of actions as constants
export const jobTypes = {
    JOB_UPDATE: 'JOB_UPDATE'
};


export const updateJob = (id: any) => (dispatch: any) => {
    dispatch({
        payload: {
            id
        },
        type: jobTypes.JOB_UPDATE
    })
} 