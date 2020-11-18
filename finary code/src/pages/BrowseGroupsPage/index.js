import React, { Component } from "react";

//subcomponents
import GroupPreview from "./GroupPreview";
import MyGroups from "./MyGroups";
import FAQs from "./FAQs";
import Loading from "../../components/Loading";

//api
import { getActiveGroups } from "../../api/firebase";

// styled components
import {} from "reactstrap";

class BrowseGroupPage extends Component {
  state = {
    active_tab: "all",
    groups: [],
    activeGroups: [],
    loading: true,
  };

  toggleTab = (newTab) => {
    this.setState({ active_tab: newTab });
  };

  computeActiveGroups = (allGroups) => {
    const enrolledGroups = [];
    allGroups.forEach((group) => {
      if (group.member) {
        enrolledGroups.push(group.groupName);
      }
    });
    return enrolledGroups;
  };

  componentDidMount = async () => {
    const groups = await getActiveGroups();
    this.setState({
      groups: groups.data.groups,
      activeGroups: this.computeActiveGroups(groups.data.groups),
      loading: false,
    });
  };

  addMyGroup = (groupName) => {
    let currentGroups = this.state.activeGroups;
    currentGroups.push(groupName);
    this.setState({ activeGroups: currentGroups });
  };

  removeMyGroup = (groupName) => {
    let currentGroups = this.state.activeGroups;
    let index = currentGroups.indexOf(groupName);
    if (index > -1) {
      currentGroups.splice(index, 1);
    }
    this.setState({ activeGroups: currentGroups });
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingLeft: "10%",
            paddingTop: "50px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "800px" }}
          >
            <div style={{ marginLeft: "10px" }}>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "28px",
                  color: "#22346E",
                }}
              >
                Explore New Groups
              </div>
              <div>
                <button
                  onClick={() => this.toggleTab("all")}
                  style={{
                    border: "none",
                    backgroundColor:
                      this.state.active_tab === "all" ? "#5C7FEC" : "#D5DDE5",
                    color:
                      this.state.active_tab === "all" ? "#FFFFFF" : "#22346E",
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "10px",
                  }}
                >
                  All
                </button>
                {/** <button onClick={() => this.toggleTab("new")} style={{ border: "none", backgroundColor: this.state.active_tab === "new" ? "#5C7FEC" : "#D5DDE5", color: this.state.active_tab === "new" ? "#FFFFFF" : "#22346E", fontSize: "16px", fontWeight: "600", margin: "10px" }}>New</button>
                            <button onClick={() => this.toggleTab("trending")} style={{ border: "none", backgroundColor: this.state.active_tab === "trending" ? "#5C7FEC" : "#D5DDE5", color: this.state.active_tab === "trending" ? "#FFFFFF" : "#22346E", fontSize: "16px", fontWeight: "600", margin: "10px" }}>Trending</button>
                            **/}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {this.state.groups.map((group, i) => {
                return (
                  <GroupPreview
                    key={i}
                    groupName={group.groupName}
                    membersCount={group.membersCount}
                    postsCount={group.postsCount}
                    isMember={group.member}
                    description={group.description}
                    addMyGroup={this.addMyGroup}
                    removeMyGroup={this.removeMyGroup}
                  />
                );
              })}
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", width: "320px" }}
          >
            <MyGroups activeGroups={this.state.activeGroups} />
            <FAQs />
          </div>
        </div>
      );
    }
  }
}

export default BrowseGroupPage;
