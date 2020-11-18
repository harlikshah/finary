import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

//subcomponents
import CommentsSection from "./CommentsSection";
import ThreeDots from "./ThreeDots";
import PostUpvote from "./PostUpvote";

// styled components
import {} from "reactstrap";

class GroupPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_comment_shown: false,
      commentsOpen: false,
      upVote: this.props.upVote,
      downVote: this.props.downVote,
      score: this.props.score,
    };
  }

  toggleMore = () => {
    this.setState({ full_comment_shown: !this.state.full_comment_shown });
  };

  toggleComments = () => {
    this.setState({ commentsOpen: !this.state.commentsOpen });
  };

  render() {
    // will be passed in as a prop eventually
    const full_comment_text = this.props.description
      ? this.props.description
      : "";
    const shortened_text = full_comment_text.slice(0, 150);

    return (
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
          }}
        >
          <PostUpvote
            postID={this.props.postID}
            upVote={this.state.upVote}
            downVote={this.state.downVote}
            score={this.state.score}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/** <div style={{ borderRadius: "50%", overflow: "hidden", maxHeight: "20px", maxWidth: "20px", margin: "5px" }}>
                        <img
                            alt="..."
                            src={require("../assets/img/faces/ayo-ogunseinde-2.jpg")}
                        />
                    </div>
        **/}
              <div>
                <span
                  style={{
                    color: "#354D98",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {this.props.username}
                </span>
                <i class="fa fa-caret-right"></i>
                <span
                  style={{
                    color: "#4866C2",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  <Link
                    to={"/groups/" + this.props.groupName}
                    style={{
                      color: "#4866C2",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {this.props.groupName}
                  </Link>
                </span>
                <span
                  style={{
                    color: "#929FB0",
                    fontSize: "12px",
                    marginLeft: "10px",
                  }}
                >
                  {" "}
                  {moment.unix(this.props.timestamp).fromNow()}
                </span>
              </div>
            </div>
            <div>
              <p
                style={{
                  color: "#0F1C44",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {this.props.title}
              </p>
              <p style={{ color: "#6E7A8A", fontSize: "16px" }}>
                {!this.state.full_comment_shown && (
                  <div>
                    {" "}
                    {shortened_text}
                    {full_comment_text && full_comment_text.length > 150
                      ? "..."
                      : ""}
                    {full_comment_text && full_comment_text.length > 150 && (
                      <button
                        onClick={this.toggleMore}
                        style={{
                          padding: "0",
                          border: "none",
                          background: "none",
                          color: "#4866C2",
                          marginLeft: "10px",
                          fontWeight: "600",
                        }}
                      >
                        {" "}
                        More <i class="fa fa-angle-down"></i>
                      </button>
                    )}
                  </div>
                )}
                {this.state.full_comment_shown && (
                  <div>
                    {full_comment_text}
                    <button
                      onClick={this.toggleMore}
                      style={{
                        padding: "0",
                        border: "none",
                        background: "none",
                        color: "#4866C2",
                        marginLeft: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      Less <i class="fa fa-angle-up"></i>
                    </button>
                  </div>
                )}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <button
                onClick={this.toggleComments}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#929FB0",
                  fontSize: "12px",
                  fontWeight: "500",
                  margin: "5px",
                  // fontFamily: "SF Pro Display",
                  // fontStyle: "normal",
                }}
              >
                <img
                  style={{
                    width: "12.86px",
                    height: "12.86px",
                    marginRight: "5px",
                  }}
                  alt="..."
                  src={require("../assets/img/message-square.png")}
                />
                {/* <i class="fa fa-comment"></i> */}
                {this.props.numComments} Comments
              </button>
              {/** <button style={{ border: "none", color: "#929FB0", fontSize: "12px", fontWeight: "500", margin: "5px" }}><i class="fa fa-share-alt"></i>Share</button> **/}
              <ThreeDots postID={this.props.postID} refreshPosts={this.props.refreshPosts} username={this.props.username}/>
            </div>
          </div>
        </div>
        {this.state.commentsOpen && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CommentsSection postID={this.props.postID} />
          </div>
        )}
      </div>
    );
  }
}

export default GroupPost;
