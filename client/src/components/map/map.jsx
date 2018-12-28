import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../config/config';
import mapStyle from './mapStyle';

const key = config.mapKey;
const customStyle = mapStyle.styleArray;

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
    function placeMarkerAndPanTo(latLng) {
      if (marker) {
        marker.setPosition(latLng);
      }
      else {
        marker = new maps.Marker({
          position: latLng,
          map:map
        });
      }
      map.panTo(latLng);
      // this.props.handleNewMarkerCoords(latLng);
    }

    map.addListener('click', function(e){
      placeMarkerAndPanTo(e.latLng,map);
    });

  }




  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="float-right d-inline-block" style={{ height: '100vh', width: '75%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options ={{styles: customStyle}}
          onGoogleApiLoaded={({map, maps}) => this.handleApiLoaded(map,maps)}
          yesIWantToUseGoogleMapApiInternals={ true }
        >
        {this.handleNewMarkerCoords}
        </GoogleMapReact>
      </div>
    );
  }
}




export default Map;