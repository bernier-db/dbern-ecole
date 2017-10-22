import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const Sitename = (props) => {

    return (
		<Link to={"/"} className="SiteNameLogo"><span>D<span style={{fontSize: '50px', marginLeft:'-10px'}}>.</span>Bern</span></Link>
    );
};

Sitename.propTypes = {

};

export default Sitename;
