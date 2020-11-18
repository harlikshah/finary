import React, { Component } from "react";


//subcomponent

//api


// styled components
import {
    Modal,
    Card,
    CardTitle
} from "reactstrap";

class SuccessModal extends Component {


    render() {

        const { orderType, marketPrice, numShares, orderCost } = this.props

        return (
            <Modal
                size="400x400"
                isOpen={this.props.successModalOpen}
            >

                <Card className="card-plain no-transition" style={{ margin: "20px" }}>
                    <CardTitle tag="h5" style={{ marginBottom: "20px" }} ><span style={{ fontSize: "24px", color: "#22346E", fontWeight: "500" }} >Order Complete</span></CardTitle>
                    <div style={{ marginBottom: "20px", border: "2px solid #F8F8F8", display: "flex", flexDirection: "column", justifyContent:"center" }}>
                        <div>
                            <div style={{ marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", marginTop:"20px" }}>
                                <p style={{ width: "30%", marginLeft: "5%", color: "#22346E", fontSize: "14px", fontWeight: "600" }}>{orderType==="buy" ? "Shares Bought" : "Shares Sold"} </p>
                                <p style={{ width: "30%", marginLeft: "auto", color: "#22346E", fontSize: "14px", fontWeight: "600", textAlign: "right", marginRight: "5%", }}>{numShares}</p>
                            </div>
                            <div style={{ marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <p style={{ width: "30%", marginLeft: "5%", marginRight: "auto", color: "#22346E", fontSize: "14px", fontWeight: "600" }}>Market Price</p>
                                <p style={{ width: "30%", marginLeft: "auto", color: "#22346E", fontSize: "14px", fontWeight: "600", textAlign: "right", marginRight: "5%" }}>${marketPrice}</p>
                            </div>
                            <div style={{ marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", marginTop:"20px" }}>
                                <p style={{ width: "30%", marginLeft: "5%", color: "#22346E", fontSize: "14px", fontWeight: "600" }}>Total {orderType==="buy" ? "Cost" : "Credit"} </p>
                                <p style={{ width: "30%", marginLeft: "auto", color: "#22346E", fontSize: "14px", fontWeight: "600", textAlign: "right", marginRight: "5%", }}>${orderCost}</p>
                            </div>
                        </div>
                        <button style={{ width: "80%", fontSize: "16px", fontWeight: "600", textAlign: "center", height: "50px", backgroundColor: "#5C7FEC", color: "#FFFFFF", marginBottom: "30px", border: "none", alignSelf:"center" }}
                            onClick={() => this.props.toggleSuccessModal()}>
                            Done
                            </button>
                    </div>
                </Card>
            </Modal>
        )
    }
}

export default SuccessModal;