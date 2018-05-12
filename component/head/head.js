import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";

class Head extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NextHead>
                <title>{this.props.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                {/*<!--Import Google Icon Font-->*/}
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css?family=Bree+Serif|Lobster|Shrikhand" rel="stylesheet"/>
                <link type="text/css" href="/static/css/style.css" rel="stylesheet"/>
                <link type="text/css" rel="stylesheet" href="/static/css/materialize.min.css"  media="screen,projection"/>
                <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
                {this.props.children}
            </NextHead>
        )
    }
}

Head.propTypes = {
    title: PropTypes.string
};

Head.defaultProps = {
    title: "Point of sales"
};

export default Head;