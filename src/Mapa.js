import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./style.css";
import { baseUrl } from "./utils";

export default class AppViewSingle extends Component {
  constructor() {
    super();


    this.state = {
      center: {
        lat: -25.967,
        lng: 32.583,
      },
      zoom: 11,
      myMarkers: [],
      customersMaker: [],
    };

    this.style = { color: "#ff0000", fontSize: "1.5em" };
    this.styleCustomer = { color: "#f47a00", fontSize: "1.5em" };
  }


  componentDidMount() {

    const getPT = async () => {
      try {
        // setIsLoading(true);
        const response = await fetch(`${baseUrl()}/tranformador`);
        const responseData = await response.json();
        // setTransformadores(responseData);
        // console.log(responseData);
        for (const element of responseData) {
          const aMarker = {
            name: element.potencia,
            lat: element.latitude,
            lng: element.longitude,
          };
          this.state.myMarkers.push(aMarker);
        }
        this.setState({ myMarkers: this.state.myMarkers });

        // console.log(this.state.myMarkers)
        // this.state.myMarkers.push(aMarker);
      } catch (error) {
        console.error(error);
      }
    };
    getPT();

    const getClients = async () => {
      try {
        // setIsLoading(true);
        const response = await fetch(`${baseUrl()}/consumidor`);
        const responseData = await response.json();
        // setTransformadores(responseData);
        // console.log(responseData);
        let aMarkerCust = {};
        for (const element of responseData) {
          aMarkerCust = {
            name: element.contador,
            lat: element.latitude,
            lng: element.logitude,
          };
          this.state.customersMaker.push(aMarkerCust);
        }
        this.setState({ customersMaker: this.state.customersMaker });

        // console.log(this.state.customersMaker);
        // this.state.makersPT.push(aMarker);
      } catch (error) {
        console.error(error);
      }
    };
    getClients();
  }
  render() {


    //Marker Component
    const Marker = ({ text }) => {
      const style = { color: "#ff0000", fontSize: "1em", fontWeight: 900 };
      return (
        <div>
          <b style={style}>
            !!!!
          </b>
          <span uk-icon="icon: location; ratio: 1.2" style={style}></span>
          <span className="text-red" style={style}>
            {text}
          </span>
        </div>
      );
    
    };

    return (
      <div>
          <center>
            <div style={{ height: "70vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBgDPB1CcUivyM102q7ifXMGDJmK9mK9p8",
                }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
              >
                {/* lat: this.props.lat,
                  lng: this.props.lng} */}
                  <Marker
                    key={this.props.id}
                    lat={ this.props.lat}
                    lng={this.props.lng}
                    text={this.props.name}
                  />
              </GoogleMapReact>
            </div>
          </center>
      </div>
    );
  }
}
