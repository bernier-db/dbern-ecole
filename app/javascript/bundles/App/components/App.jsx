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
                prenom: null,
                email: null
            }
        }
    }


    render() {
        console.log(this.props.routes);
        let route = this.props.routes[this.props.routes.length - 1].path == undefined ? "" : this.props.routes[this.props.routes.length - 1].path
        return (
            <div>
                <NavBar className="menuIcon" userName={this.state.user.prenom || ""} isLogged={this.state.isLogged}/>
                <Breadcrumb route={route}/>
                <div className="contentPage">{React.cloneElement(this.props.children, { isLogged: this.state.isLogged })}</div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default App;
