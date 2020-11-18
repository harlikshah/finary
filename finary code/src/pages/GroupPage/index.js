import React, { Component } from "react";
import moment from "moment";

//subcomponents
import GroupPost from "../../components/GroupPost";
import NewPost from "../../components/NewPost";
import Loading from "../../components/Loading";

//api
import {
  getGroupDetails,
  getPosts,
  joinGroup,
  leaveGroup,
} from "../../api/firebase";

// styled components
import {
  Card,
  CardBody,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Input,
} from "reactstrap";

class GroupPage extends Component {
  state = {
    title: "",
    memberCount: "",
    postCount: "",
    isMember: false,
    description: "",
    posts: [],
    newPostModalOpen: false,
    tempJoined: false,
    loading: true,
    groupSorting: "new",
    postsLoading: false,
  };

  toggleMore = () => {
    this.setState({ full_comment_shown: !this.state.full_comment_shown });
  };

  toggleNewPost = async () => {
    this.setState({ newPostModalOpen: !this.state.newPostModalOpen });
  };

  leaveTempGroup = () => {
    this.setState({ tempJoined: false });
    leaveGroup(this.props.match.params.groupName);
  };

  joinTempGroup = () => {
    this.setState({ tempJoined: true });
    joinGroup(this.props.match.params.groupName);
  };

  changeGroupTab = async (groupSorting) => {
    if (this.state.groupSorting !== groupSorting) {
      this.setState({ groupSorting, postsLoading: true });
      const posts = await getPosts(this.state.title, groupSorting);
      this.setState({ posts: posts.data.posts, postsLoading: false });
    }
  };

  refreshGroup = async () => {
    const groupName = this.props.match.params.groupName;
    const groups = await getGroupDetails(groupName);
    const posts = await getPosts(groupName, this.state.groupSorting);
    const group = groups.data.groups[0];
    //const currentDate = new Date(group.timestamp._seconds)
    const currentDate = moment.unix(group.timestamp._seconds).format("LLLL");
    this.setState({
      title: group.groupName,
      memberCount: group.membersCount,
      postCount: group.postsCount,
      isMember: group.member,
      description: group.description,
      posts: posts.data.posts,
      created_at: currentDate,
      //created_at: currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "/" + currentDate.getFullYear(),
    });
  };

  componentDidMount = async () => {
    const groupName = this.props.match.params.groupName;
    const groups = await getGroupDetails(groupName);
    const posts = await getPosts(groupName);
    const group = groups.data.groups[0];
    //const currentDate = new Date(group.timestamp._seconds)
    const currentDate = moment.unix(group.timestamp._seconds).format("LLLL");
    this.setState({
      title: group.groupName,
      memberCount: group.membersCount,
      postCount: group.postsCount,
      isMember: group.member,
      tempJoined: group.member,
      description: group.description,
      posts: posts.data.posts,
      created_at: currentDate,
      //created_at: currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "/" + currentDate.getFullYear(),
      loading: false,
    });
  };

