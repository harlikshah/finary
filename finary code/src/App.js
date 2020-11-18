import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";

// Navbar
import Navbar from "./components/NavBar"

// Footer
import Footer from "./components/Footer"

// Routes
import Routes from "./pages/routes"


class App extends Component {
  state = {
    auth: true
  }

  render() {
    return (
      <BrowserRouter>
        <div style={{ backgroundColor: "#F8F8F8" }}>
          <Navbar />
          <Routes />
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
