import React, { Component } from "react";

// styled components
import { Card } from "reactstrap";

class BuySellChart extends Component {
  state = {};

  //TODO: add max size of all components for larger screens
  // The main graph looks good but the side component is too stretched

  render() {
    // this will be a decimal representing the percentages of each
    const {
      marketValue,
      changeToday,
      changeTodayPercent,
      unRealizedPL,
      unRealizedPLPercent,
      costBasis,
      numShares,
    } = this.props;

    return (
      <Card
        className="card-plain"
        style={{ boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.05)", backgroundColor: "#FFFFFF", margin: "20px", padding: "20px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                color: "#22346E",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Your Equity
            </div>
            <p
              style={{ color: "#000000", fontSize: "32px", fontWeight: "600" }}
            >
              ${marketValue}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  color: "#6E7A8A",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Today's Return
              </p>
              {changeToday > 0 ? (
                <p
                  style={{
                    // fontFamily: ,
                    color: "#1CCE98",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  +${changeToday} (+{changeTodayPercent}%)
                </p>
              ) : (
                <p
                  style={{
                    // fontFamily: ,
                    color: "#FC8C73",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  -${Math.abs(changeToday)} ({changeTodayPercent}%)
                </p>
              )}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  color: "#6E7A8A",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Total Return
              </p>

              {unRealizedPL > 0 ? (
                <p
                  style={{
                    // fontFamily: ,
                    color: "#1CCE98",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  +${unRealizedPL} (+{unRealizedPLPercent}%)
                </p>
              ) : (
                <p
                  style={{
                    // fontFamily: ,
                    color: "#FC8C73",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  -${Math.abs(unRealizedPL)} ({unRealizedPLPercent}%)
                </p>
              )}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  color: "#6E7A8A",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Share(s)
              </p>
              <p
                style={{
                  // fontFamily: ,
                  color: "#5C7FEC",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {numShares}
              </p>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  color: "#6E7A8A",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Cost
              </p>
              <p
                style={{
                  // fontFamily: ,
                  color: "#5C7FEC",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                ${costBasis}
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default BuySellChart;
