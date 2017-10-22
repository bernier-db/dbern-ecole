import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';

class NavLinks extends React.Component {
	render() {

		return (
			<div className="navLinks">

					<Link to={"home"} activeClassName="activeNavLink"><div>Home</div></Link>


					<Link to={"games"} activeClassName="activeNavLink">	<div>Games</div></Link>

			</div>
		);
	}
}

NavLinks.propTypes = {};

export default NavLinks;
