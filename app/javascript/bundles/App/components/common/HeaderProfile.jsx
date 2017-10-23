import React from 'react';
import PropTypes from 'prop-types'
import ProfileIcon from "./ProfileIcon";
import ProfileMenu from "./ProfileMenu";

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
        let text = this.props.isLogged ? this.props.userName : "Login/Register";
        let classNames = "headerProfile";

        if (this.props.activeClass) {
            classNames += " active";
        }

        return (

            <div ref={this.setWrapperRef} className={classNames}>
                {this.props.isLogged &&
                <ProfileMenu activeClass={this.props.activeClass} toggleActive={this.props.toggleActive}/>
                }
                <div className="profileButton" onClick={this.props.isLogged ? this.props.toggleActive : ()=>{alert('log');}}>
                    <ProfileIcon/>
                    <span className="headerText">
					{text}
				</span>
                </div>

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
