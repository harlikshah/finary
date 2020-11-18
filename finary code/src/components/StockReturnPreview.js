import React, { Component } from "react";


//subcomponents=


//api


// styled components


class StockPreview extends Component {
    state = {

    }

    render() {

        const isPositive = this.props.changeToday > 0

        const { priceBought, currentPrice } = this.props
        
        return (
            
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <div style={{display:"flex", flexDirection:"column", width: "33%", marginRight: "auto"}}>
                    <span style={{fontSize:"14px", fontWeight:"500"}} >{this.props.stockSymbol}</span>
                    <span style={{fontSize:"12px" }}>{this.props.qty} Shares</span>
                </div>
                {/**<div style={{justifyContent:"center", width:"33%"}}>
                    <MiniStockGraph height={30}  width={70} margin={{ top: 0, right: 5, bottom: 0, left: 5 }} />
                </div>
        **/}
                <div style={{display:"flex", flexDirection:"column", width:"33%", textAlign:"right"}}>
                    <span style={{fontSize:"14px"}}>US${this.props.currentPrice}</span>
                    <span style={{fontSize:"12px", color: isPositive ? "#1CB48D" : "#E84646" }}><i class={isPositive ? "fa fa-caret-up" :"fa fa-caret-down"}></i> {(this.props.changeToday * 100).toFixed(2)}%</span>
                </div>

            </div>
        )
    }
}


export default StockPreview;