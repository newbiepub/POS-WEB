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
            <nav style={{backgroundColor: "#444", padding: "0 15px"}}>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">POS</a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    {
                        user === null ?
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a className="modal-trigger" href="#loginModal">ĐĂNG NHẬP</a></li>
                        </ul>
                            :
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/inventory">NHẬP KHO</a></li>
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