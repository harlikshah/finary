import React, { Component } from "react";
import { getComments } from "../api/firebase";
import TextareaAutosize from "react-autosize-textarea";
import moment from "moment";

//subcomponents
import Comment from "./Comment";
import ComponentLoading from "./ComponentLoading";

//api
import { createComment } from "../api/firebase";

//assets
import Pending from "../assets/Pending.png";
import Completed from "../assets/completed.png";

// styled components
import { Card, CardTitle, ListGroupItem, ListGroup, Modal } from "reactstrap";

class OrderPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: {},
      currentOrderModalOpen: false,
    };
    this.setCurrentOrder = this.setCurrentOrder.bind(this);
  }

  setCurrentOrder = (index) => {
    const currentOrder = this.props.orders[index];
    this.setState({ currentOrder: currentOrder, currentOrderModalOpen: true });
  };

  render() {
    const { orders } = this.props;

    return (
      <Card
        className="no-transition card-plain"
        style={{
          margin: "12px 0px 12px 16px",
          padding: "20px",
          paddingTop: "0px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <CardTitle tag="h5" style={{ marginBottom: "20px" }}>
          <span
            style={{
              fontSize: "24px",
              color: "#22346E",
              fontWeight: "500",
            }}
          >
            Recent Transactions
          </span>
        </CardTitle>

        <ListGroup flush>
          {orders.map((order, i) => {
            return (
              <ListGroupItem
                style={{
                  paddingLeft: "0px",
                  cursor: "pointer",
                  borderTop: "1px solid #F8F8F8",
                }}
                key={i}
                onClick={() => this.setCurrentOrder(i)}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    src={order.status === "filled" ? Completed : Pending}
                    style={{
                      width: "42px",
                      height: "42px",
                      alignSelf: "center",
                    }}
                  ></img>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "5%",
                      maginBottom: "0px",
                    }}
                  >
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      {order.side === "buy" ? "Bought" : "Sold"} {order.symbol}
                    </p>
                    <p style={{ fontSize: "12px", color: "#404B5A" }}>
                      {order.qty} Shares
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: order.status === "filled" ? "#40C391" : "#4866C2",
                      fontWeight: "600",
                      justifySelf: "flex-end",
                      marginLeft: "auto",
                    }}
                  >
                    {order.status === "filled" ? "Completed" : "Pending"}
                  </p>
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <Modal isOpen={this.state.currentOrderModalOpen}>
          <Card className="card-plain no-transition" style={{ padding: "0px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#F2F2F2",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F2F2F2",
                  fontWeight: "600",
                  fontSize: "16px",
                  padding: "20px",
                }}
              >
                {this.state.currentOrder.status !== "filled" ? "Pending " : ""}
                Order Details
              </div>
              <button
                onClick={() => this.setState({ currentOrderModalOpen: false })}
                style={{
                  border: "none",
                  marginLeft: "auto",
                  backgroundColor: "#F2F2F2",
                  marginRight: "3%",
                }}
              >
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <img
                style={{ height: "64px", width: "64px" }}
                src={
                  this.state.currentOrder.status === "filled"
                    ? Completed
                    : Pending
                }
              ></img>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#22346E",
                  marginBottom: "20px",
                }}
              >
                {this.state.currentOrder.side === "buy" ? "Bought" : "Sold"}{" "}
                {this.state.currentOrder.symbol}
              </p>
              <ListGroup style={{ width: "80%" }} flush>
                <ListGroupItem
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                  key={0}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ fontSize: "12px", color: "#929FB0" }}>
                      Reference ID
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#404B5A",
                        marginLeft: "auto",
                      }}
                    >
                      {this.state.currentOrder.id}
                    </p>
                  </div>
                </ListGroupItem>
                <ListGroupItem
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                  key={0}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ fontSize: "12px", color: "#929FB0" }}>Order</p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#404B5A",
                        marginLeft: "auto",
                      }}
                    >
                      {this.state.currentOrder.id}
                    </p>
                  </div>
                </ListGroupItem>
                <ListGroupItem
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                  key={0}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ fontSize: "12px", color: "#929FB0" }}>
                      Price per share
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#404B5A",
                        marginLeft: "auto",
                      }}
                    >
                      ${this.state.currentOrder.filled_avg_price}
                    </p>
                  </div>
                </ListGroupItem>
                <ListGroupItem
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                  key={0}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ fontSize: "12px", color: "#929FB0" }}>Shares</p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#404B5A",
                        marginLeft: "auto",
                      }}
                    >
                      {this.state.currentOrder.qty}
                    </p>
                  </div>
                </ListGroupItem>
                <ListGroupItem
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                  key={0}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{ fontSize: "12px", color: "#929FB0" }}>Total</p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#404B5A",
                        marginLeft: "auto",
                      }}
                    >
                      $
                      {this.state.currentOrder.filled_avg_price *
                        this.state.currentOrder.qty}
                    </p>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </div>
            {this.state.currentOrder.status !== "filled" ? (
              <button
                style={{
                  border: "none",
                  backgroundColor: "#FFFFFF",
                  color: "#FA6767",
                  fontSize: "16px",
                  fontWeight: "500",
                  alignSelf: "flex-start",
                  marginLeft: "10%",
                  padding: "none",
                }}
              >
                Cancel Transaction
              </button>
            ) : (
              ""
            )}
          </Card>
        </Modal>
      </Card>
    );
  }
}

export default OrderPreview;
