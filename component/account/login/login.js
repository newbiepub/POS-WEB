import React from "react";
import Modal from "../../modal/modal";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
    }


    renderHeader() {
        return (
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <h4 style={{fontFamily: 'Roboto'}}>ĐĂNG NHẬP</h4>
            </div>
        )
    }

    renderContent() {
        return (
            <div className="row">
                <form id="loginForm" className="col s12" method="post" action="/account/login">
                    <input id="_csrf" name="_csrf" type="hidden" value={this.props.url.query.csrfToken} className="validate"/>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">email</i>
                            <input id="icon_prefix" type="email" name="email" className="validate" required={true}/>
                            <label htmlFor="icon_prefix">EMAIL</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock_outline</i>
                            <input id="password" type="password" name="password" className="validate" required={true}/>
                            <label htmlFor="password">MẬT KHẨU</label>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    renderFooter() {
        return (
            <div>
                <a href="#" className="waves-effect modal-close waves-teal btn-flat">HUỶ</a>
                <button type="submit" form="loginForm" className="modal-action waves-effect waves-light btn">ĐĂNG NHẬP</button>
            </div>
        )
    }

    render() {
        return (
            <Modal modalId="loginModal"
                   modalHeader={this.renderHeader()}
                   modalContent={this.renderContent()}
                   modalFooter={this.renderFooter()}
                   typeModal="modal-fixed-footer"/>
        )
    }
}

LoginModal.propTypes = {};

LoginModal.defaultProps = {};

export default LoginModal