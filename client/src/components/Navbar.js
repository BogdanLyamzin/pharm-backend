import React from "react";
import {NavLink } from "react-router-dom";


export const Navbar = () =>{

	return(
			<nav>
				<div className="nav-wrapper blue darken-1" style={{padding: " 0 2rem"}}>
					<span className="brand-logo">Admin Users</span>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><NavLink to="/create">Create new user</NavLink></li>
						<li><NavLink to="/links">All users</NavLink></li>
					</ul>
				</div>
			</nav>
	)
}