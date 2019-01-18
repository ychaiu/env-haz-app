import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../config/config';
import mapStyle from './mapStyle';
import { withRouter } from 'react-router';
import LoadingSpinner from './loadingSpinner';
import { newMarkerRefreshAction } from '../../redux/actions/newMarkerRefreshAction';
import { renderCommentsAction } from '../../redux/actions/renderCommentsAction';
import { connect } from 'react-redux';
import icons from './mapIcons';
import $ from 'jquery';

const key = config.mapKey;

const customStyle = mapStyle.styleArray;

let prevInfoWindow = false;
const loadMarkers = (data, map, maps) => {
  for (let i = 0; i < data.length; i++) {
    let eventObj = data[i];
    let marker = new maps.Marker({
      position: new maps.LatLng(eventObj.latitude, eventObj.longitude),
      icon: icons[`${eventObj.haz_id}`],
      map: map
    });

    const contentString = 
    `
    <h3>${eventObj.event_title}</h3><br>
    <b>Last Reported: </b> ${eventObj.datetime_seen}<br><br>
    <b>Description: </b> ${eventObj.description}<br><br>
    <button type="button" id= "button-link">View Comments</a>
    `;

    marker.addListener('click', function () {
      let infowindow = new maps.InfoWindow({
        content: contentString,
        maxWidth: 200
      });
      if (prevInfoWindow) {
        prevInfoWindow.close();
      }
      prevInfoWindow = infowindow;
      infowindow.open(map, marker);
      this.infowindow = infowindow;

      maps.event.addListenerOnce(infowindow, 'domready', function () {
        let btn = $('#button-link');
        btn.on('click', showComments);
      })

      const showComments = (evt) => {
        evt.preventDefault();
        console.log("show comments");
      }
    });  
  }
}


class Map extends Component {
  static defaultProps = {
    center: {
      lat: 37.76115,
      lng: -122.452
    },
    zoom: 12
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/render_markers.json")
      .then(response => response.json())
      .then(data => this.props.newMarkerRefreshAction(data))
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.markers) {
      return
    }
    if (this.props.markers.length !== newProps.markers.length) {
      let numMarkers = this.props.markers.length - newProps.markers.length
      let addMarkers = newProps.markers.slice(numMarkers)
      loadMarkers(addMarkers, this.map, this.maps)
    }
  }

  handleApiLoaded(map, maps) {
    let data = this.props.markers;
    let commentState = this.props.commentState;
    console.log(commentState)
    this.map = map;
    this.maps = maps;
    loadMarkers(data, map, maps);
    
    let newMarker;
    const placeMarkerAndPanTo = latLng => {
      // only allow user to place a marker if report-event component is shown
      if (this.props.location.pathname === "/report-event") {  
        if (newMarker) {
          newMarker.setPosition(latLng);
        } else {
          newMarker = new maps.Marker({
            position: latLng,
            map: map
          });
        }
        map.panTo(latLng);
        let lat = latLng.lat();
        let lng = latLng.lng();
        this.props.handleCoordinates({
          newMarker: { lat: lat, lng: lng }
        });
      }
    };
    if (this.props.location.pathname !== "/report-event") {
      if (newMarker) {
        newMarker.setMap(null);
      }
    }

    map.addListener("click", e => {
      placeMarkerAndPanTo(e.latLng, map);
    });
  }

  render() {
    const isMarkersLoaded = this.props.markers;

    return (
      <div>
        {isMarkersLoaded ? (
          <div
            className="float-right d-inline-block"
            style={{
              top: "55px",
              width: "100%",
              position: "fixed",
              bottom: "0px"
            }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{ key: key }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              options={{ styles: customStyle }}
              onGoogleApiLoaded={({ map, maps }) =>
                this.handleApiLoaded(map, maps)
              }
              yesIWantToUseGoogleMapApiInternals={true}
            >
            </GoogleMapReact>
          </div>
        ) : (
            <LoadingSpinner />
          )}
      </div>

    );
  }
}

// access states in store
const mapStateToProps = state => {
  return {
    markers: state.mapReducers.markers
  }
}

const mapDispatchToProps = dispatch => ({
  newMarkerRefreshAction: (markers) => dispatch(newMarkerRefreshAction(markers))
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Map));
