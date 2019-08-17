import { IAuthState, IAppState } from "../../reducers";
import { loginSuccessful } from "../../actions/Authentication.action";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withState, withHandlers } from "recompose";
import { Marker, InfoWindow, GoogleMap, withGoogleMap } from "react-google-maps";
import testData from './MapTestData';
import * as APICall from '../../utils/APICall';
import Axios from "axios";
import { Spinner } from "react-bootstrap";
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
  withHandlers(() => {
    const refs : any = {
      map: undefined,
    }
    return {
      onMapMounted: () => (ref: any) => {
        console.log("map loaded!");
        refs.map = ref;
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      const refs : any = {}
      this.setState({
        places: this.props.places,
        onSearchBoxMounted: (ref:any) => {
          refs.searchBox = ref;
        },
        //onPlacesChanged: () => {
          //let places = refs.searchBox.getPlaces();
           //places.forEach((element : any, index: number) => {
           //   if(isNaN(element.geometry.location.lat)){
          //       console.log(element.geometry.location.lat());
          //        places[index].geometry.location.lat = element.geometry.location.lat();
          //        places[index].geometry.location.lng = element.geometry.location.lng();
         //     }
          //});
          //console.log(places);
          //this.setState({
            //places,
          //});
        //},
      })
    },
  }), 
  withScriptjs,
  withGoogleMap
)((props : any) =>
<>
    {console.log(props.places)}
       { (props.places[0]) ? 
    <GoogleMap
      center={{ lat: props.places[0]['geometry']['location']['lat'], lng: props.places[0]['geometry']['location']['lng'] }}
      zoom={props.zoom}
      ref={props.onMapMounted}
      options = {{backgroundColor: 'black',
                  clickableIcons: true,
                  zoom: 15}}
    >
        {props.places.map((index: any) =>
      <Marker
        position={{ lat: index.geometry.location.lat, lng: index.geometry.location.lng }}
        onClick={props.onToggleOpen}
      >

      </Marker>
        )}
    </GoogleMap>
    : null }
    </>
);

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
    currentPlaces: any;
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
            currentPlaces: null,
            RequestStatus: {
              status: RequestState.NOT_ACTIVE,
              errorMsg: '',
          }
        };
        
    }
     retrieveInformationFromMap = (obj : any) => {
      alert(obj);
    }
    componentDidMount() {
      this.getPopularLocations();
    }
    async getPopularLocations() {
      this.setState({...this.state, RequestStatus: 
          {...this.state.RequestStatus, status: RequestState.FETCHING}});
      const response = await APICall.GET('/jobs/popularlocations/1?days=864000' ,this.props.auth.userProfile.getToken());
      //If there is an error, APICall methods will return an Error class instance.
      //This checks if there is an error and alerts message if there is.
      if(await response instanceof Error){
          this.setState({...this.state, RequestStatus: 
              {...this.state.RequestStatus, status: RequestState.ERROR, errorMsg: response.message}});
      } else {
        console.log(await response);
        if(!response[0]){ return;}
        let geocodeDataArray : any = await response.map(async(element : any) => {
            let geocodeData = await Axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAlQO3Z1bivIK3irAufKKllvQHtIm1HPgo&address=${element.address}`)
            if (geocodeData.status === 200) {
              console.log(geocodeData.data.results[0]);
            return geocodeData.data.results[0];
            }
          });
          console.log(await geocodeDataArray);
          this.setState({...this.state, RequestStatus: 
              {...this.state.RequestStatus, status: RequestState.SUCCESSFUL},currentPlaces: geocodeDataArray});
          console.log(this.state);
      }
  } 
    render() {
        return (<> 
        <h2 className = " makerportal-title">Popular Events</h2>
        {this.state.currentPlaces !== null ? 
<PlacesWithStandaloneSearchBox updateCallback = {this.retrieveInformationFromMap} places = {this.state.currentPlaces}/>
   :
<Spinner animation = "border" variant = "dark"/>}
{console.log(this.state.currentPlaces)}


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
