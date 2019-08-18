import { IJobViewState } from ".";
import { jobTypes } from "../actions/JobView.action";
 
const initialState: IJobViewState = {
    jobId:"5"
};
 
export const viewJobReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case jobTypes.JOB_UPDATE:
            return {
                ...state,
                jobId: action.payload.id
            }
        default: break;
    }
    return state;
}