import React from 'react';
import PropTypes from 'prop-types'
import ProfileIcon from "./ProfileIcon";
import ProfileMenu from "./ProfileMenu";
import {Link} from 'react-router';

class HeaderProfile extends React.Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * toggle active if active if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.props.activeClass && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.toggleActive();
        }
    }

    render() {
        let text = this.props.isLogged ?
            <div className="profileButton" onClick={this.props.isLogged ? this.props.toggleActive : () => {
            }}>
                <ProfileIcon/>
                <div className="headerText">this.props.userName</div>
            </div>
            :
            <div className="profileButton" onClick={this.props.isLogged ? this.props.toggleActive : () => {
            }}>
                <ProfileIcon/>
                <Link to="sign_in">
                    <div className="headerText">Login/Register</div>
                </Link>
            </div>;
        let classNames = "headerProfile";

        if (this.props.activeClass) {
            classNames += " active";
        }

        return (

            <div ref={this.setWrapperRef} className={classNames}>
                {this.props.isLogged &&
                <ProfileMenu activeClass={this.props.activeClass} toggleActive={this.props.toggleActive}/>
                }
                {text}
            </div>
        );
    }
}

HeaderProfile.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    toggleActive: PropTypes.func.isRequired,
    activeClass: PropTypes.bool.isRequired

};

export default HeaderProfile;
