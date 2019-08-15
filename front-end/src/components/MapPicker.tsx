import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAuthState, IAppState } from '../reducers';
import '../pages/makerportal/Maker.css';
import Axios from 'axios';
import { loginSuccessful } from '../actions/Authentication.action';
import { Modal, Form, Spinner, Button } from "react-bootstrap";
import { withState, withHandlers, withStateHandlers } from "recompose";
//GEOCODE METHOD: https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAlQO3Z1bivIK3irAufKKllvQHtIm1HPgo&address=hello
const googleMapURL : string = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlQO3Z1bivIK3irAufKKllvQHtIm1HPgo&libraries=geometry,drawing,places';
const { compose, withProps, lifecycle } = require("recompose");
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL,
    loadingElement: <Spinner animation = "border" variant = "dark"/>,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `80%` }} />,
    places : [],
    zoom: 3,
    centerPlace : {geometry: {location: {lat: 37.0902, lng: -97.922211}}},
  }),
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
      this.setState({
        places: [],
        onSearchBoxMounted: (ref:any) => {
          refs.searchBox = ref;
        },
        onClick: async (e:any) => {
         console.log(e);
        },
        onPlacesChanged: () => {
          let places = refs.searchBox.getPlaces();
           places.forEach((element : any, index: number) => {
              if(isNaN(element.geometry.location.lat)){
                  places[index].geometry.location.lat = element.geometry.location.lat();
                  places[index].geometry.location.lng = element.geometry.location.lng();
              }
          });
          this.setState({
            places, zoom: 15
          });
          if(places[0]) {
          this.setState({centerPlace: places[0]})
          }
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props : any) =>
<>
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
             <Form.Control className = "map-picker-input" required size="lg" type="text" 
                          placeholder = "Search for a location" name="dropofflocation"/>

    </StandaloneSearchBox>
    <ol>
        {console.log(props.places)}
    {//props.places.map((arr : any) =>
        //<li key={arr.place_id}>
        //  {arr.formatted_address}
        //  {" at "}
        //  ({arr.geometry.location.lat}, {arr.geometry.location.lng})

        //</li>
      //) 
    }
    </ol>
    {console.log(props.places)}
    <div className = "map-picker-map">
    <GoogleMap
      center={{lat: props.centerPlace['geometry']['location']['lat'], lng: props.centerPlace['geometry']['location']['lng']}}
      zoom={props.zoom}
      ref={props.onMapMounted}
      onClick = {props.onClick}
      options = {{backgroundColor: 'black',
                  streetViewControl: false,
                  clickableIcons: true,
                  }}
    >
             { (props.places[0])?

      props.places.map((currElement: any, index: any) => 
        <>
      <Marker key = {index}
        position={{ lat: currElement.geometry.location.lat, lng: currElement.geometry.location.lng }}
        onClick={() => {props.onToggleOpen(index)}}
      >
        {props.openInfoWindowMarkerId === index ?
        <InfoWindow key = {index} onCloseClick={()=>props.onToggleOpen(index)}><>
          <img className = "map-picker-info-window-icon" key = {index} src = {currElement.icon}/>
          <p className = "map-picker-info-window-name"><strong>{currElement.name}</strong>
          </p><p className = "map-picker-info-window-address">{currElement.formatted_address}
          </p><Button className = "map-picker-info-window-button"
          onClick = {(e : any)=>{e.preventDefault(); console.log(currElement.formatted_address);
            props.updateCallback(currElement.formatted_address)}}>
              Choose this location</Button></>
        </InfoWindow> : null}
      </Marker>
      </>
      )
      : null }
    </GoogleMap>
    </div>
    </>
);
export interface IAuthProps {
    //data from state store
    auth: IAuthState,
    loginSuccessful : () => void;
    //Action creators from the dispatcher
}
export interface IComponentProps {
    closeCallback: Function;

}
interface IState {
    isFetching : boolean;
    address: string;
}
type IProps = IComponentProps & IAuthProps;
class MapPicker extends Component <IProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
            address: '',
        };
    }
    updateCallback = (address : string) =>{
      this.setState({...this.state, address});
      this.props.closeCallback(address);
    }

    render() {
        return (
            <Modal size="lg" show animation 
            onHide = {() => this.props.closeCallback(this.state.address)}>
                <Modal.Header><h2>Map Picker</h2></Modal.Header>
                <Modal.Body>
<PlacesWithStandaloneSearchBox updateCallback = {this.updateCallback}/>
                </Modal.Body> 
            </Modal>     )
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
export default connect(mapStateToProps, mapDispatchToProps)(MapPicker);
