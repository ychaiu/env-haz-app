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
import hazTypes from './mapHazards';
import $ from 'jquery';

const key = config.mapKey;
const customStyle = mapStyle.styleArray;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 37.763430,  
      lng: -122.415302,
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
        icon: hazTypes[`${eventObj.haz_id}`]["url"],
        map: map
      });

      let photoArray = [];
      let carouselHTML = "";
      let hazType = hazTypes[`${eventObj.haz_id}`]["haz_type"];

      marker.addListener('click', () => {
        let APIURL = "http://localhost:5000/api/get_photos/";
        fetch(APIURL + eventObj.event_id)
          .then(function(response) {
            if(response.ok) {
              return response.json()} 
          })
          .then(data => {photoArray = data})
          .then(()=>{
            carouselHTML = ""      
            for (i = 0; i < photoArray.length; i++) {
              if (i === 0) {
                carouselHTML += 
                  `<div class="carousel-item active">
                    <img class="d-block w-100" src="${photoArray[i]}">
                  </div>`
              }
              else {
                carouselHTML +=
                `<div class="carousel-item">
                  <img class="d-block w-100" src="${photoArray[i]}"> 
                </div>`
              }
            }
          })
          .then(()=>{
            const contentString = `
            <br>
            <div id="infowindow-container">
              <div class="haztype-flag">
                <img src ="${hazTypes[`${eventObj.haz_id}`]["url"]}" />
                &nbsp;${hazType}
              </div>
              <div class="infowindow-title">${eventObj.event_title}
              </div>
              <br>
              <div id="carouselSlides" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  ${carouselHTML}
                </div>
                <a class="carousel-control-prev" href="#carouselSlides" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselSlides" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <br>
              <b class="infowindow-category">Last Reported: </b> ${eventObj.datetime_seen}<br><br>
              <b class="infowindow-category">Description: </b> ${eventObj.description}<br><br>
              <button type="button" id= "button-link" class="btn btn-primary view-comment">View Comments</a>
            </div>
              `;
            let infowindow = new maps.InfoWindow({
              content: contentString,
              maxWidth: 300
            });
            if (prevInfoWindow) {
              prevInfoWindow.close();
            }
            prevInfoWindow = infowindow;
            infowindow.open(map, marker);

            this.props.getActiveEvent(eventObj);
    
            maps.event.addListener(infowindow, 'domready', () => {
              var iwOuter = $('.gm-style-iw');

              /* The DIV we want to change is above the .gm-style-iw DIV.
               * So, we use jQuery and create a iwBackground variable,
               * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
               */
              var iwBackground = iwOuter.prev();
           
              // Remove the background shadow DIV
              iwBackground.children(':nth-child(2)').css({'display' : 'none'});
           
              // Remove the white background DIV
              iwBackground.children(':nth-child(4)').css({'display' : 'none'});
              $("button[title='Close']").css('top', "0px");
              $("button[title='Close']").css('right', "10px");
              let btn = $('#button-link');
              btn.on('click', () => {
                let event_id = eventObj.event_id;
                this.loadComments(event_id);
              });
            })
          })
      });
    }
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
      // .then(this.props.history.push('/comments'))
  }

  handleApiLoaded = (map, maps) => {
    let data = this.props.markers;
    this.map = map;
    this.maps = maps;
    this.loadMarkers(data, map, maps);

    let legend = document.getElementById('legend');
    for (let key in hazTypes) {
      let icon = hazTypes[key]["url"];
      let name = hazTypes[key]["haz_type"]
      let div = document.createElement('div');
      div.innerHTML = '<img id="legend-item" src="' + icon + '"> ' + name ;
      legend.appendChild(div);
    }
  
    map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    
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
                {this.handleApiLoaded(map, maps)
              }}
              yesIWantToUseGoogleMapApiInternals={true}
            >
            </GoogleMapReact>
            <div id="legend"></div>
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
