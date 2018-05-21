import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";
import Layout from "../../component/layout/layout";
import Uploader from "../../component/uploader/uploader";
import isEqual from "lodash/isEqual";
import LoadingOverlay from "../../component/loadingOverlay/loadingOverlay";
import lodash from "lodash";
import Helpers from "../../function/function";
import Router from 'next/router';


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
            <div className="row" style={{display: "flex",}}>
                <form className="col s8">
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
                {/*Hướng dẫn cách tải dự liệu vào server*/}
                <div className="col s4 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Hướng dẫn nhập dữ liệu vào kho</span>
                            <p>Bước 1: Nhập dữ liệu từ nhà cung cấp</p>
                            <p>Bước 2: Tải file nhập liệu mẫu</p>
                            <p>Bước 3: Nhập dữ liệu vào file mẫu</p>
                        </div>
                        <div className="card-action">
                            <a href="/static/File_Hang_Mau.xlsx">File mẫu</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: [],
            onSubmit: false
        }
    }

    static getInitialProps({req = {}}) {
        // Check If Server-Side-Rendering
        if (!!req) {
            return {
                user: (req.session || {}).user || null,
                authToken: (req.session || {}).authToken || null
            }
        }
        return {};
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

        this.setState({onSubmit: true});
        for(let index = 0; index  < productData.length; index++) {
            // Convert price to number type
            let importPrice = productData[index]['GIÁ NHẬP (*)'] || 0;
            let salePrice = productData[index]['GIÁ BÁN (*)'] || 0;

            productData[index]['GIÁ NHẬP (*)'] = Helpers.convertPriceToNumber(importPrice);
            productData[index]['GIÁ BÁN (*)'] = Helpers.convertPriceToNumber(salePrice);
        }

        try {
            await productUploader.sendProductDataToServer(fromProfile.getProfile(), productData); // Send Data To Server
            confirm('NHẬP KHO THÀNH CÔNG');
            Router.back();
        } catch (e) {
            console.log(e);
            alert('ĐÃ CÓ LỖI XẢY RA');
        }
        this.setState({onSubmit: false});
    }

    render() {
        return (
            <Layout {...this.props}>
                <div className="container">
                    <div className="section">
                        <h5>HÀNG ĐƯỢC NHẬP TỪ</h5>
                        <div className="divider"/>
                        <div className="">
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
                            disabled={this.state.onSubmit}
                            onClick={this.onSubmitImport.bind(this)}
                            className="btn waves-effect waves-light" type="button">
                            {
                                this.state.onSubmit ?
                                    <div className="preloader-wrapper small active">
                                        <div className="spinner-layer spinner-green-only">
                                            <div className="circle-clipper left">
                                                <div className="circle"></div>
                                            </div>
                                            <div className="gap-patch">
                                                <div className="circle"></div>
                                            </div>
                                            <div className="circle-clipper right">
                                                <div className="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <React.Fragment>
                                        Nhập Hàng
                                        <i className="material-icons right">send</i>
                                    </React.Fragment>
                            }
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