import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../config/config';
import mapStyle from './mapStyle';

const key = config.mapKey;
const customStyle = mapStyle.styleArray;

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 37.803115,
            lng: -122.257976 
        },
        zoom: 14
    };

  handleApiLoaded (map,maps) {
    let marker;
    map.addListener('click', function(e){
      placeMarkerAndPanTo(e.latLng,map);
    });
    function placeMarkerAndPanTo(latLng,map) {

      if (marker) {
        marker.setPosition(latLng);
      }
      else {
        let marker = new maps.Marker({
          position: latLng,
          map:map
        });
      }
      map.panTo(latLng);
    }
  }

//   renderMarkers(map, maps) {
//   let marker = new maps.Marker({
//     position: {lat: 37.803115,lng: -122.257976},
//     map: map,
//     title: 'Hello World!'
//   });
// }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="float-right d-inline-block" style={{ height: '100vh', width: '75%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{styles: customStyle}}
          onClick ={this.coordsOnClick}
          onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map,maps)}
          yesIWantToUseGoogleMapApiInternals={ true }
        >
        </GoogleMapReact>
      </div>
    );
  }
}




export default Map;