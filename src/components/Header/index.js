import React from "react";
import {Link} from "react-router-dom";

export const Header = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <ul className="nav navbar-nav">
                    <li><Link to={"/people"} >People</Link></li>
                    <li><Link to={"/home"}>Home</Link></li>
                </ul>
            </div>
        </nav>
    )
}