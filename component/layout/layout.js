import React from "react";
import Header from "../header/header";
import Login from "../account/login/login";

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /**
         * Initial SideNav
         */
        setTimeout(() => {
            $(document).ready(function(){
                $('.materialboxed').materialbox();
                $(".button-collapse").sideNav();
                $('.modal').modal();
            });
        }, 0)
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <Header user={this.props.user}/>
                {this.props.children}
                <Login {...this.props}/>
            </div>
        )
    }
}

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;