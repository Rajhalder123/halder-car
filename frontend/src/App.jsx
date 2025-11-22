import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import Contact from "./pages/Contact";

import ScheduleDrive from "./pages/ScheduleDrive";
import SellPage from "./pages/SellPage";
import Support from "./pages/Support";
import CarDetails from "./pages/CardDetails";
import EcoFriendlyCars from "./pages/EcoCars";
import eco from "./data/ecoFriendlyCars.json"
import MyAccount from "./pages/MyAccount";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./context/PrivateRoute";
import CarDekho from "./pages/CarDekho";
import ConfirmPurchase from "./pages/PurchaseConfirmation";
import BuyNow from "./pages/BuyNow";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Navbar OUTSIDE Routes */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/confirm-purchase" element={<ConfirmPurchase />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Car-Dekho" element={<CarDekho />} />
        <Route path="/support" element={<Support />} />
        <Route
          path="/sell"
          element={
            <PrivateRoute>
              <SellPage />
            </PrivateRoute>
          }
        />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/schedule-drive" element={<ScheduleDrive />} />
        <Route path="/EcoFrindly-cars" element={<EcoFriendlyCars />} />
        <Route path="/buy/:id" element={<BuyNow cars={eco} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
