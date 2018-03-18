import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";
import API from "../../constants/api";
import InventoryDataTable from "../../features/inventory/inventoryDataTable/index";

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.productData = [];
        this.collapsibleVisible = "open";
        this.state = {
            file: null,
            productData: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            $(document).ready(() => {
                let filePicker = $('#filePicker');
                filePicker.on('change', this.filePickerHandler.bind(this));
                $('.collapsible').collapsible();
            });
        }, 0); // Trigger event when document loaded
    }

    /**
     * Send Product Data to Inventory
     */
    sendProductDataToServer(fromProfile, productData) {
        try {
            let { url: {query}, user, authToken } = this.props;
            let _csrf = query.csrfToken;
            $.ajax({
                url: `http://localhost:3000/web/api/company/inventory/import/csv`,
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'x-authentication': authToken,
                    'x-csrf-token': _csrf,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    fromProfile,
                    productData
                }),
                dataType: 'json',
                error(xhr, statusCode, errorMessage) {
                    console.log("CODE STATUS: ", statusCode);
                },
                success(data, textStatus, xhr) {
                    console.log("TEXT STATUS - ", textStatus);
                }
            })
        } catch (e) {
            alert(e.message)
        }
    }

    /**
     * File Picker Handler
     */
    filePickerHandler() {
        let filePicker = $("#filePicker");
        let file = filePicker[0].files[0];
        let self = this;
        let reader = new FileReader();
        // File reader handler
        reader.onload = async (e) => {
            let data = e.target.result;
            let workbook = XLSX.read(data, {type: 'array'}); // Parse workbook

            let productData = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1); // Convert Workbook sheet to json

            try {
                this.productData = productData;
                this.setState({productData}); // Save product data to showing in tables
                //await this.sendProductDataToServer(productData);
            } catch (e) {
                throw e;
            }
        };
        reader.readAsArrayBuffer(file);
        this.setState({file}); // Update State

    }

    onClick() {
        $("#filePicker").click();
    }

    handleToggleCollapsible() {
        $('.collapsible').collapsible(this.collapsibleVisible, 0);
        this.collapsibleVisible = this.collapsibleVisible === "open" ? 'close' : 'open';
    }

    render() {
        return (
            <div>
                <div className="file-field input-field">
                    <div className="btn" onClick={this.onClick.bind(this)}>
                        <span>File</span>
                        <input id="filePicker" type="file"
                               accept=".xlsx, .xls, .csv"
                               style={{display: "none"}}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input disabled={true} className="file-path" type="text"/>
                    </div>
                </div>
                {
                    this.state.productData.length > 0 &&
                    <ul className="collapsible popout" data-collapsible="accordion">
                        <li onClick={this.handleToggleCollapsible.bind(this)}>
                            <div className="collapsible-header"><i className="material-icons">storage</i>Xem dữ liệu đã nhập</div>
                            <div className="collapsible-body">
                                <InventoryDataTable
                                    data={this.state.productData.map(data => Object.values(data))}
                                    head={Object.keys(this.state.productData[0])}
                                />
                            </div>
                        </li>
                    </ul>
                }

            </div>
        )
    }
}

Uploader.propTypes = {};

Uploader.defaultProps = {};

export default Uploader;