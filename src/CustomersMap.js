import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./style.css";
import { baseUrl } from "./utils";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

export default function CustomersMap() {
  const [center, setCenter] = useState([]);
  const [myMarkers, setMyMarkers] = useState([]);
  const [clients, setClients] = useState([]);
  const [transformador, setTransformador] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let { id } = useParams();

  const MarkerCustomer = ({ text }) => {
    const onMarkerClick = () => {
      // console.log(text);

      return (
        <div id="modal-close-default" uk-modal>
          <div class="uk-modal-dialog uk-modal-body">
            <button
              class="uk-modal-close-default"
              type="button"
              uk-close
            ></button>
            <h2 class="uk-modal-title">Default</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      );
    };
    const style = {
      background: "none",
      border: "none",
      fontWeight: text === "PT" ? "bolder" : "",
      height: text === "PT" ? "24PX" : "12px",
      width: text === "PT" ? "24PX" : "12px",
      backgroundColor: text === "PT" ? "#000000" : "#f00",
      borderRadius: text === "PT" ? "20%" : "50%",
      color: "#fff",
      display: "inline-block",
    };

    return (
      <div>
        <button
          onClick={onMarkerClick}
          style={style}
          type="button"
          uk-toggle="target: #modal-close-default"
        >
          {text === "PT" ? "PT" : ""}
        </button>
      </div>
    );
  };

  useEffect(() => {
    const getPT = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${baseUrl()}/consumidor/${id}/transformador`
        );
        const trnasformadorData = await fetch(
          `${baseUrl()}/transformador/${id}`
        );
        const transData = await trnasformadorData.json();
        const responseData = await response.json();
        console.log(transData.latitude);
        console.log(transData.longitude);

        setTransformador(transData);
        setClients(responseData);
        setCenter({
          lat: transData.latitude,
          lng: transData.longitude,
        });

        let aMarker = {
          name: "PT",
          lat: transData.latitude,
          lng: transData.longitude,
        };
        // console.log(aMarker);
        myMarkers.push(aMarker);

        for (const element of responseData) {
          const aMarker = {
            name: element.nome,
            lat: element.latitude,
            lng: element.logitude,
          };
          myMarkers.push(aMarker);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getPT();
  }, []);

  return (
    <div>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <p className="uk-margin-remove">
            <a href="/">
              <img
                className="custom-logo"
                src="/images/logo.PNG"
                width="80"
                height="80"
                alt=""
              />
            </a>
          </p>
          <div>
            <center>
              {/* <span className="simple-text"> */}
              <p className="uk-text-lighter uk-margin-remove">
                São &nbsp;
                <span className="uk-text-bolder uk-h3">
                  {clients.length} &nbsp;
                </span>
                Clientes conectados a este Transformador de tensão.
              </p>

              <p>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    height: "12px",
                    width: "12px",
                    backgroundColor: "#f00",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                ></button>{" "}
                Cliente &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button
                  style={{
                    background: "none",
                    border: "none",
                    height: "12px",
                    width: "12px",
                    backgroundColor: "#000",
                    borderRadius: "20%",
                    display: "inline-block",
                  }}
                ></button>{" "}
                Transformador de tensão
              </p>
              {/* </span> */}
              <div style={{ height: "80vh", width: "95%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyBbu1y9QtEhzl3Deh-WWdfwUDtolLOuS3E",
                  }}
                  // 32.4715 -25.9763
                  defaultCenter={center}
                  center={center}
                  defaultZoom={12}
                >
                  {console.log(center)}

                  {//Add a list of Markers to Your Map
                  myMarkers.map((each, key) => (
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
        </>
      )}
    </div>
  );
}
