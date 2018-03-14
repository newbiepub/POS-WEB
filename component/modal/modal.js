import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={`${this.props.modalId}`} className={`modal ${this.props.typeModal}`}>
                <div className="modal-content">
                    {this.props.modalHeader}
                    {this.props.modalContent}
                </div>
                <div className="modal-footer">
                    {this.props.modalFooter}
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    modalId: PropTypes.string,
    typeModal: PropTypes.string,
    modalHeader: PropTypes.node,
    modalContent: PropTypes.node,
    modalFooter: PropTypes.node
};

Modal.defaultProps = {
    modalId: "myModal",
    typeModal: "",
    modalHeader: null,
    modalContent: null,
    modalFooter: null
};

export default Modal;