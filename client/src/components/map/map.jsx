import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import config from '../../config/config';
import mapStyle from './mapStyle';
import { withRouter } from 'react-router';
import LoadingSpinner from './loadingSpinner';
import { refreshMarker } from '../../redux/actions/refreshMarker';
import { renderComments } from '../../redux/actions/renderComments';
import { commentState } from '../../redux/actions/commentState';
import { getActiveEvent } from '../../redux/actions/getActiveEvent';
import { connect } from 'react-redux';
import icons from './mapIcons';
import $ from 'jquery';

const key = config.mapKey;
const customStyle = mapStyle.styleArray;

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
      .then(data => this.props.refreshMarker(data))
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.markers) {
      return
    }
    if (this.props.markers.length !== newProps.markers.length) {
      let numMarkers = this.props.markers.length - newProps.markers.length
      let addMarkers = newProps.markers.slice(numMarkers)
      this.loadMarkers(addMarkers, this.map, this.maps)
    }
  }

  loadMarkers = (data, map, maps) => {
    let prevInfoWindow = false;
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

      marker.addListener('click', () => {
        let infowindow = new maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });
        if (prevInfoWindow) {
          prevInfoWindow.close();
        }
        prevInfoWindow = infowindow;
        infowindow.open(map, marker);
        this.props.getActiveEvent(eventObj);

        maps.event.addListenerOnce(infowindow, 'domready', () => {
          let btn = $('#button-link');
          btn.on('click', () => {
            let event_id = eventObj.event_id;
            this.loadComments(event_id);

          });
        })
      });
    }
  }

  loadNewMarker = (data, map, maps) => {
    
  }

  loadComments = (event_id) => {
    let eventQuery = event_id;
    let APIURL = "http://localhost:5000/api/render_comments/";

    fetch(APIURL + eventQuery)
      .then(function(response) {
        if(response.ok) {
          return response.json()} 
      })
      .then(data => this.props.renderComments(data))
      .then(this.props.commentState(true))
      .then(this.props.history.push('/comments'))
  }

  handleApiLoaded = (map, maps) => {
    let data = this.props.markers;
    this.map = map;
    this.maps = maps;
    this.loadMarkers(data, map, maps);
    
    let newMarker;
    const placeMarkerAndPanTo = latLng => {
      //window.location.pathname always reads the URL bar
      if (window.location.pathname === "/report-event") {  
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
      else if (window.location.pathname !== "/report-event") {
        if (newMarker) {
          newMarker.setMap(null);
          newMarker = null;
        }
      }
    };

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

// access states in store. When does this happen?
const mapStateToProps = state => {
  return {
    markers: state.mapReducers.markers,
    isCommentOpen: state.commentReducers.isCommentOpen }
}

// update state in the store
const mapDispatchToProps = dispatch => ({
  refreshMarker: (markers) => dispatch(refreshMarker(markers)),
  renderComments: (comments) => dispatch(renderComments(comments)),
  commentState: (newState) => dispatch(commentState(newState)),
  getActiveEvent: (activeEvent) => dispatch(getActiveEvent(activeEvent))
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Map));
