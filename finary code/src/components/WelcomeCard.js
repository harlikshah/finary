import React, { Component } from "react";
import { getActiveGroups } from "../api/firebase";

import { Redirect, Link } from "react-router-dom";

//styled components
import { Card, CardBody, CardTitle } from "reactstrap";

class WelcomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true, joined: false };
  }

  getJoined = async () => {
    console.log("checking")
    const groups = await getActiveGroups();
    groups.data.groups.forEach((group) => {
      if (group.groupName == "Beta feedback" && group.member) {
        this.setState({ joined: true });
      }
    });
  };

  toggleWelcomeCard = () => {
    this.setState({ show: !this.state.show });
  };

  async componentWillMount() {
    this.getJoined()
  }

  render() {
    const { assets } = this.props;
    if (assets.length == 0 && this.state.show && !this.state.joined) {
      return (
        <Card
          className="no-transition card-plain"
          style={{
            borderRadius: "4px",
            margin: "20px",
            padding: "20px",
            backgroundColor: "#5C7FEC",
          }}
        >
          <CardBody>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5px",
              }}
            >
              <CardTitle style={{ marginTop: "10px" }}>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#F8F9FA",
                    fontWeight: "600",
                    lineHeight: "36px",
                  }}
                >
                  👋 Hello, {sessionStorage.getItem("email")}
                </span>
              </CardTitle>
              <button
                style={{
                  border: "none",
                  marginLeft: "auto",
                  backgroundColor: "transparent",
                }}
              >
                <i
                  class="fa fa-times"
                  style={{ width: "28px", height: "28px", color: "#F8F9FA" }}
                ></i>
              </button>
            </div>
            <section>
              <h4
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#F8F9FA",
                  lineHeight: "36px",
                }}
              >
                Welcome to the Finary community!
              </h4>
              <h5
                style={{
                  fontWeight: "normal",
                  fontSize: "16px",
                  color: "#FFFFFF",
                  lineHeight: "24px",
                  marginTop: "9px",
                }}
              >
                Thanks for signing up for our beta! We're always looking to
                improve Finary for our users, and we're learning just as much as
                you are -- so please let us know how we're doing by joining and
                posting in the Beta Discussion group!
              </h5>
            </section>
            <a href="/groups/Beta%20feedback">
              <button
                style={{
                  width: "251px",
                  height: "48px",
                  border: "2px solid #F8F9FA",
                  boxSizing: "border-box",
                  background: "transparent",
                  color: "#F8F9FA",
                  borderRadius: "4px",
                  float: "right",
                  marginTop: "25px",
                }}
              >
                Join Beta Discussion Group
                <i
                  style={{ marginLeft: "5px", color: "#F8F9FA" }}
                  class="fa fa-arrow-right"
                  aria-hidden="true"
                ></i>
              </button>
            </a>
          </CardBody>
        </Card>
      );
    } else {
      return null;
    }
  }
}

export default WelcomeCard;
