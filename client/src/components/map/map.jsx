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
import SearchBox from '../map/searchBox';
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
        icon: {
          anchor: maps.Point(15, 15),
          url: hazTypes[`${eventObj.haz_id}`]["url"]
        },
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
                    <img id="carousel-image" class="d-block w-100" src="${photoArray[i]}">
                  </div>`
              }
              else {
                carouselHTML +=
                `<div class="carousel-item">
                  <img id="carousel-image" class="d-block w-100" src="${photoArray[i]}"> 
                </div>`
              }
            }
          })
          .then(()=>{
            const contentString = `
            <div id="infowindow-container">
              <div class="infowindow-title">${eventObj.event_title}
              </div>
              
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
              
              <div class="infowindow-category">Date Reported: <span id="infowindow-data">${eventObj.datetime_seen.split(" ",4).join(" ")}</span> </div>
              <div class="infowindow-category">Description: <span id="infowindow-data">${eventObj.description}</span></div> 
              <div class="haztype-flag">
              <img src ="${hazTypes[`${eventObj.haz_id}`]["url"]}" />
              &nbsp;${hazType}
              </div>
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
              $("button[title='Close']").css('top', "10px");
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

    let input = document.getElementById('pac-input')
    let searchBox = new maps.places.SearchBox(input);

    map.controls[maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

    searchBox.addListener('places_changed', function(){
      console.log("searchbox place changed")
      searchBox.set('map', null);


      var places = searchBox.getPlaces();
 
      var bounds = new maps.LatLngBounds();
      var i, place;
      for (i = 0; place = places[i]; i++) {
        (function(place) {
          bounds.extend(place.geometry.location);
 
 
        }(place));
 
      }
      map.fitBounds(bounds);
      searchBox.set('map', map);
      map.setZoom(Math.min(map.getZoom(),12));

    })
    
    let newMarker;
    const placeMarkerAndPanTo = latLng => {
      //window.location.pathname always reads the URL bar
      if (window.location.pathname === "/report-event") {  
        if (newMarker) {
          newMarker.setPosition(latLng);
        } else {
          newMarker = new maps.Marker({
            position: latLng,
            map: map,
            icon: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2238%22%20height%3D%2257%22%20viewBox%3D%220%200%2038%2057%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cdefs%3E%3Cfilter%20x%3D%22-50%25%22%20y%3D%22-50%25%22%20width%3D%22200%25%22%20height%3D%22200%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22a%22%3E%3CfeGaussianBlur%20stdDeviation%3D%223%200%22%20in%3D%22SourceGraphic%22%2F%3E%3C%2Ffilter%3E%3Cpath%20d%3D%22M18.8860735%200C8.61100338%200%20.25126726%207.98542124.25126726%2017.7998965c0%203.2495066.92687906%206.4298405%202.69475502%209.2208772L18.2298042%2049.5147594c.1490785.221996.4018637.3539067.6708531.3539067.2706097%200%20.5217745-.1335194.6724734-.3555153L34.8488105%2026.985383c1.748431-2.765298%202.6720692-5.9424146%202.6720692-9.1854865C37.5208797%207.98542124%2029.1611436%200%2018.8860735%200z%22%20id%3D%22b%22%2F%3E%3Cfilter%20x%3D%22-50%25%22%20y%3D%22-50%25%22%20width%3D%22200%25%22%20height%3D%22200%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22c%22%3E%3CfeGaussianBlur%20stdDeviation%3D%222%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowBlurInner1%22%2F%3E%3CfeOffset%20dy%3D%22-2%22%20in%3D%22shadowBlurInner1%22%20result%3D%22shadowOffsetInner1%22%2F%3E%3CfeComposite%20in%3D%22shadowOffsetInner1%22%20in2%3D%22SourceAlpha%22%20operator%3D%22arithmetic%22%20k2%3D%22-1%22%20k3%3D%221%22%20result%3D%22shadowInnerInner1%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200.450980392%200%200%200%200%200.176470588%200%200%200%200%200.0901960784%200%200%200%200.2%200%22%20in%3D%22shadowInnerInner1%22%2F%3E%3C%2Ffilter%3E%3Cpath%20d%3D%22M26.369446%2018.3953073c0%203.9134615-3.1611233%207.09925-7.0481092%207.09925s-7.0497933-3.1857885-7.0497933-7.09925c0-3.9152365%203.1628074-7.0992501%207.0497933-7.0992501s7.0481092%203.1840136%207.0481092%207.0992501z%22%20id%3D%22d%22%2F%3E%3Cfilter%20x%3D%22-50%25%22%20y%3D%22-50%25%22%20width%3D%22200%25%22%20height%3D%22200%25%22%20filterUnits%3D%22objectBoundingBox%22%20id%3D%22e%22%3E%3CfeGaussianBlur%20stdDeviation%3D%221%22%20in%3D%22SourceAlpha%22%20result%3D%22shadowBlurInner1%22%2F%3E%3CfeOffset%20dy%3D%222%22%20in%3D%22shadowBlurInner1%22%20result%3D%22shadowOffsetInner1%22%2F%3E%3CfeComposite%20in%3D%22shadowOffsetInner1%22%20in2%3D%22SourceAlpha%22%20operator%3D%22arithmetic%22%20k2%3D%22-1%22%20k3%3D%221%22%20result%3D%22shadowInnerInner1%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200.349019608%200%200%200%200%200.137254902%200%200%200%200%200.0705882353%200%200%200%200.2%200%22%20in%3D%22shadowInnerInner1%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M19.0817717%2056.5765766c3.0827274%200%205.5817717-1.9199321%205.5817717-4.2882883C24.6635434%2049.9199321%2022.1644991%2048%2019.0817717%2048S13.5%2049.9199321%2013.5%2052.2882883c0%202.3683562%202.4990443%204.2882883%205.5817717%204.2882883z%22%20fill-opacity%3D%22.13%22%20fill%3D%22%23282C35%22%20filter%3D%22url(%23a)%22%2F%3E%3Cg%3E%3Cuse%20fill%3D%22%23F86820%22%20xlink%3Ahref%3D%22%23b%22%2F%3E%3Cuse%20fill%3D%22%23000%22%20filter%3D%22url(%23c)%22%20xlink%3Ahref%3D%22%23b%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cuse%20fill%3D%22%23BF4C28%22%20xlink%3Ahref%3D%22%23d%22%2F%3E%3Cuse%20fill%3D%22%23000%22%20filter%3D%22url(%23e)%22%20xlink%3Ahref%3D%22%23d%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
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
              position: "fixed",
              bottom: "0px",
              left: "275px",
              right: "0px"
            }}
          >
          <input id="pac-input" class="controls" type="text" placeholder="Search for a Place"/>

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


// access states in store.
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
