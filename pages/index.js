import React from "react";
import Layout from "../component/layout/layout";
import Router from 'next/router';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    static getInitialProps ({req}) {
        // Check If Server-Side-Rendering
        if(!!req) {
            return {user: req.session.user};
        }
        return {};
    }

    render() {
        return (
            <Layout {...this.props}>
                <div style={{
                    marginRight: '30px', marginLeft: "30px",
                    display: "flex", justifyContent: "center", alignItems: 'center', marginTop: "100px"}}>
                    <h2 style={{fontSize: "2em"}}>HỆ THỐNG QUẢN LÝ POS</h2>
                </div>
            </Layout>
        )
    }
}

Index.propTypes = {};

Index.defaultProps = {};

export default Index;