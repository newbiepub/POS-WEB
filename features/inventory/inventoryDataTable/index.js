import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";

class InventoryDataTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className="highlight centered">
                <thead>
                    <tr>
                        {this.props.head.map((item, index) => {
                            return <th key={index}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((item, index) => {
                        return (
                            <tr key={index}>
                                {item.map((data, i) => <td key={i}>{data}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

InventoryDataTable.propTypes = {
    head: PropTypes.array,
    data: PropTypes.array
};

InventoryDataTable.defaultProps = {
    head: [],
    data: []
};

export default InventoryDataTable