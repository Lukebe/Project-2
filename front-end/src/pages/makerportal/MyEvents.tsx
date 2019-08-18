import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAuthState, IAppState, IMakerPortalState, IProductPickerState } from '../../reducers';
import './Maker.css';
import { loginSuccessful } from '../../actions/Authentication.action';
import * as APICall from '../../utils/APICall';
import { Job } from "../../models/Job";
import Pagination from '../../models/Pagination';
import { Alert, Card, Button, FormLabel, Form, Spinner } from "react-bootstrap";
import isMobile from "../../utils/IsMobile";
import { makerPortalReducer } from "../../reducers/MakerPortal.reducer";
import { myJobsDoneRefresh } from "../../actions/MakerPortal.action";
import JobDetailsModal from "../../components/JobDetailsModal";
const RequestState = APICall.RequestState;
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    makerPortal: IMakerPortalState,
    myJobsDoneRefresh: () => void;
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    isFetching : boolean;
    data : Job[];
    dataPagination: Pagination;
    RequestStatus: {
        status: APICall.RequestState,
        errorMsg: string,
    },
    jobDetailsModalIndex: number;
}
type IProps = IComponentProps & IAuthProps;
class MyEvents extends Component <IAuthProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            data: [],
            dataPagination: new Pagination({empty:true}),
            RequestStatus: {
                status: RequestState.NOT_ACTIVE,
                errorMsg: '',
            },
            jobDetailsModalIndex: -1,
        };
    }
    componentDidMount() {
        this.getMyJobs(0);
    }
    componentWillReceiveProps(props:any){
        if(props.makerPortal.needsRefresh !== this.props.makerPortal.needsRefresh){
            if(props.makerPortal.needsRefresh){
                this.getMyJobs(0); 
                this.props.myJobsDoneRefresh();
                console.log(this);
            }
        }
    }
    closeJobDetailsModal = () => {
        this.setState({...this.state, jobDetailsModalIndex: -1});
    }
    goBackClick = (e : any) => {
        e.preventDefault();
        if(!this.state.dataPagination.isFirstPage()){
            this.getMyJobs(this.state.dataPagination.getPageNumber() - 1)
        }
    }
    goForwardClick = (e : any) => {
        e.preventDefault();
        if(!this.state.dataPagination.isLastPage()){
            this.getMyJobs(this.state.dataPagination.getPageNumber() + 1)
        }
    }
    async setRating(rating : number, jobId: number) {
        this.setState({...this.state, RequestStatus: 
            {...this.state.RequestStatus, status: RequestState.FETCHING}});
        const response : any = await APICall.PATCH('/jobs', {jobId, rating}
            ,this.props.auth.userProfile.getToken());

        if(response instanceof Error){
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: response.message}});
        } else {
                this.setState({...this.state, RequestStatus: 
                    {...this.state.RequestStatus, status: RequestState.SUCCESSFUL}});
                this.getMyJobs(this.state.dataPagination.getPageNumber());
            }
    }
    getProperStatus(statusId : number){
        switch(statusId) {
            case 1:
                return (<p>Searching for fulfiller<i className = "material-icons">hourglass_empty</i></p>)
            case 2:
                return (<p>Job Assigned<i className = "material-icons">person</i></p>)
            case 3:
                return (<p>In Progress<i className = "material-icons">autorenew</i></p>)
            case 4:
                return (
                <p>Completed<i className = "material-icons">done</i></p>)
            case 5:
                return (<p>Cancelled<i className = "material-icons">cancel</i></p>)
            case 6:
                return (
                <p>Completed<i className = "material-icons">done</i></p>)
        }
    }
    createPagination = () => {
        if(this.state.dataPagination.getPageNumber() === undefined){
            return;
        }
        let elements = [];
            for (let i = 0; i < this.state.dataPagination.getTotalPages(); i++) {
          elements.push(<li className=
            {i === this.state.dataPagination.getPageNumber() ? "active" : ""}>
                <a href="#" onClick = {(e:any) => {e.preventDefault(); this.getMyJobs(i)}}>Click</a></li>);
        }
        return elements;
      }
    async getMyJobs(page : number) {
        this.setState({...this.state, RequestStatus: 
            {...this.state.RequestStatus, status: RequestState.FETCHING}});
        const numOfElements = (isMobile() === true) ? 1 : 5;
        const response = await APICall.GET('/jobs/usercreated/' + this.props.auth.userProfile.getUserId() + 
        '?page=' + page + '&size=' + numOfElements + '&sort=dateCreated,desc'
        ,this.props.auth.userProfile.getToken());
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        if(await response instanceof Error){
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: response.message}});
        } else {
            let responseArray = response.content;
            let jobsArray : Job[] = responseArray.map((element:any, index: number)=>{
                return new Job(element);

            })
            console.log("Jobs");
            console.log(jobsArray);
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.SUCCESSFUL}});
            this.setState({data: jobsArray, dataPagination: new Pagination(await response)})
        }
    }

    render() {
        return (
            <>
            {(this.state.jobDetailsModalIndex !== -1) ?
            <JobDetailsModal job = {this.state.data[this.state.jobDetailsModalIndex]} callback = {this.closeJobDetailsModal}/>
            : null }
                        {this.state.RequestStatus.status === RequestState.ERROR ?
                    <Alert key="request-error" className = "my-events-error" variant="danger">
                    Error retrieving data from server : {this.state.RequestStatus.errorMsg}
                    </Alert> : null}
            <div className = "my-events-title-container">
            <h2 className = "my-events-title makerportal-title">My Orders</h2>
            {this.state.RequestStatus.status === RequestState.FETCHING ? <Spinner className = "my-events-loading-spinner"
            animation = "border" variant = "light"/> : null}</div>

                    
            <div className = "my-events-container">

            <div className = "pagination-left">
            <a href = '#' className = {(this.state.dataPagination.isFirstPage()) ? "pagination-disabled" : ""}
            onClick={this.goBackClick}><i className = "material-icons large" style = {{fontSize: '50px'}}>arrow_back</i></a>
            </div>      
              <div className = "my-events-data">

            {(this.state.data[0]) ? this.state.data.map((element: Job, index : number) => {

                return (
                <>
                <Card className = "my-events-data-card">
                    <Card.Img variant="top" src={element.getProduct().getImageUrl()} />
                    <Card.Body>
                        
                        <Card.Title>{element.getProduct().getItemName()}</Card.Title>
                        <Form.Label>Status: </Form.Label>
                        <Form.Text>
                         {this.getProperStatus(element.getStatus().getStatusId())} </Form.Text>
                        {(element.getStatus().getStatusId() === 2) ? <>
                        <Form.Label>Expected Delivery: </Form.Label> 
                        <Form.Text>
                        <p>{element.getTimeEstimate()} </p> </Form.Text>
                        </> : null } 
                        {(element.getStatus().getStatusId() === 2 || element.getStatus().getStatusId() === 3) ? <>
                        <Form.Label>Your Fullfiller: </Form.Label> 
                        <Form.Text>
                        <p>{element.getUserAccepted().getFirstName()}
                        <a href= {`tel: ${element.getUserAccepted().getPhone()}`}><i className = "material-icons small-icons">phone</i></a>
                        <a href= {`mailto: ${element.getUserAccepted().getEmail()}`}><i className = "material-icons small-icons">email</i></a></p>
                         </Form.Text>

                        </> : null } 
                         {element.getStatus().getStatusId() === 4 ? <>
                         <Form.Label>How did {element.getUserAccepted().getFirstName()} do?</Form.Label>
                        <div className="rating">
                            <span onClick = {() => this.setRating(5,element.getJobId())}>☆</span>
                            <span onClick = {() => this.setRating(4, element.getJobId())}>☆</span>
                            <span onClick = {() => this.setRating(3, element.getJobId())}>☆</span>
                            <span onClick = {() => this.setRating(2, element.getJobId())}>☆</span>
                            <span onClick = {() => this.setRating(1, element.getJobId())}>☆</span>
                        </div> </>
                        : null }
                    <Button className = "btn-my-events-data-card" 
                    onClick = {() => this.setState({...this.state, jobDetailsModalIndex: index})}
                    >View Details</Button>
                    </Card.Body>
                </Card> 
            </> )
    }) : <p className = "loadingNoResults">No Results</p> }
                </div>
            <div className = "pagination-right">
                <a href = '#' className = {(this.state.dataPagination.isLastPage()) ? "pagination-disabled" : ""}
                onClick={this.goForwardClick}><i className = "large material-icons" style = {{fontSize: '50px'}}>arrow_forward</i></a>
            </div>
            </div><div className = "my-events-pagination-bottom">   
            <>
            <ul>
                {this.createPagination()}
			</ul>
            </>
</div>
             </>

        )
        
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth,
        makerPortal: state.makerPortal,
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    myJobsDoneRefresh: myJobsDoneRefresh,
}
export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
