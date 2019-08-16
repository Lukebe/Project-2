import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAuthState, IAppState } from '../../reducers';
import './Maker.css';
import { loginSuccessful } from '../../actions/Authentication.action';
import * as APICall from '../../utils/APICall';
import { Job } from "../../models/Job";
import Pagination from '../../models/Pagination';
import { Alert, Card, Button, FormLabel, Form, Spinner } from "react-bootstrap";
import isMobile from "../../utils/IsMobile";
const RequestState = APICall.RequestState;
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    loginSuccessful : () => void;
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

    }
}
type IProps = IComponentProps & IAuthProps;
class PopularEvents extends Component <IAuthProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            data: [],
            dataPagination: new Pagination({empty:true}),
            RequestStatus: {
                status: RequestState.NOT_ACTIVE,
                errorMsg: '',
            }
        };
    }
    componentDidMount() {
        this.getMyJobs(0);
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
        '?page=' + page + '&size=' + numOfElements + '&sort=dateCreated,asc'
        ,this.props.auth.userProfile.getToken());
        //If there is an error, APICall methods will return an Error class instance.
        //This checks if there is an error and alerts message if there is.
        if(await response instanceof Error){
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: response.message}});
        } else {
            let responseArray = response.content;
            console.log(response.content);
            let jobsArray : Job[] = responseArray.map((element:any, index: number)=>{
                return new Job(element);

            })
            this.setState({...this.state, RequestStatus: 
                {...this.state.RequestStatus, status: RequestState.SUCCESSFUL}});
            this.setState({data: jobsArray, dataPagination: new Pagination(await response)})
        }
        console.log(await response);
    }

    render() {
        return (
            <>
            <h2 className = "my-events-title makerportal-title">My Events</h2>
            {this.state.RequestStatus.status === RequestState.ERROR ?
                    <Alert key="request-error" variant="danger">
                    {this.state.RequestStatus.errorMsg}
                    </Alert> : null}
                    
            <div className = "my-events-container">

            <div className = "pagination-left">
            <a href = '#' className = {(this.state.dataPagination.isFirstPage()) ? "pagination-disabled" : ""}
            onClick={this.goBackClick}><i className = "material-icons large" style = {{fontSize: '50px'}}>arrow_back</i></a>
            </div>      
              <div className = "my-events-data">

            {(this.state.data[0]) ? this.state.data.map((element: Job) => {

                return (
                <>
                <Card className = "my-events-data-card">
                    <Card.Img variant="top" src="https://images-eu.ssl-images-amazon.com/images/I/41tFHNWXlPL._SY300_QL70_.jpg" />
                    <Card.Body>
                        <Card.Title>{element.getProduct().getItemName()}</Card.Title>
                        <Card.Text>
                        <Form.Label>Expected Delivery: </Form.Label> {element.getJobDateTime().getDate() + element.getTimeEstimate().getDate()}
                        <Form.Label>Status: </Form.Label> {element.getStatus().getStatus()}
                    </Card.Text>
                    <Button className = "btn-my-events-data-card" >View Details</Button>
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
            {this.state.RequestStatus.status === RequestState.FETCHING ? <Spinner className = "my-events-loading-spinner"
            animation = "border" variant = "light"/> : null}</div>
             </>

        )
        
    }
}
const mapStateToProps = (state : IAppState) => {
    return {
        auth: state.auth
    }
}
//This object definition will be used to map action creators to properties
const mapDispatchToProps = {
    loginSuccessful : loginSuccessful,
}
export default connect(mapStateToProps, mapDispatchToProps)(PopularEvents);
