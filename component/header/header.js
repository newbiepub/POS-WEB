import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {user} = this.props;
        let { profile = {} } = user || {};
        return (
            <nav className="white" role="navigation">
                {/*<nav className="white" role="navigation">
                    <div className="nav-wrapper container">
                        <a id="logo-container" href="/" className="brand-logo" style={{fontFamily: 'Roboto',}}>iMart</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#">Đăng Nhập</a></li>
                        </ul>

                        <ul id="nav-mobile" className="sidenav">
                            <li><a href="#">Đăng Nhập</a></li>
                        </ul>
                        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    </div>
                </nav>*/}
                <div className="nav-wrapper container">
                    <a id="logo-container" href="/" className="brand-logo" style={{fontFamily: 'Roboto', fontSize: '3.5em' , color:'#444'}}>iMart</a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    {
                        user === null ?
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a className="modal-trigger" style={{fontFamily: 'Roboto', fontSize: "1em", color:'#444'}} href="#loginModal" >ĐĂNG NHẬP</a></li>
                        </ul>
                            :
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/inventory" style={{fontFamily: "Roboto"}}>NHẬP KHO</a></li>
                                <li><a href="#">{user.profile.name || "No Email"}</a></li>
                            </ul>
                    }
                    {
                        user === null ?
                        <ul className="side-nav" id="mobile-demo">
                            <li><a className="modal-trigger" href="#loginModal">ĐĂNG NHẬP</a></li>
                        </ul>
                            :
                            <ul className="side-nav" id="mobile-demo">
                                <li><a href="/inventory">NHẬP KHO</a></li>
                                <li><a href="#">{user.profile.name || "No Email"}</a></li>
                            </ul>
                    }
                </div>
            </nav>
        )
    }
}

Header.propTypes = {
    user: PropTypes.object
};

Header.defaultProps = {
    user: null
};

export default Header;