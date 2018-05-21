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
                {/*<div style={{
                    marginRight: '30px', marginLeft: "30px",
                    display: "flex", justifyContent: "center", alignItems: 'center', marginTop: "100px"}}>
                    <h2 style={{fontSize: "3.5em", fontFamily: 'Roboto',}}>Hệ Thống Quản Lý Các Điểm Bán Hàng VinMart - iMart</h2>
                </div>*/}

                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <br/>
                                <h1 className="header center teal-text text-lighten-2 title">Hệ Thống Quản Lý Các Điểm
                                    Bán Hàng VinMart - iMart</h1>
                                <div className="row center">
                                    <h5 className="header col s12 light">Tiện Lợi - Tiết Kiệm - Dễ Sử Dụng </h5>
                                </div>
                            <br/>
                        </div>
                    </div>
                    <div className="parallax"><img src={'/static/images/header-pos-background-retail-ead892b2aba31d8bc9ff6c6b2c752ea2.jpg'}
                        alt="POS"/></div>
                </div>
                <div className="container">
                    <div className="section ">
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">devices</i></h2>
                                    <h5 className="center title">Quản Lý Điểm Bán Hàng</h5>

                                    <p className="light">Giúp người quản lý hệ thống có thể kiểm soát những điểm bán
                                        hàng nào đang hoạt động. Điểm bán hàng nào mất kết nối.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">library_books</i>
                                    </h2>
                                    <h5 className="center title">Quản Lý Kho</h5>

                                    <p className="light">Người quản lý có thể kiểm soát lượng hàng hóa tồn đọng kho và
                                        có thể nhập kho bằng cách tải lên 1 tập tin .xlsx hoặc .xls</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="material-icons">insert_chart</i>
                                    </h2>
                                    <h5 className="center title">Thống Kê</h5>

                                    <p className="light">Thống kế tất cả doanh thu của các điểm bán hàng và của cả công
                                        ty. Thống kê các loại hàng được bán ra, thống kế theo thời gian </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container">
                    <div className="section">

                        <div className="row">
                            <div className="col s12 center">
                                {/*<h3><i className="mdi-content-send brown-text"></i></h3>*/}
                                <h4 className="title">Đội Phát Triển</h4>
                                <div className="col s12 m3">
                                    <div className="icon-block contact-us">
                                        <h2 className="center brown-text"><img
                                           src={'/static/images/13254633_1069521633114768_6545374715394787582_o.jpg'}
                                            alt="avatar-person" className="avatar"/></h2>
                                        <h5 className="center">Ng.Hồng Lâm</h5>

                                        <ul className="light info-contact">
                                            <li>Vai trò: Back-end Developer</li>
                                            <li>Email: nguyenhonglam1@dtu.edu.vn</li>
                                            <li>SDT: 01282066863</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col s12 m3">
                                    <div className="icon-block contact-us">
                                        <h2 className="center brown-text"><img
                                            src={'/static/images/26166125_1185779768191246_8057092853813233640_n.jpg'}
                                            alt="avatar-person" className="avatar"/></h2>
                                        <h5 className="center">Ng.Đình Duy</h5>

                                        <ul className="light info-contact">
                                            <li>Vai trò: Front-end Developer</li>
                                            <li>Email: nguyendinhduy.dy@gmail.com</li>
                                            <li>SDT: 01228040527</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col s12 m3">
                                    <div className="icon-block contact-us">
                                        <h2 className="center brown-text"><img
                                            src={'/static/images/13567286_999456993500910_8915081697836022675_n.jpg'}
                                            className="avatar"/></h2>
                                        <h5 className="center">Ng.Vũ Nam Phúc</h5>

                                        <ul className="light info-contact">
                                            <li>Vai trò: Back-end Developer</li>
                                            <li>Email: namphuc.96@gmail.com</li>
                                            <li>SDT: 01282777796</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col s12 m3">
                                    <div className="icon-block contact-us">
                                        <h2 className="center brown-text"><img
                                            src={'/static/images/32916056_1014847731998468_1688310820393451520_n.jpg'}
                                            alt="avatar-person" className="avatar"/></h2>
                                        <h5 className="center">Ng.Xuân Thắng</h5>

                                        <ul className="light info-contact">
                                            <li>Vai trò: Front-end Developer</li>
                                            <li>Email: ngxuanthang1111@gmail.com</li>
                                            <li>SDT: 01204029058</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <footer className="page-footer teal">
                    <div className="container">
                        <div className="row copyright">
                            <div className="col l4 s12" style={{margin: "auto"}}>
                                <p className="grey-text text-lighten-4">Copyright 2018. All right Reserved by
                                    Development Team.</p>
                            </div>

                            <div className="col l4 s12 logo-shop">
                                <a className="white-text footer-logo" href="#!"><img src={'/static/images/shop_logo_big.png'} alt="logo"/></a>
                            </div>
                            <div className="col l4 s12" style={{margin: "auto"}}>
                                <ul className="contact-link text-lighten-4">
                                    <li><a className="white-text" href="#!"><img src={'/static/images/facebook.png'} alt="facebook"/></a>
                                    </li>
                                    <li><a className="white-text" href="#!"><img src={'/static/images/skype.png'} alt="skype"/></a></li>
                                    <li><a className="white-text" href="#!"><img src={'/static/images/google-plus.png'} alt="google"/></a>
                                    </li>
                                    <li><a className="white-text" href="#!"><img src={'/static/images/twitter.png'} alt="twitter"/></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container">
                            Made by <a className="brown-text text-lighten-3" href="http://materializecss.com">Development
                            Team</a>
                        </div>
                    </div>
                </footer>
            </Layout>
        )
    }
}

Index.propTypes = {};

Index.defaultProps = {};

export default Index;