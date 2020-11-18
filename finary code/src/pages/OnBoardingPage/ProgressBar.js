import React, { Component } from "react";


//subcomponents

//api


class BuySellChart extends Component {
    state = {
    }

    render() {
        // this will be a decimal representing the percentages of each
        const { currentStep } = this.props
        const numSteps = 4;

        const progressPercentage = String((currentStep / numSteps) * 100)
        const remainingPercentage = String((1 - currentStep / numSteps) * 100)

        return (
            <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "10px", padding: "75px" }}>
                <div style={{ width: progressPercentage + "%", height: "15px", backgroundColor: "#5C7FEC", borderRadius: "100px", borderBottomLeftRadius: "100px", borderTopLeftRadius: "100px", zIndex: "1" }}>
                </div>
                <div style={{ width: remainingPercentage + "%", height: "15px", backgroundColor: "#DCDCDC", borderBottomRightRadius: "100px", borderTopRightRadius: "100px", transform: "translateX(-20px)", zIndex: "0" }}>
                </div>
            </div>
        )
    }
}


export default BuySellChart;