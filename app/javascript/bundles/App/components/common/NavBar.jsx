import React from 'react';
import PropTypes from 'prop-types'
import Logo from "./Logo";
import NavLinks from "./NavLinks";
// import Search from "./Search";
import HeaderProfile from "./HeaderProfile";

import MenuIcon from "./MenuIcon";
import {Redirect} from 'react-router'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: {
                backgroundColor: '#333333',
                width: '100%',
                position: 'relative',
                display: 'flex'
            },
            profileActive: false,
            sideBarActive: false
        };
        this.toggleActive = this.toggleActive.bind(this);
        this.toggleSideBarActive = this.toggleSideBarActive.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    toggleActive() {
        this.setState({profileActive: !this.state.profileActive});
    }

    toggleSideBarActive() {
        this.setState({sideBarActive: !this.state.sideBarActive});
    }

    logOut(){
        $.ajax({
            method: "DELETE",
            url: "/users/sign_out",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', auth)
            },
            data:{
                authenticity_token: auth
            },
            success: function(){
                this.props.logOut();
                window.location.href="/";
            }
        });
    }



    render() {
        return (
            <header style={this.state.styles}>


                <MenuIcon isLogged={this.props.isLogged}
                          fill={"#222222"}
                          toggleActive={this.toggleSideBarActive}
                          activeClass={this.state.sideBarActive}
                          logOut ={this.props.logOut}
                />

                <Logo userName={this.props.userName}/>
                <NavLinks/>{/*
				<Search SearchName="headerSearch" />*/}
                <HeaderProfile userName={this.props.userName}
                               activeClass={this.state.profileActive}
                               toggleActive={this.toggleActive}
                                isLogged={this.props.isLogged}
                               logOut={this.props.logOut}

                />


            </header>
        );
    }
}

NavBar.propTypes = {
    userName: PropTypes.string.isRequired,
    isLogged: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired
};

export default NavBar;
