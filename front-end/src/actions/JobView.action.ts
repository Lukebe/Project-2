import { Job } from "../models/Job";

// Definition of actions as constants
export const jobTypes = {
    JOB_UPDATE: 'JOB_UPDATE'
};


export const updateJob = (job: Job) => (dispatch: any) => {
    dispatch({
        payload: {job},
        type: jobTypes.JOB_UPDATE
    })
} 