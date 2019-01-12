import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import config from "../../config/config";
import mapStyle from "./mapStyle";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import LoadingSpinner from "./loadingSpinner";

// import * as clusterMarkerImg from '../../../public/img/clusterMarkers/m2.png'

const key = config.mapKey;
const customStyle = mapStyle.styleArray;
const icons = {
  "1":
    "https://res.cloudinary.com/ychaiu/image/upload/c_scale,h_30,w_30/v1546322118/map-marker-orange.png",
  "2":
    "https://res.cloudinary.com/ychaiu/image/upload/c_scale,h_30,w_30/v1546322118/map-marker-blue.png",
  "3":
    "https://res.cloudinary.com/ychaiu/image/upload/c_scale,h_30,w_30/v1546322118/map-marker-purple.png",
  "4":
    "https://res.cloudinary.com/ychaiu/image/upload/c_scale,h_30,w_30/v1546322119/map-marker-dark-green.png",
  "5":
    "https://res.cloudinary.com/ychaiu/image/upload/c_scale,h_30,w_30/v1546322118/map-marker-yellow.png",
  "6":
    "https://res.cloudinary.com/ychaiu/image/upload/c_scale,h_30,w_30/v1546322118/map-marker-red.png",
  "7":
    "https://res.cloudinary.com/ychaiu/image/upload/c_scale,h_30,w_30/v1546322118/map-marker-light-green.png"
};

const loadMarkers = (data, map, maps) => {
  console.log("load markers");
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let eventObj = data[i];
    let marker = new maps.Marker({
      position: new maps.LatLng(eventObj.latitude, eventObj.longitude),
      icon: icons[`${eventObj.haz_id}`],
      map: map
    });
    const contentString = `
      <h3>${eventObj.event_title}</h3><br>
      <b>Last Reported: </b> ${eventObj.datetime_seen}<br><br>
      <b>Description: </b> ${eventObj.description}
      `;
    let infowindow = new maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });
  }
};

class Map extends Component {
  constructor(props) {
    super(props);
    // this.handleApiLoaded = this.handleApiLoaded.bind(this);
    this.state = {
      markers: null
    };
  }

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
      .then(data => this.setState({ markers: data }));
  }

  handleApiLoaded(map, maps) {
    let data = this.state.markers;
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
          newMarker: { lat: lat, lng: lng, map: map }
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

    // let markerCluster = new MarkerClusterer(map, markers,
    //         {imagePath: clusterMarkerImg});
  }

  render() {
    const isMarkersLoaded = this.state.markers;
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
            />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

export default withRouter(Map);
