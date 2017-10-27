import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';

class Breadcrumb extends React.Component {

    render() {
        let isHome = this.props.route == "home";
        let path;
        if (!isHome) {
            const route = this.props.route.split('/');
            path = (<span><Link to={"/home"} className="link">home</Link>{route.map((r) => {
				if (r.charAt(0) === ':')
                    r = this.props.params[r.slice(1)];
                return (' / ' + r)
            })}</span>);
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
