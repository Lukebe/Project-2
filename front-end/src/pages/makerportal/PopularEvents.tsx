import { IAuthState, IAppState, IMakerPortalState } from "../../reducers";
import { loginSuccessful } from "../../actions/Authentication.action";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withState, withHandlers, withStateHandlers } from "recompose";
import { Marker, InfoWindow, GoogleMap, withGoogleMap } from "react-google-maps";
import testData from './MapTestData';
import * as APICall from '../../utils/APICall';
import Axios from "axios";
import { Spinner, Button, Accordion, Card, Alert, Row, Col } from "react-bootstrap";
import { Job } from "../../models/Job";
import { Product } from "../../models/Product";
import { Category } from "../../models/Category";
import { myJobsRefresh, newJobsPopulate, newJobsReset, openNewJobs, closeNewJobs } from "../../actions/MakerPortal.action";
import { makerPortalReducer } from "../../reducers/MakerPortal.reducer";
import ImageModal from "../../components/ImageModal";
import { HashLink as Link } from 'react-router-hash-link';
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
        onClick={() => {props.updateCallback(index,true); props.onToggleOpen(index)}}
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
            props.updateCallback(index,false); props.onToggleOpen(100000000)}}>
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
    openNewJobs: () => void,
    closeNewJobs: () => void,
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
    imageModalUrl: string;
    selectedAccordianIndex: number;
}
type IProps = IComponentProps & IAuthProps;
class PopularEvents extends Component <IAuthProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            currentPlaces: testData,
            mapCenter: { },
            popularJobDetails: {},
            imageModalUrl: '',
            RequestStatus: {
              status: RequestState.NOT_ACTIVE,
              errorMsg: '',
              
          },
          selectedAccordianIndex: 0,
        };
        
    }
     retrieveInformationFromMap = (index : number,marker: boolean) => {
       console.log(this.state.popularJobDetails[index]);
       if(!marker) {
       this.props.newJobsReset();
       this.props.newJobsPopulate("productlocation", this.state.popularJobDetails[index].address);
       this.props.newJobsPopulate("category",  this.state.popularJobDetails[index].product.category.categoryId);
       this.props.newJobsPopulate("product",  this.state.popularJobDetails[index].product.productId)
        this.props.myJobsRefresh();
        this.props.openNewJobs();
       } else {
        this.setState({...this.state,selectedAccordianIndex : index});
       }
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
      this.props.closeNewJobs();
      this.setState({mapCenter: {lat: this.state.currentPlaces[index]['geometry']['location']['lat'],
       lng: this.state.currentPlaces[index]['geometry']['location']['lng']},
      selectedAccordianIndex: (this.state.selectedAccordianIndex === index) ? 10000 : index });
    }
    closeImageModal = (() => {
      this.setState({...this.state, imageModalUrl: ''});
    });
    openImageModal(url: string) {
      this.setState({...this.state, imageModalUrl: url});
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
        {(this.state.imageModalUrl) ? <ImageModal callback = {this.closeImageModal} imageUrl = {this.state.imageModalUrl}/> : null}
        <h2 className = "makerportal-title">Popular Orders</h2><Row><Col lg = {this.props.makerPortal.newJobOpen ? 12 : 6} sm = {12}>
        {(this.state.RequestStatus.status === RequestState.FETCHING) ? <Spinner animation = "border" variant = "dark"/> :
        
<PlacesWithStandaloneSearchBox updateCallback = {this.retrieveInformationFromMap} 
places = {this.state.currentPlaces} jobDetails = {this.state.popularJobDetails} center = {this.state.mapCenter}
zoom = {15}/>
} </Col><Col lg = {this.props.makerPortal.newJobOpen ? 12 : 6} sm = {12}>
        {(this.state.popularJobDetails[0]) ?
          <Accordion activeKey = {`${this.state.selectedAccordianIndex}`} className = "popular-events-list">
        {this.state.popularJobDetails.map((element: any, index: number) => {
          return (
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={""+index} 
              onClick = {()=>{this.changeMapCenter(index);
               }}>
              {element.product.itemName} @ {element.address} <i className = "material-icons">menu</i>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={""+index}>
              <Card.Body>
                {(element.count > 14) ?
              <Alert className = "popular-events-warning" variant="warning">  
              <i className = "material-icons">warning</i>   
              <p>This location is very popular right now. Successful delivery of product is not guaranteed</p>
              </Alert> : null}
              <div className = "popular-events-image-container">
              <img className = "popular-events-list-image" key = {index} src = {element.product.imageUrl}/>
              <Button className = "expand-image-button" onClick = {()=>{this.openImageModal(element.product.imageUrl)}}>Expand</Button>
              </div>
              <div className = "popular-events-product-container">
                <p className = "popular-events-list-description">{element.product.description}</p>
                <p className = "popular-events-list-category"><i className = "material-icons">category</i> {element.product.category.name}</p>
                <p className = "popular-events-list-price"><i className = "material-icons">attach_money</i> ${element.product.price}</p>
                <p className = "popular-events-list-address"><i className = "material-icons">location_on</i>{element.address}</p>
              </div>
              <p className = "popular-events-list-count">{element.count} other Kutsies users are waiting for this product.</p>
              <Link smooth to = "#createnewjob"><Button className = "popular-events-pick-button"
          onClick = {(e : any)=>{e.preventDefault(); this.retrieveInformationFromMap(index,false)}}>
              Skip the Line for {element.product.itemName}</Button></Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card> )
        })}
        </Accordion>
        : null }
        </Col>
      </Row>


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
  openNewJobs: openNewJobs,
  closeNewJobs: closeNewJobs,
}
export default connect(mapStateToProps, mapDispatchToProps)(PopularEvents);
