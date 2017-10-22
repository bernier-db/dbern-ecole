import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';

class Breadcrumb extends React.Component {

	render() {
		let isHome = this.props.route == "home";
		let path;
		if (!isHome){
			path = (<span><Link to={"home"} className="link">home</Link> / {this.props.route}</span>);
		}
		else path = (<span>home /</span>);


		return (
			<div className="breadcrumb">
				{path}
			</div>
		);
	}
}

Breadcrumb.propTypes = {
	route: PropTypes.string.isRequired
};

export default Breadcrumb;
