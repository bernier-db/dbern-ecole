import React from 'react';
import PropTypes from 'prop-types'

import Slogan from "./Slogan";
import Sitename from "./Sitename";

class Logo extends React.Component {
    render() {
        return (
			<div className="logo">
				<Sitename/>
				<Slogan userName={this.props.userName}/>
			</div>
        );
    }
}
Logo.propTypes = {
	userName: PropTypes.string.isRequired
};

export default Logo;
