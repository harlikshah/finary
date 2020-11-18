import React, { Component } from "react";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { comment, score, user, timestamp } = this.props;
    const email = sessionStorage.getItem("email");
    return (
      <div
        style={
          user.toLowerCase() == email.toLowerCase()
            ? {
                marginTop: "10px",
                marginBottom: "10px",
                borderLeft: "4px solid #5C7FEC",
              }
            : { marginTop: "10px", marginBottom: "10px" }
        }
      >
        <div style={{ marginLeft: "20px" }}>
          <div>
            <span
              style={{ color: "#354D98", fontSize: "12px", fontWeight: 600 }}
            >
              {user}
            </span>
            <span
              style={{ color: "#929FB0", fontSize: "12px", marginLeft: "10px" }}
            >
              {timestamp}
            </span>
          </div>
          <p style={{ fontSize: "16px", color: "#6E7A8A" }}>{comment}</p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/** <button style={{ background: "none", border: "none", color: "#929FB0", backgroundColor: "#FFFFFF" }}><i class="fa fa-caret-up"></i></button>
                    <button style={{ background: "none", border: "none", color: "#929FB0", backgroundColor: "#FFFFFF" }}><i class="fa fa-caret-down"></i></button>
                    **/}
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
