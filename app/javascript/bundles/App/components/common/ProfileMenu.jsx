import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router';


class ProfileMenu extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let active = this.props.activeClass ? " active" : "";

        return (
            <div className={"profileMenu" + active}>
                <Link className="menuItem" to={"profile"} activeClassName={""}>Profile</Link>
                <Link className="menuItem" to={"friends"} activeClassName={""}>Friends</Link>
                <div className="menuItem" onClick={this.props.logOut}>Logout</div>
            </div>
        );
    }
}

ProfileMenu.propTypes = {
    activeClass: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired
};

export default ProfileMenu;
