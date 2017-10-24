import React from 'react';
import PropTypes from 'prop-types'
import NavBar from "./common/NavBar";
import Breadcrumb from "./common/Breadcrumb";

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

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
        };
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        $.ajax({
            url: 'auth/is_signed_in',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            success: function (data) {
                console.log(data);

                this.setUser({
                    isLogged: data.signed_in,
                    user: {
                        prenom: data.signed_in ? data.user.prenom : null,
                        nom: data.signed_in ? data.user.nom : null,
                        email: data.signed_in ? data.user.email : null,
                        id: data.signed_in ? data.user.id : null
                    }
                })
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
                console.debug('App - logout', res);
                this.setState({
                    isLogged: false,
                    user: {
                        prenom: null,
                        nom: null,
                        id: null,
                        email: null
                    }
                });
            }.bind(this)
        });
    }

    setUser(state) {
        this.setState({
            user: state.user,
            isLogged: state.isLogged
        })
    }

    render() {
        console.log(this.props.routes);
        let route = this.props.routes[this.props.routes.length - 1].path == undefined ? "" : this.props.routes[this.props.routes.length - 1].path
        return (
            <div>
                <NavBar logOut={this.logout} className="menuIcon" userName={this.state.user.prenom || ""}
                        isLogged={this.state.isLogged}/>
                <Breadcrumb route={route}/>
                <div
                    className="contentPage">
                    {React.cloneElement(this.props.children,
                        {
                            setSigned_in: this.setUser.bind(this),
                            isLogged: this.state.isLogged,
                            redirect: this.redirect.bind(this)
                        }
                    )}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default App;
