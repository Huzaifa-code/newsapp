import React, { Component } from 'react'
// import './NavBar.css'
import { Link } from 'react-router-dom'

export class NavBar extends Component {

  render() {

    const NavStyle = {
        backgroundColor: "#2d3436"
    }

    const NavItem = {
        fontSize: "1rem",
        fontFamily: "sans-serif",
    }


    return (
        <div >
            <nav style={NavStyle} className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid ">
                    <Link className="navbar-brand pt-0" style={{color: "rgb(58, 218, 255)", fontWeight: "700", fontSize: "1.8rem"}} to="/">NewsMonkey</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                        <li style={NavItem} className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li style={NavItem} className="nav-item"> <Link className="nav-link" to="/about">About</Link> </li>
                        <li style={NavItem} className="nav-item"> <Link className="nav-link" to="/business">Business</Link> </li>
                        <li style={NavItem} className="nav-item"> <Link className="nav-link" to="/entertainment">Entertainment</Link> </li>
                        <li style={NavItem} className="nav-item"> <Link className="nav-link" to="/general">General</Link> </li>
                        <li style={NavItem} className="nav-item"> <Link className="nav-link" to="/health">Health</Link> </li>
                        <li style={NavItem} className="nav-item"> <Link className="nav-link" to="/science">Science</Link> </li>
                        <li style={NavItem} className="nav-item"> <Link className="nav-link" to="/sports">Sports</Link> </li>
                        <li style={NavItem} className="nav-item"> <Link className="nav-link" to="/technology">Technology</Link> </li>
                       
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
  }
}

export default NavBar