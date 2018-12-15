import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../config/config';
import mapStyle from './mapStyle';

const key = config.mapKey;
const customStyle = mapStyle.styleArray;

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 37.803115,
            lng: -122.257976 
        },
        zoom: 14
    };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="float-right d-inline-block" style={{ height: '100vh', width: '75%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{styles: customStyle}}
        >
        < /GoogleMapReact>
      </div>
    );
  }
}




export default SimpleMap;