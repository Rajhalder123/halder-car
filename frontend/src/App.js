import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/signIn';
import Contact from './pages/Contact';
import Raj from './pages/Raj';
import NewCar from './pages/Newcar'; 
import SellPage from './pages/SellPage';
import Support from './pages/Support';
import CarDetails from './pages/CardDetails';
import EcoFriendlyCars from './pages/EcoCars';
import MyAccount from './pages/MyAccount';
import Navbar from './pages/Navbar';


function App() {
  return (
    <BrowserRouter>
      {/* ✅ Navbar OUTSIDE Routes */}
  

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/raj" element={<Raj />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/new-cars" element={<NewCar />} />
        <Route path="/support" element={<Support />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/navbar" element={<Navbar/>}/>

        <Route path="/upcoming-cars" element={<EcoFriendlyCars />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
