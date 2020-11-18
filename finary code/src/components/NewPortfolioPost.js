import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import Select from "react-select";

//subcomponent
import Loading from "./Loading";

//api
import { createPost, getActiveGroupNames } from "../api/firebase";

// styled components
import { Modal, Card, Input } from "reactstrap";

class NewPortfolioPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group_names: [],
      title: "",
      description: "",
      selectedGroup: "",
      loading: false,
    };
  }

  createNewPostToggle = async () => {
    this.setState({ loading: true });
    createPost(
      this.state.selectedGroup,
      this.state.title,
      this.state.description
    );
    await this.props.refreshPosts();
    this.props.toggleNewPost();
  };

  changeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  async componentDidMount() {
    const user_groups = await getActiveGroupNames();
    const group_names = [];
    user_groups.data.groups.forEach((group) => {
      group_names.push({ value: group, label: group });
    });
    this.setState({ group_names });
  }

  render() {
    return (
      <Modal isOpen={this.props.newPostModalOpen}>
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
              Create a New Post
            </div>
            <button
              onClick={this.props.toggleNewPost}
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
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "20px",
                borderBottom: "2px solid #F8F8F8",
                justifyContent: "center",
                padding: "10px",
                paddingBottom: "15px",
              }}
            >
              <Input
                style={{ border: "none", fontSize: "20px" }}
                id="commentPost"
                placeholder="What is your thought..."
                type="Text"
                onChange={(e) => this.changeTitle(e)}
              ></Input>
            </div>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <TextareaAutosize
                placeholder="Details (optional)"
                rows={5}
                style={{
                  border: "none",
                  color: "#6E7A8A",
                  fontSize: "16px",
                  marginTop: "5px",
                  width: "100%",
                }}
                onChange={(e) => this.changeDescription(e)}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{ width: "40%", marginLeft: "20%", marginRight: "12%" }}
              >
                <Select
                  onChange={(value) =>
                    this.setState({ selectedGroup: value ? value.value : "" })
                  }
                  placeholder="Post in..."
                  options={this.state.group_names}
                  value={this.state.selectedGroup}
                  isClearable={false}
                />
              </div>
              <button
                disabled={this.state.selectedGroup === "" || this.state.loading}
                style={{
                  width: "20%",
                  fontSize: "16px",
                  fontWeight: "600",
                  textAlign: "center",
                  height: "30px",
                  backgroundColor: "#5C7FEC",
                  color: "#FFFFFF",
                  border: "none",
                  alignSelf: "center",
                }}
                onClick={() => this.createNewPostToggle()}
              >
                {!this.state.loading ? (
                  "Post"
                ) : (
                  <i
                    className="fa fa-spinner fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
              </button>
            </div>
          </div>
        </Card>
      </Modal>
    );
  }
}

export default NewPortfolioPost;
