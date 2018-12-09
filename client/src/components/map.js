import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import config from '../config/config';

const key = config.mapKey;

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
        <Map
            google={this.props.google}
            zoom={14}
            styles={mapStyles}
            initialCenter={{
                lat: 37.803115,
                lng: -122.257976 
            }}
        />
    );
  }
}

export default GoogleApiWrapper({
    apiKey: key
})(MapContainer);