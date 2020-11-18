import React, { Component } from "react";
import { Link } from "react-router-dom";

//subcomponents=

//api

// styled components

class StockPreview extends Component {
  render() {
    const isPositive = this.props.changeToday > 0;
    return (
      <Link to={"stock/" + this.props.stockSymbol}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "33%",
              marginRight: "auto",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#0F1C44",
                marginBottom: "8px",
              }}
            >
              {this.props.stockSymbol}
            </span>
            {this.props.qty && (
              <span style={{ fontSize: "12px" }}>{this.props.qty} Shares</span>
            )}
          </div>
          {/**<div style={{justifyContent:"center", width:"33%"}}>
                    <MiniStockGraph height={30}  width={70} margin={{ top: 0, right: 5, bottom: 0, left: 5 }} />
                </div>
        **/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
            }}
          >
            <span
              style={{
                // fontFamily: ,
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              US${this.props.currentPrice}
            </span>
            <span
              style={{
                // fontFamily: ,
                fontSize: "12px",
                color: isPositive ? "#1CB48D" : "#E84646",
              }}
            >
              <i class={isPositive ? "fa fa-caret-up" : "fa fa-caret-down"}></i>{" "}
              {(this.props.changeToday * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </Link>
    );
  }
}

export default StockPreview;