  render() {
    // const isMember = this.state.isMember;
    if (this.state.loading) {
      return <Loading />;
    } else {
      // will be passed in as a prop eventually
      const full_comment_text = this.state.description;
      const shortened_text = full_comment_text.slice(0, 140);

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "800px" }}
          >
            <Card
              className="no-transition card-plain"
              style={{
                margin: "20px",
                padding: "0",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            >
              <CardBody style={{ padding: "0px", backgroundColor: "#4866C2" }}>
                <div style={{ height: "200px", backgroundColor: "#4866C2" }}>
                  <div style={{}}>
                    <img
                      style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        marginLeft: "10%",
                        transform: "translate(0px, 150px)",
                      }}
                      alt="..."
                      src={require("../../assets/img/Rectangle 64.png")}
                    />
                  </div>
                </div>
                <div
                  style={{
                    height: "150px",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <p
                    style={{
                      marginLeft: "10%",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#22346E",
                      marginBottom: "5%",
                    }}
                  >
                    {this.state.title}
                  </p>
                  <button
                    onClick={
                      this.state.tempJoined
                        ? this.leaveTempGroup
                        : this.joinTempGroup
                    }
                    style={{
                      border: "none",
                      backgroundColor: this.state.tempJoined
                        ? "#1CCE98"
                        : "#5C7FEC",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: "500",
                      marginRight: "5%",
                      marginLeft: "auto",
                      width: "75px",
                      height: "30px",
                      marginBottom: "5%",
                      borderRadius: "4px",
                    }}
                  >
                    {" "}
                    {this.state.tempJoined ? "Joined" : "Join"}{" "}
                  </button>
                </div>
              </CardBody>
            </Card>

            <Card
              className="no-transition card-plain"
              style={{
                margin: "20px",
                padding: "20px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            >
              {this.state.isMember ? (
                <CardBody
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Input
                    onClick={this.toggleNewPost}
                    style={{
                      backgroundColor: "#F5F6F7",
                      borderColor: "transparent",
                    }}
                    id="commentPost"
                    placeholder="Share something with the group..."
                    type="Text"
                  ></Input>
                </CardBody>
              ) : (
                <h6>In order to post you need to join the group</h6>
              )}
            </Card>

            <Card
              className="no-transition card-plain"
              style={{
                margin: "20px",
                padding: "20px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            >
              <CardTitle tag="h4">
                <span
                  style={{
                    fontSize: "28px",
                    color: "#22346E",
                    fontWeight: "500",
                  }}
                >
                  Group Posts
                </span>
              </CardTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor:
                      this.state.groupSorting === "new" ? "#C7D3FA" : "#E1E7EB",
                    borderRadius: "4px",
                    color: "#22346E",
                    fontSize: "16px",
                    marginRight: "20px",
                    width: "75px",
                    fontWeight: "600",
                  }}
                  onClick={() => this.changeGroupTab("new")}
                >
                  New
                </button>
                <button
                  style={{
                    border: "none",
                    backgroundColor:
                      this.state.groupSorting === "hot" ? "#C7D3FA" : "#E1E7EB",
                    borderRadius: "4px",
                    color: "#22346E",
                    fontSize: "16px",
                    fontWeight: "600",
                    width: "75px",
                  }}
                  onClick={() => this.changeGroupTab("hot")}
                >
                  Hot
                </button>
              </div>
              {this.state.postsLoading ? (
                <Loading />
              ) : (
                <ListGroup flush>
                  {this.state.posts.map((post, i) => {
                    return (
                      <ListGroupItem
                        style={{
                          paddingLeft: "0px",
                          borderTop: "1px solid #F2F2F2",
                        }}
                      >
                        <GroupPost
                          key={i}
                          postID={post.postId}
                          groupName={post.group}
                          description={post.description}
                          title={post.title}
                          upVote={post.upVote}
                          score={post.score}
                          downVote={post.downVote}
                          numComments={post.noOfComments}
                          username={post.username}
                          timestamp={post.timestamp._seconds}
                          refreshPosts={this.refreshGroup}
                        />
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              )}
            </Card>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", width: "320px" }}
          >
            <Card
              className="no-transition card-plain"
              style={{
                margin: "20px",
                padding: "20px",
                paddingTop: "0px",
                width: "auto",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              }}
            >
              <CardTitle
                tag="h5"
                style={{ marginBottom: "20px", marginTop: "0px" }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    color: "#22346E",
                    fontWeight: "500",
                  }}
                >
                  About the group
                </span>
              </CardTitle>
              {!this.state.full_comment_shown && (
                <div>
                  {shortened_text}
                  {this.full_comment_text && this.full_comment_text.length > 140
                    ? "..."
                    : ""}
                  {this.full_comment_text &&
                    this.full_comment_text.length > 140 && (
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
                        See More
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
                    See Less{" "}
                  </button>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: "10%",
                  }}
                >
                  <p
                    style={{
                      // fontFamily: ,
                      color: "#4866C2",
                      fontSize: "28px",
                      fontWeight: "600",
                    }}
                  >
                    {this.state.postCount}
                  </p>
                  <p>Posts</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      // fontFamily: ,
                      color: "#4866C2",
                      fontSize: "28px",
                      fontWeight: "600",
                    }}
                  >
                    {this.state.memberCount}
                  </p>
                  <p>Members</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}></div>
              </div>

              <div
                style={{
                  borderTop: "2px solid #F2F2F2",
                  marginTop: "20px",
                  paddingTop: "20px",
                  fontSize: "14px",
                  color: "#0F1C44",
                }}
              >
                Created on {this.state.created_at}
              </div>
            </Card>
          </div>
          <NewPost
            newPostModalOpen={this.state.newPostModalOpen}
            toggle={this.toggleNewPost}
            refreshPosts={this.refreshGroup}
            groupName={this.state.title}
          />
        </div>
      );
    }
  }
}

export default GroupPage;
