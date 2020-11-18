import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Modal,
  Card
} from "reactstrap";

import { deletePost } from "../api/firebase"

class ThreeDots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      deleteModalOpen: false,
      loading: false
    }
  }

  deletePostWithRefresh = async () => {
    this.setState({ loading: true })
    await deletePost(this.props.postID)
    await this.props.refreshPosts()
    this.setState({ deleteModalOpen: false, loading: false })
  }

  render() {

    const email = sessionStorage.getItem("email");
    if (email.toLowerCase() !== this.props.username.toLowerCase()) {
      return <div></div>
    } else {

      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ButtonDropdown
            direction="right"
            isOpen={this.state.open}
            toggle={() => {
              this.setState({ open: !this.state.open });
            }}
          >
            <DropdownToggle
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              {/* Three dots since now icon */}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    margin: "2px",
                    height: "4px",
                    width: "4px",
                    backgroundColor: "#929FB0",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    margin: "2px",
                    height: "4px",
                    width: "4px",
                    backgroundColor: "#929FB0",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    margin: "2px",
                    height: "4px",
                    width: "4px",
                    backgroundColor: "#929FB0",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => this.setState({ deleteModalOpen: true })}>
                <button

                  style={{

                    border: "none",
                    background: "transparent",
                    fontColor: "#0F1C44",
                  }}
                >
                  Delete
              </button>
              </DropdownItem>
              <DropdownItem>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    fontColor: "#0F1C44",
                  }}
                >
                  Report
              </button>
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <Modal
            isOpen={this.state.deleteModalOpen}
          >
            <Card className="card-plain no-transition" style={{ padding: "0px" }}>
              <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#F2F2F2" }}>
                <div style={{ backgroundColor: "#F2F2F2", fontWeight: "600", fontSize: "16px", padding: "20px" }}>Delete Post</div>
                <button onClick={() => this.setState({ deleteModalOpen: false })} style={{ border: "none", marginLeft: "auto", backgroundColor: "#F2F2F2", marginRight: "3%" }}><i class="fa fa-times"></i></button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", color: "#0F1C44", fontWeight: "500", padding: "20px" }}>Are you sure you want to delete this post?</p>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                  <button style={{ border: "none", backgroundColor: "#FFFFFF", color: "#5C7FEC", fontWeight: "600", fontSize: "16px" }} onClick={() => this.setState({ deleteModalOpen: false })}>Cancel</button>
                  <button style={{ border: "none", backgroundColor: "#5C7FEC", color: "#FFFFFF", fontWeight: "600", fontColor: "", fontSize: "16px", padding: "5px", width: "100px", marginRight: "20px", marginLeft: '20px' }} onClick={this.deletePostWithRefresh}>{!this.state.loading ? "Delete" : <i
                    className="fa fa-spinner fa-spin"
                    style={{ marginRight: "5px" }}
                  />}</button>
                </div>
              </div>
            </Card>
          </Modal>
        </div>
      );
    }
  }
}

export default ThreeDots;
