import { IAuthState, IAppState } from "../../reducers";
import { loginSuccessful } from "../../actions/Authentication.action";
import { connect } from "react-redux";
import React, { Component } from "react";
import { withState, withHandlers } from "recompose";
import { Marker, InfoWindow, GoogleMap, withGoogleMap } from "react-google-maps";
import { cpus } from "os";
import testData from './MapTestData';
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
    places : testData,
  }),
  withState('zoom', 'onZoomChange', 8),
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
        places: testData,
        onSearchBoxMounted: (ref:any) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          let places = refs.searchBox.getPlaces();
           places.forEach((element : any, index: number) => {
              if(isNaN(element.geometry.location.lat)){
                  console.log(element.geometry.location.lat());
                  places[index].geometry.location.lat = element.geometry.location.lat();
                  places[index].geometry.location.lng = element.geometry.location.lng();
              }
          });
          console.log(places);
          this.setState({
            places,
          });
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props : any) =>
<>
{console.log(props.places)}
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search for a location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
        
      />
    </StandaloneSearchBox>
    <ol>
        {console.log(props.places)}
    {props.places.map((arr : any) =>
        <li key={arr.place_id}>
          {arr.formatted_address}
          {" at "}
          ({arr.geometry.location.lat}, {arr.geometry.location.lng})

        </li>
      )}
    </ol>
    </div>
    {console.log(props.places)}
       { (props.places[0]) ? 
    <GoogleMap
      center={{ lat: props.places[0]['geometry']['location']['lat'], lng: props.places[0]['geometry']['location']['lng'] }}
      zoom={props.zoom}
      ref={props.onMapMounted}
      streetView = {false}
      options = {{backgroundColor: 'black',
                  streetViewControl: false,
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
}
type IProps = IComponentProps & IAuthProps;
class PopularEvents extends Component <IAuthProps,IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            isFetching: false,
        };
    }

    render() {
        return (<>
        <h2>Popular Events</h2>
<PlacesWithStandaloneSearchBox />
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
