import React from 'react';
import PropTypes from 'prop-types'
import NavBar from "./common/NavBar";
import Breadcrumb from "./common/Breadcrumb";

var Router = require('react-router');

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
            },
            loaded: false
        };
        this.logout = this.logout.bind(this);
        this.setUser = this.setUser.bind(this);
        this.redirect =this.redirect.bind(this);
    }

    componentWillMount() {
        $.ajax({
            url: '/auth/is_signed_in',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            success: function (data) {
                this.setState({
                    isLogged: data.signed_in,
                    user: {
                        prenom: data.signed_in ? data.user.prenom : null,
                        nom: data.signed_in ? data.user.nom : null,
                        email: data.signed_in ? data.user.email : null,
                        id: data.signed_in ? data.user.id : null
                    },
                    loaded: true
                });
            }.bind(this)
        });
    }

    redirect(path){
        Router.browserHistory.push(path);
    }

    logout() {
        $.ajax({
            method: "DELETE",
            url: "/users/sign_out",
            data:{authenticity_token: auth},
            success: function (res) {
                this.setState({
                    isLogged: false,
                    user: {
                        prenom: null,
                        nom: null,
                        id: null,
                        email: null
                    },
                });
                this.redirect("/sign_in");
            }.bind(this)
        });
    }

    setUser(state, callback) {
        this.setState({
            user: state.user,
            isLogged: state.isLogged
        }, callback)
    }

    render() {
        let route = this.props.routes[this.props.routes.length - 1].path === undefined ? "" : this.props.routes[this.props.routes.length - 1].path
        return (
            <div>
                <NavBar logOut={this.logout} className="menuIcon" userName={this.state.user.prenom || ""}
                        isLogged={this.state.isLogged}/>
                <Breadcrumb route={route} params={this.props.params}/>
                {this.state.loaded ?
                <div
                    className="contentPage">
                    {
                        React.cloneElement(this.props.children,
                        {
                            setSigned_in: this.setUser,
                            isLogged: this.state.isLogged,
                            redirect: this.redirect,
                            user: this.state.user
                        })
                    }
                </div> : 'loading...'}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default App;
