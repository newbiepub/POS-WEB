import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";
import Layout from "../../component/layout/layout";
import Uploader from "../../component/uploader/uploader";
import isEqual from "lodash/isEqual";
import LoadingOverlay from "../../component/loadingOverlay/loadingOverlay";
import lodash from "lodash";


/**
 * From and To Profile for Inventory Activity
 */
class FormProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            address: "",
            email: "",
            description: ""
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return isEqual(this.state, nextState);
    }

    /**
     * Get Trader Profile
     * @returns {{name: string, phone: string, address: string, email: string, description: string}|*}
     */
    getProfile() {
        return this.state;
    }

    render() {
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                onChange={e => this.setState({name: e.target.value})}
                                type="text" className="validate"/>
                            <label>Tên công ty hoặc doanh nghiệp</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={e => this.setState({phone: e.target.value})}
                                   type="text" className="validate"/>
                            <label>Số Điện Thoại</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                onChange={e => this.setState({address: e.target.value})}
                                type="text" className="validate"/>
                            <label>Địa Chỉ</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                onChange={e => this.setState({email: e.target.value})}
                                type="email" className="validate"/>
                            <label>Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                onChange={e => this.setState({description: e.target.value})}
                                type="text" className="validate"/>
                            <label>Mô Tả</label>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: []
        }
    }

    static getInitialProps({req = {}}) {
        // Check If Server-Side-Rendering
        if (!!req) {
            return {
                user: (req.session || {}).user || null
            }
        }
        return {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !lodash.isEqual(this.state.productData, nextState.productData);
    }

    /**
     * Profile Validator
     */
    profileValidator(profile) {
        let validate = { valid: true, message: "" };
        let emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm); // Email Regex
        let phoneRegex = new RegExp(/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/g); // Phone Number Regex - phone number should be inserted +84 .....

        if(!!profile.email && !emailRegex.test(profile.email))
            Object.assign(validate, {valid: false, message: "Email không hợp lệ"});
        if(!!profile.phone && !phoneRegex.test(profile.phone))
            Object.assign(validate, {valid: false, message: "Số điện thoại không hợp lệ"});

        return validate;
    }

    async onSubmitImport(e) {
        let fromProfile = this.refs["fromProfile"];
        let productUploader = this.refs['productUploader'];
        let productData = productUploader.productData || {};
        // Profile Validation
        let fromProfileValidation = this.profileValidator(fromProfile.getProfile());

        if(!fromProfileValidation.valid) {
            return alert(fromProfileValidation.message);
        }
        if(!Object.keys(productData).length) {
            return alert("Xin mời tải lên file sản phẩm");
        }

        console.log("FROM PROFILE - ", fromProfile.getProfile());
        console.log("PRODUCT DATA - ", productData);
        productUploader.sendProductDataToServer(productData); // Send Data To Server
    }

    render() {
        return (
            <Layout {...this.props}>
                <div className="container">
                    <div className="section">
                        <h5>HÀNG ĐƯỢC NHẬP TỪ</h5>
                        <div className="divider"/>
                        <div className="container">
                            <FormProfile ref="fromProfile"/>
                        </div>
                    </div>
                    <div className="section">
                        <h5>TẢI FILE NHẬP HÀNG (ĐỊNH DẠNG .xlsx hoặc .csv)</h5>
                        <div className="divider"/>
                        <div className="row">
                            <Uploader ref="productUploader" {...this.props}/>
                        </div>
                    </div>
                    <div className="divider"/>
                    <div className="container" style={{margin: "20px 0"}}>
                        <button
                            onClick={this.onSubmitImport.bind(this)}
                            className="btn waves-effect waves-light" type="button">
                            Nhập Hàng
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </Layout>
        )
    }
}

Index.propTypes = {};

Index.defaultProps = {};

export default Index