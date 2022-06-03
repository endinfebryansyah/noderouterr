import React from 'react'
import Main from "./Main";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

class App extends React.Component {
  render() {
    return (
      <div> 
        <Nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fs-4 ms-4" to="/">
            <h5>React List</h5>
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/Lingkungan">Lingkungan Hidup</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/Cart">Produk</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/cart2">Keranjang</Link>
                </li>
              </ul>
            </div>
          </div>
        </Nav>
        <Main/>
      </div>
    );
  }
}

export default App;