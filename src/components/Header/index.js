import React from "react";
import {Link} from "react-router-dom";

export const Header = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <ul className="nav navbar-nav">
                    <li><Link to={"/home"}>Home</Link></li>
                    <li><Link to={"/people"} >People</Link></li>
                    <li><Link to={"/films"} >Films</Link></li>
                    <li><Link to={"/species"} >Species</Link></li>
                    <li><Link to={"/starships"} >Starships</Link></li>
                    <li><Link to={"/vehicles"} >Vehicles</Link></li>
                </ul>
            </div>
        </nav>
    )
}