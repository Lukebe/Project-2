import { IAuthState, IAppState, IMakerPortalState } from "../../reducers";
import { loginSuccessful } from "../../actions/Authentication.action";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withState, withHandlers, withStateHandlers } from "recompose";
import { Marker, InfoWindow, GoogleMap, withGoogleMap } from "react-google-maps";
import testData from './MapTestData';
import * as APICall from '../../utils/APICall';
import Axios from "axios";
import { Spinner, Button, Accordion, Card } from "react-bootstrap";
import { Job } from "../../models/Job";
import { Product } from "../../models/Product";
import { Category } from "../../models/Category";
import { myJobsRefresh, newJobsPopulate, newJobsReset } from "../../actions/MakerPortal.action";
import { makerPortalReducer } from "../../reducers/MakerPortal.reducer";
const RequestState = APICall.RequestState;

//GEOCODE METHOD: https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAlQO3Z1bivIK3irAufKKllvQHtIm1HPgo&address=hello
const googleMapURL : string = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlQO3Z1bivIK3irAufKKllvQHtIm1HPgo&libraries=geometry,drawing,places';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
} = require("react-google-maps");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />, 
  }),
  withState('zoom', 'onZoomChange', 8),
  withStateHandlers(() => ({
    openInfoWindowMarkerId: '',
  }), {
    onToggleOpen: ({ openInfoWindowMarkerId }) => (markerId) => ({
      openInfoWindowMarkerId: markerId,
    })
  }),
  withHandlers(() => {
    const refs : any = {
      map: undefined,
    }
    return {
      onMapMounted: () => (ref: any) => {
        refs.map = ref;
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      const refs : any = {}

    },
  }), 
  withScriptjs,
  withGoogleMap
)((props : any) =>
<>
       { (props.places[0]) ? 
    <GoogleMap
      center={props.center}
      zoom={props.zoom}
      ref={props.onMapMounted}
      options = {{backgroundColor: 'black',
                  clickableIcons: true,
                  zoom: 15}}
    >
        {props.places.map((currElement : any, index: any) =>
      <Marker
        position={{ lat: currElement.geometry.location.lat, lng: currElement.geometry.location.lng }}
        onClick={() => {console.log(props.jobDetails);props.onToggleOpen(index)}}
      >
        {props.openInfoWindowMarkerId === index ?
        <InfoWindow key = {index} onCloseClick={()=>props.onToggleOpen(index)}><>
          <img className = "map-picker-info-window-icon" key = {index} src = {props.jobDetails[index].product.imageUrl}/>
          <p className = "map-picker-info-window-name"><strong>{props.jobDetails[index].product.itemName}</strong></p>
          <p className = "map-picker-info-window-description">{props.jobDetails[index].product.description}</p>
          <p className = "map-picker-info-window-address"><i className = "material-icons">location_on</i>
          {currElement.formatted_address}
          </p><Button className = "map-picker-info-window-button"
          onClick = {(e : any)=>{e.preventDefault(); console.log(props.jobDetails[index]);
            props.updateCallback(index); props.onToggleOpen(100000000)}}>
              Skip the Line for {props.jobDetails[index].product.itemName}</Button></>
        </InfoWindow> : null}

      </Marker>
        )}
    </GoogleMap>
    : null }
    </>
);

