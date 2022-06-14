import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./style.css";
import { BsFillLightbulbFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { baseUrl } from "./utils";

export default class AppView extends Component {
  
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

        console.log(this.state.customersMaker);
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
      const style = { color: "#ff0000", fontSize: "1.2em", fontWeight: 800 };
      return (
        <div>
          <b className="uk-text-bolder" style={style}>
            PT
          </b>
          <br></br>
          <b className="text-red" style={style}>
            {text}
          </b>
          <IoLocationSharp size={30} style={style} />
        </div>
      );
    };

    const MarkerCustomer = ({ text }) => {
      const style = { color: "#f47a00", fontSize: "1.1em", fontWeight: 800 };
      return (
        <div>
          <b style={style}>C</b>
          <br></br>

          <b className="text-red" style={style}>
            {text}
          </b>

          <BsFillLightbulbFill size={20} style={style} />
        </div>
      );
    };

    return (
      <div>
        <p className="uk-margin-remove">
          <a href="/">
            <img
              className="custom-logo"
              src="/images/logo.PNG"
              width="100"
              height="100"
              alt=""
            />
          </a>
        </p>
        <div id="leftbox">
          <center>
            <span className="simple-text">
              <p className="uk-text-small uk-margin-remove">
                <span className="uk-text-bolder" style={this.style}>
                  -{" "}
                </span>
                Transformador de tensão (PT)
              </p>
            </span>
            <div style={{ height: "90vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCqBtkG-T84IReVjb-Ve-0CCMgaOrXxjPM",
                }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
              >
                {//Add a list of Markers to Your Map
                this.state.myMarkers.map((each, key) => (
                  <Marker
                    key={key}
                    lat={each.lat}
                    lng={each.lng}
                    text={each.name}
                  />
                ))}
              </GoogleMapReact>
            </div>
          </center>
        </div>

        <div id="rightbox">
          <center>
            <span className="simple-text">
              <p className="uk-text-small uk-margin-remove">
                <span className="uk-text-bolder" style={this.styleCustomer}>
                  -{" "}
                </span>
                Clientes
              </p>
            </span>
            <div style={{ height: "90vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCqBtkG-T84IReVjb-Ve-0CCMgaOrXxjPM",
                }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
              >
                {//Add a list of Markers to Your Map
                this.state.customersMaker.map((each, key) => (
                  <MarkerCustomer
                    key={key}
                    lat={each.lat}
                    lng={each.lng}
                    text={each.name}
                  />
                ))}
              </GoogleMapReact>
            </div>
          </center>
        </div>
      </div>
    );
  }
}
