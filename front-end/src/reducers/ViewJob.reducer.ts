import { IJobViewState } from ".";
import { jobTypes } from "../actions/JobView.action";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { Job } from "../models/Job";
import { Status } from "../models/Status";
 
const initialState: IJobViewState = {
    job : new Job({
        jobId: 0, 
        userCreated: new User({userId:0, userName:"", firstName:"", lastName:"", email:"", phone:"", rating:"", token:""}),
        address: "",
        dropoffAddress:"",
        description: "",
        dateCreated: "",
        dateAccepted: "",
        jobDateTime: "",
        userAccepted: new User({userId:0, userName:"", firstName:"", lastName:"", email:"", phone:"", rating:"", token:""}),
        jobPrice : "",
        category: new Category({categoryId: 0, name: '', description: ''}),
        timeEstimate: "",
        product: new Product({description:0, itemName:"", category: new Category({categoryId: 0, name: '', description: ''}),imageUrl:"",price:""}),
        status: new Status({statusId:0, Status:""}) 
    })
}; 

 
export const viewJobReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case jobTypes.JOB_UPDATE:
            return {
                ...state,
                job: action.payload.job
            }
        default: break;
    }
    return state;
}