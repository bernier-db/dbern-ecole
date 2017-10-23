import React from 'react';
import PropTypes from 'prop-types'
import SideBar from './SideBar';

class MenuIcon extends React.Component {
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
        let className = 'menuIcon';
        if (this.props.activeClass)
            className += ' active';
        return (
            <div id='sideMenuContainer' ref={this.setWrapperRef}>
                <div className={className} onClick={this.props.toggleActive}>
                    <svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px">
                        <path
                            d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
                        />
                    </svg>
                </div>
                <SideBar logOut={this.props.logOut} isLogged={this.props.isLogged} activeClass={this.props.activeClass}
                         toggleActive={this.props.toggleActive}/>
            </div>
        );
    }
}

MenuIcon.propTypes = {
    toggleActive: PropTypes.func.isRequired,
    activeClass: PropTypes.bool.isRequired,
    isLogged: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired
};

export default MenuIcon;
