import React from 'react';
import PropTypes from 'prop-types'
import Logo from "./Logo";
import NavLinks from "./NavLinks";
// import Search from "./Search";
import HeaderProfile from "./HeaderProfile";

import MenuIcon from "./MenuIcon";
import SideBar from "./SideBar";

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
    }

    toggleActive() {
        this.setState({profileActive: !this.state.profileActive});
    }

    toggleSideBarActive() {
        this.setState({sideBarActive: !this.state.sideBarActive});
    }


    render() {


        return (
            <header style={this.state.styles}>


                <MenuIcon isLogged={this.props.userName != null || this.props.userName !== ""} fill={"#222222"}
                          toggleActive={this.toggleSideBarActive} activeClass={this.state.sideBarActive}/>

                <Logo userName={this.props.userName}/>
                <NavLinks/>{/*
				<Search SearchName="headerSearch" />*/}
                <HeaderProfile userName={this.props.userName} activeClass={this.state.profileActive}
                               toggleActive={this.toggleActive}/>


            </header>
        );
    }
}

NavBar.propTypes = {
    userName: PropTypes.string.isRequired
};

export default NavBar;
