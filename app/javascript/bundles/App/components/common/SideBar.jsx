import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';

const SideBar = (props) => {
	let active = props.activeClass ? " active" : "";

	return (
		<div className={"sideBar" + active}>
			<Link className="menuItem" to={"/"}>Home</Link>
			<Link className="menuItem" to={"games"}>Games</Link>
			<div className="separator"></div>
			{props.isLogged && <div>
				<Link className="menuItem" to={"profile"}>Profile</Link>
				<Link className="menuItem" to={"friends"}>Friends</Link>
				<div className="separator"></div>
				<div className="menuItem" >Log out</div>
			</div>}
			{!props.isLogged && <div className="menuItem" >Register/Login</div>}

		</div>
	);

};

SideBar.propTypes = {
	activeClass: PropTypes.bool.isRequired,
	toggleActive: PropTypes.func.isRequired,
	isLogged: PropTypes.bool.isRequired
};

export default SideBar;
