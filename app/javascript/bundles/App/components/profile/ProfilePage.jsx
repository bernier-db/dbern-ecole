import React from 'react';
import PropTypes from 'prop-types';

class ProfilePage extends React.Component {
    render() {
        return (
			<div>PROFILEEEEE</div>
        );
    }
}

ProfilePage.propTypes = {
    myProp: PropTypes.string.isRequired
};

export default ProfilePage;
