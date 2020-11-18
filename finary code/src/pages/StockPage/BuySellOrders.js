import React, { Component } from "react";

//subcomponents
import NewStockPost from "./NewStockPost";

//api
import alpacaApi from "../../api/alpaca";

// styled components
import { Card, CardTitle, Input } from "reactstrap";

class BuySellOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buy",
      numberShares: 0,
      reviewingOrder: false,
      orderPlaced: false,
      stockPostOpen: false,
      loading: false,
    };
    this.api = alpacaApi();
  }

  calculateNextOpen = (nextOpen) => {
    const now = Date.now();
    const next = Date.parse(nextOpen);
    const hours = Math.floor(Math.abs(next - now) / 36e5);
    return hours;
  };

  buySellStock = async (side, qty) => {
    this.setState({ loading: true });
    await this.props.refreshPositions(this.props.stockSymbol);
    await this.api.createOrder(side, this.props.stockSymbol, qty);
    this.setState({ loading: false, orderPlaced: true, stockPostOpen: true });
  };

  changeTab(nextTab) {
    this.setState({ currentTab: nextTab });
  }

  startReviewing() {
    this.setState({ reviewingOrder: true });
  }

  closeStockPostOption() {
    this.setState({ stockPostOpen: false });
  }

  changeShares(newValue) {
    this.setState({ numberShares: newValue });
  }

  render() {
    const { stockSymbol, sharePrice, buyingPower, sharesOwned } = this.props;
    const nextOpen = this.calculateNextOpen(this.props.nextOpen);
    const roundedBuyingPower = parseFloat(buyingPower).toFixed(2);

    if (this.props.isOpen) {
      if (!this.state.orderPlaced) {
        return (
          <div>
            <Card
              className="card-plain no-transition"
              style={{
                margin: "20px",
                padding: "20px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardTitle tag="h5" style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#22346E",
                    fontWeight: "500",
                    marginLeft: "20px",
                  }}
                >
                  Trade {stockSymbol}
                </span>
              </CardTitle>
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "Row",
                  }}
                >
                  <button
                    onClick={() => this.changeTab("buy")}
                    style={{
                      height: "60px",
                      padding: "0",
                      fontSize: "20px",
                      border: "none",
                      background: "none",
                      color: "#22346E",
                      fontWeight: "600",
                      marginLeft: "10%",
                      marginRight: "15%",
                      borderBottom:
                        this.state.currentTab === "buy"
                          ? "4px solid #22346E"
                          : "none",
                    }}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => this.changeTab("sell")}
                    style={{
                      height: "60px",
                      padding: "0",
                      fontSize: "20px",
                      border: "none",
                      background: "none",
                      color: "#22346E",
                      fontWeight: "600",
                      borderBottom:
                        this.state.currentTab === "sell"
                          ? "4px solid #22346E"
                          : "none",
                    }}
                  >
                    Sell
                  </button>
                </div>

                {this.state.currentTab === "buy" && (
                  <div>
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          width: "30%",
                          marginLeft: "10%",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Shares
                      </p>
                      <Input
                        onChange={(event) =>
                          this.changeShares(event.target.value)
                        }
                        style={{
                          // fontFamily: ,
                          backgroundColor: "#F5F6F7",
                          width: "50%",
                          margin: "0px",
                          textAlign: "right",
                          marginRight: "10%",
                          borderColor: "transparent",
                          borderRadius: "2px",
                        }}
                        id="shareNum"
                        placeholder="0"
                        type="number"
                        min="0"
                        value={this.state.numberShares}
                      ></Input>
                    </div>
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        borderBottom: "2px solid #F8F8F8",
                        paddingBottom: "20px",
                      }}
                    >
                      <p
                        style={{
                          width: "30%",
                          marginLeft: "10%",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Market Price
                      </p>
                      <p
                        style={{
                          // fontFamily: ,
                          width: "30%",
                          marginLeft: "auto",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                          textAlign: "right",
                          marginRight: "10%",
                        }}
                      >
                        ${sharePrice}
                      </p>
                    </div>
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          width: "30%",
                          marginLeft: "10%",
                          marginRight: "auto",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Total Cost
                      </p>
                      <p
                        style={{
                          // fontFamily: ,
                          width: "30%",
                          marginLeft: "auto",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                          textAlign: "right",
                          marginRight: "10%",
                        }}
                      >
                        ${(this.state.numberShares * sharePrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}

                {this.state.currentTab === "sell" && (
                  <div>
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          width: "30%",
                          marginLeft: "10%",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Shares
                      </p>
                      <Input
                        onChange={(event) =>
                          this.changeShares(event.target.value)
                        }
                        style={{
                          // fontFamily: ,
                          backgroundColor: "#F5F6F7",
                          width: "50%",
                          margin: "0px",
                          textAlign: "right",
                          marginRight: "10%",
                        }}
                        id="shareNum"
                        placeholder="0"
                        type="number"
                        min="0"
                        value={this.state.numberShares}
                      ></Input>
                    </div>
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        borderBottom: "2px solid #F8F8F8",
                        paddingBottom: "20px",
                      }}
                    >
                      <p
                        style={{
                          width: "30%",
                          marginLeft: "10%",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Market Price
                      </p>
                      <p
                        style={{
                          // fontFamily: ,
                          width: "30%",
                          marginLeft: "auto",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                          textAlign: "right",
                          marginRight: "10%",
                        }}
                      >
                        ${sharePrice}
                      </p>
                    </div>
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          width: "30%",
                          marginLeft: "10%",
                          marginRight: "auto",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Total Credit
                      </p>
                      <p
                        style={{
                          // fontFamily: ,
                          width: "30%",
                          marginLeft: "auto",
                          color: "#22346E",
                          fontSize: "14px",
                          fontWeight: "600",
                          textAlign: "right",
                          marginRight: "10%",
                        }}
                      >
                        ${(this.state.numberShares * sharePrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
                {!this.state.reviewingOrder && (
                  <div>
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        borderBottom: "2px solid #F8F8F8",
                      }}
                    >
                      <button
                        style={{
                          width: "80%",
                          fontSize: "16px",
                          fontWeight: "600",
                          textAlign: "center",
                          height: "50px",
                          backgroundColor: "#5C7FEC",
                          color: "#FFFFFF",
                          marginBottom: "30px",
                          border: "none",
                        }}
                        onClick={() => this.startReviewing()}
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}
                {this.state.reviewingOrder && (
                  <div
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      borderBottom: "2px solid #F8F8F8",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      {this.state.currentTab === "buy" && (
                        <p
                          style={{
                            color: "#22346E",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginLeft: "10%",
                            marginRight: "10%",
                          }}
                        >
                          {" "}
                          You are placing an order to buy{" "}
                          {this.state.numberShares} shares of {stockSymbol}{" "}
                          based on the current market price of ${sharePrice}.
                          The money will be withdrawn directly from your Finary
                          balance.
                        </p>
                      )}
                      {this.state.currentTab === "sell" && (
                        <p
                          style={{
                            color: "#22346E",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          {" "}
                          You are placing an order to sell{" "}
                          {this.state.numberShares} shares of {stockSymbol}{" "}
                          based on the current market price of ${sharePrice}.
                          The money will be deposited directly into your Finary
                          balance.
                        </p>
                      )}
                    </div>
                    <button
                      style={{
                        width: "80%",
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "center",
                        height: "50px",
                        backgroundColor: "#5C7FEC",
                        color: "#FFFFFF",
                        marginBottom: "30px",
                        border: "none",
                      }}
                      onClick={() =>
                        this.buySellStock(
                          this.state.currentTab,
                          this.state.numberShares
                        )
                      }
                    >
                      {!this.state.loading ? (
                        "Place Order"
                      ) : (
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ marginRight: "5px" }}
                        />
                      )}
                    </button>
                  </div>
                )}

                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#22346E",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    {this.state.currentTab === "buy"
                      ? "$" + roundedBuyingPower + " Buying Power Available"
                      : sharesOwned +
                        " Share" +
                        (sharesOwned !== 1 ? "s" : "") +
                        "  Available"}{" "}
                  </p>
                </div>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              ></div>
            </Card>
            {this.state.stockPostOpen && (
              <NewStockPost
                side={this.state.currentTab}
                cost={this.props.currentPosition ? this.props.currentPosition.avg_entry_price : 0}
                stockSymbol={this.props.stockSymbol}
                closeStockPostOption={this.closeStockPostOption}
                refreshPosts={this.props.refreshPosts}
                stockPrice={sharePrice}
                qty={this.state.qty}
                dateBought={Date.now()}
              />
            )}
          </div>
        );
      } else {
        return (
          <div>
            <Card
              className="card-plain no-transition"
              style={{ margin: "20px", backgroundColor: "#FFFFFF" }}
            >
              <CardTitle tag="h5" style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#22346E",
                    fontWeight: "500",
                    marginLeft: "5%",
                  }}
                >
                  Order Complete
                </span>
              </CardTitle>
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <p
                      style={{
                        width: "30%",
                        marginLeft: "5%",
                        color: "#22346E",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {this.state.currentTab === "buy"
                        ? "Shares Bought"
                        : "Shares Sold"}{" "}
                    </p>
                    <p
                      style={{
                        // fontFamily: ,
                        width: "30%",
                        marginLeft: "auto",
                        color: "#22346E",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "right",
                        marginRight: "5%",
                      }}
                    >
                      {this.state.numberShares}
                    </p>
                  </div>
                  <div
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        width: "30%",
                        marginLeft: "5%",
                        marginRight: "auto",
                        color: "#22346E",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Market Price
                    </p>
                    <p
                      style={{
                        // fontFamily: ,
                        width: "30%",
                        marginLeft: "auto",
                        color: "#22346E",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "right",
                        marginRight: "5%",
                      }}
                    >
                      ${sharePrice}
                    </p>
                  </div>
                  <div
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <p
                      style={{
                        width: "30%",
                        marginLeft: "5%",
                        color: "#22346E",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Total{" "}
                      {this.state.currentTab === "buy" ? "Cost" : "Credit"}{" "}
                    </p>
                    <p
                      style={{
                        // fontFamily: ,
                        width: "30%",
                        marginLeft: "auto",
                        color: "#22346E",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "right",
                        marginRight: "5%",
                      }}
                    >
                      ${sharePrice * this.state.numberShares}
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    width: "80%",
                    fontSize: "16px",
                    fontWeight: "600",
                    textAlign: "center",
                    height: "50px",
                    backgroundColor: "#5C7FEC",
                    color: "#FFFFFF",
                    marginBottom: "30px",
                    border: "none",
                    alignSelf: "center",
                  }}
                  onClick={() => this.setState({ orderPlaced: false })}
                >
                  Done
                </button>
              </div>
            </Card>
            <NewStockPost
              side={this.state.currentTab}
              cost={this.props.currentPosition ? this.props.currentPosition.avg_entry_price : 0}
              stockSymbol={this.props.stockSymbol}
              closeStockPostOption={this.closeStockPostOption}
              refreshPosts={this.props.refreshPosts}
              stockPrice={sharePrice}
              qty={this.state.numberShares}
            />
          </div>
        );
      }
    } else {
      return (
        <Card
          className="card-plain no-transition"
          style={{
            margin: "20px",
            padding: "20px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <CardTitle tag="h5" style={{ marginBottom: "20px" }}>
            <span
              style={{ fontSize: "24px", color: "#22346E", fontWeight: "500" }}
            >
              Trade {stockSymbol}
            </span>
          </CardTitle>
          <img
            style={{ overflow: "hidden" }}
            alt="..."
            src={require("../../assets/img/finary-spaceship.png")}
          />
          <p
            style={{ textAlign: "center", color: "#22346E", fontWeight: "500" }}
          >
            Sorry, the market is closed right now. It opens again in {nextOpen}{" "}
            hours!
          </p>
          
        </Card>
      );
    }
  }
}

export default BuySellOrders;
