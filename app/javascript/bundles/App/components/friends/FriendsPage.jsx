import React from 'react';
import PropTypes from 'prop-types';

class FriendsPage extends React.Component {
    render() {
        return (
			<div>Friends!</div>
        );
    }
}
FriendsPage.propTypes = {
    myProp: PropTypes.string.isRequired
};

export default FriendsPage;
