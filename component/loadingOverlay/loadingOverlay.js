import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";

class LoadingOverlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                position: "absolute", top: 0, right: 0, left: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)"}}>
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

LoadingOverlay.propTypes = {};

LoadingOverlay.defaultProps = {};

export default LoadingOverlay;