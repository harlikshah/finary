import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { checkLogin, getUserTopPosts } from "../api/firebase";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

// core components
import SearchBar from "./SearchBar";
import NewPortfolioPost from "./NewPortfolioPost";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      newPostModalOpen: false,
    };

    // this.handleNewPost = this.handleNewPost.bind(this);
  }

  async componentWillMount() {
    const isLoggedIn = await checkLogin();
    if (
      isLoggedIn.status !== 200 &&
      this.props.history.location.pathname !== "/redirect"
    ) {
      this.props.history.push("/login");
    }
  }

  async componentWillReceiveProps(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      this.props.history.location.pathname !== "/redirect"
    ) {
      const isLoggedIn = await checkLogin();
      if (isLoggedIn.status !== 200) {
        this.props.history.push("/login");
      }
    }
  }

  toggleNewPost = () => {
    this.setState({ newPostModalOpen: !this.state.newPostModalOpen });
  };

  refreshPosts = async () => {};

  // handleNewPost() {
  //   this.setState({
  //     newPostClicked: !this.state.newPostClicked,
  //   });
  //   console.log("here");
  // }

  render() {
    if (
      this.props.history.location.pathname === "/login" ||
      this.props.history.location.pathname === "/onboarding"
    ) {
      return <div></div>;
    }

    return (
      <>
        <Navbar
          color="white"
          expand="lg"
          style={{ boxShadow: "0px 4px 20px rgba(208, 208, 208, 0.2)" }}
        >
          <Container>
            <div
              style={{
                height: "76px",
                float: "left",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Link to="/portfolio">
                <div
                  style={{
                    color: "#354D98",
                    fontSize: "28px",
                    marginRight: "32px",
                    fontWeight: "bold",
                    lineHeight: "33px",
                  }}
                >
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "12px",
                    }}
                    alt="..."
                    src={require("../assets/img/Logo.png")}
                  />
                  Finary
                </div>
              </Link>

              <SearchBar />
            </div>
            <button
              className="navbar-toggler"
              id="navbarTogglerDemo02"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
              }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
            <div style={{ float: "right" }}>
              <UncontrolledCollapse navbar toggler="#navbarTogglerDemo02">
                <Nav className="mr-auto mt-2 mt-lg-0" navbar>
                  <NavItem className="active">
                    <NavLink
                      href="/portfolio"
                      style={{
                        color: "#0F1C44",
                        fontSize: "16px",
                        textTransform: "none",
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Link
                        style={{
                          // fontFamily:
                          textDecoration: "none",
                          color: "#0F1C44",
                          fontSize: "16px",
                          fontWeight: "600",
                          "margin-left": "10px",
                        }}
                        to={{
                          pathname: "/portfolio",
                        }}
                      >
                        Portfolio{" "}
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#pablo"
                      style={{
                        color: "#0F1C44",
                        fontSize: "16px",
                        textTransform: "none",
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Link
                        style={{
                          // fontFamily:
                          textDecoration: "none",
                          color: "#0F1C44",
                          fontSize: "16px",
                          fontWeight: "600",
                          "margin-left": "10px",
                        }}
                        to={{
                          pathname: "/groups/",
                        }}
                      >
                        Groups{" "}
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem className="active">
                    <NavLink
                      href="/about"
                      style={{
                        color: "#0F1C44",
                        fontSize: "16px",
                        textTransform: "none",
                      }}
                      onClick={(e) => e.preventDefault()}
                      activeClassName="active"
                    >
                      <Link
                        style={{
                          // fontFamily:
                          textDecoration: "none",
                          color: "#0F1C44",
                          fontSize: "16px",
                          fontWeight: "600",
                          "margin-left": "10px",
                        }}
                        to={{
                          pathname: "/about",
                        }}
                      >
                        About{" "}
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem className="active">
                    <NavLink
                      href="/contact"
                      style={{
                        color: "#0F1C44",
                        fontSize: "16px",
                        textTransform: "none",
                      }}
                      onClick={(e) => e.preventDefault()}
                      activeClassName="active"
                    >
                      <Link
                        style={{
                          // fontFamily:
                          textDecoration: "none",
                          color: "#0F1C44",
                          fontSize: "16px",
                          fontWeight: "600",
                          "margin-left": "10px",
                        }}
                        to={{
                          pathname: "/contact",
                        }}
                      >
                        Contact{" "}
                      </Link>
                    </NavLink>
                  </NavItem>
                  <NavItem
                    style={{
                      margin: "auto",
                      "margin-left": "20px",
                      "margin-right": "20px",
                    }}
                  >
                    <div className="form-container">
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "transparent",
                        }}
                        onClick={this.toggleNewPost}
                      >
                        <i
                          class="fa fa-edit"
                          style={{ color: "#0F1C44", fontSize: "24px" }}
                        ></i>
                      </button>

                      <NewPortfolioPost
                        toggleNewPost={this.toggleNewPost}
                        refreshPosts={this.refreshPosts}
                        newPostModalOpen={this.state.newPostModalOpen}
                      />
                    </div>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </div>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default withRouter(NavBar);
