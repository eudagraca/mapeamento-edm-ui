import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Areas from "./Area";
import Consumidor from "./Cliente";
import CustomerDetails from "./CustomerDetails";
import ListCustomers from "./ListOfCustomers";
import ListPT from "./ListOfPTs";
import MapView from "./MapView";
import Transformador from "./Transformador";
import CustomersMap from "./CustomersMap";

export function AppRoutes() {
  // const [currentUser, setCurrentUser] = useState();
  // setCurrentUser(localStorage.getItem("accessToken"));

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PublicRoute />}>
          <Route path="accounts/login" element={<Login />} />
        </Route> */}

        <Route path="mapa" element={<MapView />} />
        <Route path="/" element={<App />} />
        <Route path="consumidor" element={<Consumidor />} />
        <Route path="transformador" element={<Transformador />} />
        <Route path="area" element={<Areas />} />
        <Route path="transformadores" element={<ListPT />} />
        <Route path="consumidores" element={<ListCustomers />} />
        <Route path="consumidor/:id" element={<CustomerDetails />} />
        <Route path="transformador/:id" element={<CustomersMap />} />
      </Routes>
    </Router>
  );
}
