export const MY_JOBS_REFRESH = 'MY_JOBS_REFRESH';
export const NEW_JOBS_POPULATE = 'NEW_JOBS_POPULATE';
export const NEW_JOBS_RESET = 'NEW_JOBS_RESET';
export const MY_JOBS_DONE_REFRESH = 'MY_JOBS_DONE_REFRESH';
export function myJobsRefresh() {
    return { type: MY_JOBS_REFRESH }
}
export function myJobsDoneRefresh() {
    return { type: MY_JOBS_DONE_REFRESH }
}
export function newJobsReset() {
return { type: NEW_JOBS_RESET }
}

export const newJobsPopulate = (name: string, value: any) => (dispatch: any) => {
    dispatch({
        payload: {name,value},
        type: NEW_JOBS_POPULATE,
    })
}