import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../config/config';
import mapStyle from './mapStyle';
// import * as clusterMarkerImg from '../../../public/img/clusterMarkers/m2.png'

const key = config.mapKey;

const customStyle = mapStyle.styleArray;

const loadMarkers = (map, maps) => {
  fetch('http://localhost:5000/api/render_markers.json')
    .then(function(response) {
      return response.json();
      })
    .then(function(data) {
      for(let i = 0; i < data.length; i++) {
        let eventObj = data[i];
        let marker = new maps.Marker({
          position: new maps.LatLng(eventObj.latitude, eventObj.longitude),
          map: map,
        })
        const contentString = 
        `<div>
        <h3>${eventObj.event_title}</h3>
        <b>Last Reported: </b> ${eventObj.datetime_seen}<br>
        <b>Description: </b> ${eventObj.description}
        </div>`

        let infowindow = new maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        })
        marker.addListener('click', function(){
          infowindow.open(map,marker);
        })
      }
    })
}

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 37.761150,
            lng: -122.452 
        },
        zoom: 12
    }; 

  handleApiLoaded (map,maps) {
    let newMarker;
    function placeMarkerAndPanTo(latLng) {
      if (newMarker) {
        newMarker.setPosition(latLng);
      }
      else {
        newMarker = new maps.Marker({
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

    loadMarkers(map,maps);

    // let markerCluster = new MarkerClusterer(map, markers,
    //         {imagePath: clusterMarkerImg});
  }

  render() {
    return (
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