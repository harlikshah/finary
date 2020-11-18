import React, { Component } from "react";


//subcomponents

//api


// styled components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardImg,
    CardImgOverlay,
    CardLink,
    CardTitle,
    CardSubtitle,
    CardText,
    ListGroupItem,
    ListGroup,
    Input
} from "reactstrap";

class BuySellChart extends Component {
    state = {

    }

    //TODO: add max size of all components for larger screens
    // The main graph looks good but the side component is too stretched

    render() {
        // this will be a decimal representing the percentages of each
        const { buy, hold, sell } = this.props

        return (
            <div style={{ display : "flex", flexDirection : "row", width:"75%", marginTop:"10px", borderRadius:"4px" }}>
                <div style={{ display : "flex", flexDirection : "column",  width: buy + "%" }}>
                    <div style={{ backgroundColor : "#5C7FEC", width:"100%", height:"15px", borderBottomLeftRadius:"100px", borderTopLeftRadius:"100px" }}>
                    </div>
                    <p style={{ color : "#4866C2", fontSize: "10px" }}>
                       {buy}% Buy
                    </p>
                </div>
                <div style={{ display : "flex", flexDirection : "column", width: hold + "%"  }}>
                    <div style={{ backgroundColor : "#A3B7F5", width:"100%",height:"15px",  }}>
                    </div>
                    <p style={{ color : "#4866C2", fontSize: "10px" }}>
                       {hold}% Hold
                    </p>
                </div>
                <div style={{ display : "flex", flexDirection : "column", width: sell + "%"  }}>
                    <div style={{ backgroundColor : "#CCD4DA", width:"100%", height:"15px", borderBottomRightRadius:"100px", borderTopRightRadius:"100px" }}>
                    </div>
                    <p style={{ color : "#4866C2", fontSize: "10px" }}>
                       {sell}% Sell
                    </p>
                </div>
            </div>
        )
    }
}


export default BuySellChart;
