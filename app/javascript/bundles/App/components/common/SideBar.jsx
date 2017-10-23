import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';

const SideBar = (props) => {
	let active = props.activeClass ? " active" : "";

	function click(){
		setTimeout(()=>{
            props.toggleActive();
		}, 150);
	}

	return (
		<div className={"sideBar" + active} onClick={click}>
			<Link className="menuItem" to={"/home"} activeClassName="activeSideLink">Home</Link>
			<Link className="menuItem" to={"games"} activeClassName="activeSideLink">Games</Link>
			<div className="separator"></div>
			{props.isLogged && <div>
				<Link className="menuItem ifLogged" to={"/profile"} activeClassName="activeSideLink">Profile</Link>
				<Link className="menuItem ifLogged" to={"/friends"} activeClassName="activeSideLink">Friends</Link>
				<div className="separator"></div>
				<div className="menuItem sideLog" >Log out</div>
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
