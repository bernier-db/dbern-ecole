import React from 'react';
import PropTypes from 'prop-types'
import NavBar from "./common/NavBar";
import Breadcrumb from "./common/Breadcrumb";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            user: {
                id: null,
                nom: null,
                prenom: 'Martin',
                email: null
            }
        }
    }


    render() {
        return (
            <div>
                <NavBar className="menuIcon" userName={this.state.user.prenom}/>
                <Breadcrumb route={this.props.routes[this.props.routes.length - 1].path}/>
                <div className="contentPage">{this.props.children}</div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default App;