export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    makerPortal: IMakerPortalState,
    myJobsRefresh: () => void,
    newJobsPopulate: (name: string, value : any) => void,
    newJobsReset: () => void,
    //Action creators from the dispatcher
}
export interface IComponentProps {
}
interface IState {
    currentPlaces: any;
    popularJobDetails: any;
    mapCenter: any;
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
            currentPlaces: testData,
            mapCenter: { },
            popularJobDetails: {},
            RequestStatus: {
              status: RequestState.NOT_ACTIVE,
              errorMsg: '',
              
          }
        };
        
    }
     retrieveInformationFromMap = (index : number) => {
       console.log(this.state.popularJobDetails[index]);
       this.props.newJobsReset();
       this.props.newJobsPopulate("productlocation", this.state.popularJobDetails[index].address);
       this.props.newJobsPopulate("category",  this.state.popularJobDetails[index].product.category.categoryId);
       this.props.newJobsPopulate("product",  this.state.popularJobDetails[index].product.productId)
      this.props.myJobsRefresh();


    }
    async componentDidMount() {
      let popularLocations = await this.getPopularLocations();
      if(await popularLocations){
     this.setState({currentPlaces: popularLocations, RequestStatus: 
      {...this.state.RequestStatus, status: RequestState.SUCCESSFUL}}) ; 
      this.changeMapCenter(0);
    } else {
      this.setState({RequestStatus: 
        {...this.state.RequestStatus, status: RequestState.ERROR}}) ; 
     }
    }
    changeMapCenter = (index:number) => {
      this.setState({mapCenter: {lat: this.state.currentPlaces[index]['geometry']['location']['lat'],
       lng: this.state.currentPlaces[index]['geometry']['location']['lng']} });
    }
    async getPopularLocations()  {
      this.setState({...this.state, RequestStatus: 
          {...this.state.RequestStatus, status: RequestState.FETCHING}});
      const response = await APICall.GET('/jobs/popularlocations/5?days=864000' ,this.props.auth.userProfile.getToken());
      //If there is an error, APICall methods will return an Error class instance.
      //This checks if there is an error and alerts message if there is.
      if(response instanceof Error){
          this.setState({...this.state, RequestStatus: 
              {...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: response.message}});
      } else {
        this.setState({popularJobDetails: response});
        console.log(response);
        let addressArray : any[] = response.map((element : any) => {
          return element.address;
        });   
        console.log(addressArray);
        let geocodeData = await Axios.all(addressArray.map((address:string) => 
        Axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAlQO3Z1bivIK3irAufKKllvQHtIm1HPgo&address=${address}`)))
          .then(Axios.spread(function (...res) {
            console.log(res);
            return res;
            }));
        let geocodeMap = geocodeData.map((element: any) => {
          if(element.status === 200){
            return element.data.results[0];
          }
        })
        return await geocodeMap;
         
          
      }
  } 
    render() {
        return (<>
        {console.log(this.state)} 
        <h2 className = "makerportal-title">Popular Orders</h2>
        {(this.state.RequestStatus.status === RequestState.FETCHING) ? <Spinner animation = "border" variant = "dark"/> :
<PlacesWithStandaloneSearchBox updateCallback = {this.retrieveInformationFromMap} 
places = {this.state.currentPlaces} jobDetails = {this.state.popularJobDetails} center = {this.state.mapCenter}/>
} 
        {(this.state.popularJobDetails[0]) ?
          <Accordion defaultActiveKey="0" className = "popular-events-list">
        {this.state.popularJobDetails.map((element: any, index: number) => {
          return (
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={""+index} onClick = {()=>this.changeMapCenter(index)}>
              {element.product.itemName} @ {element.address}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={""+index}>
              <Card.Body>
              <img className = "popular-events-list-image" key = {index} src = {element.product.imageUrl}/>
              <p className = "popular-events-list-description">{element.product.description}</p>
              <p className = "popular-events-list-category">Category: {element.product.category.name}</p>
              <p className = "popular-events-list-price">Price: {element.product.price}</p>
              <p className = "popular-events-list-address"><i className = "material-icons">location_on</i>{element.address}
              <p className = "popular-events-list-count"><strong>{element.count} Kutsies users are waiting for this product.
              Get it before it's too late!</strong></p>
              </p><Button className = "map-picker-info-window-button"
          onClick = {(e : any)=>{e.preventDefault();}}>
              Skip the Line for {element.product.itemName}</Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card> )
        })}
        </Accordion>
        : null }


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
  myJobsRefresh: myJobsRefresh,
  newJobsPopulate: newJobsPopulate,
  newJobsReset: newJobsReset,
}
export default connect(mapStateToProps, mapDispatchToProps)(PopularEvents);
