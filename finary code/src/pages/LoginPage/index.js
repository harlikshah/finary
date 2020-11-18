import React, { Component } from "react";
import { withRouter } from "react-router-dom";

//subcomponents

//api
import { login, signUp, getAlpacaToken } from "../../api/firebase";

// styled components
import { Input, Button } from "reactstrap";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    currentTab: "login",
    loading: false,
    failedLogin: false,
  };

  tryLogin = async () => {
    this.setState({ loading: true });
    try {
      const loginResponse = await login(this.state.email, this.state.password);
      if (loginResponse.status === 200) {
        if (!loginResponse.data.alpacaApiToken) {
          sessionStorage.setItem("token", loginResponse.data.sessionCookie);
          sessionStorage.setItem("email", this.state.email);
          window.location =
            "https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=985df6514a91378156304f72b06d8711&redirect_uri=https://finary.now.sh/redirect&state=8e02c9c6a3484fadaaf841fb1df290e1&scope=account:write%20trading";
        } else {
          sessionStorage.setItem(
            "alpacaToken",
            loginResponse.data.alpacaApiToken
          );
          sessionStorage.setItem("token", loginResponse.data.sessionCookie);
          sessionStorage.setItem("email", this.state.email);
          this.props.history.push("/portfolio");
        }
      } else {
        this.setState({ failedLogin: true, loading: false });
      }
    } catch {
      this.setState({ failedLogin: true, loading: false });
    }
  };

  trySignup = async () => {
    this.setState({ loading: true });
    const signUpResponse = await signUp(this.state.email, this.state.password);
    if (signUpResponse.status === 200) {
      sessionStorage.setItem("token", signUpResponse.data.sessionCookie);
      sessionStorage.setItem("email", this.state.email);
      window.location =
        "https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=985df6514a91378156304f72b06d8711&redirect_uri=https://finary.now.sh/redirect&state=8e02c9c6a3484fadaaf841fb1df290e1&scope=account:write%20trading";
    }
  };

  changeTab = (newTab) => {
    this.setState({ currentTab: newTab });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "100px",
          height: "90vh",
        }}
      >
        <div style={{ backgroundColor: "#FFFFFF", paddingTop: "50px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <button
              style={{
                marginRight: "20%",
                fontWeight: "600",
                border: "none",
                borderBottom:
                  this.state.currentTab === "login"
                    ? "4px solid #5C7FEC"
                    : "none",
                backgroundColor: "#FFFFFF",
                color:
                  this.state.currentTab === "login" ? "#5C7FEC" : "#939393",
              }}
              onClick={() => this.changeTab("login")}
            >
              Log In
            </button>
            <button
              style={{
                border: "none",
                fontWeight: "600",
                borderBottom:
                  this.state.currentTab === "signup"
                    ? "4px solid #5C7FEC"
                    : "none",
                backgroundColor: "#FFFFFF",
                color:
                  this.state.currentTab === "signup" ? "#5C7FEC" : "#939393",
              }}
              onClick={() => this.changeTab("signup")}
            >
              Sign Up
            </button>
          </div>
          {this.state.currentTab === "login" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#FFFFFF",
                paddingTop: "50px",
                paddingBottom: "100px",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              <Input
                onChange={(e) => this.setState({ email: e.target.value })}
                style={{
                  backgroundColor: "#F5F6F7",
                  border: "none",
                  borderRadius:"4px",
                  marginBottom: "10px",
                }}
                id="commentPost"
                placeholder="Email"
                type="Text"
              ></Input>
              <Input
                onChange={(e) => this.setState({ password: e.target.value })}
                style={{
                  backgroundColor: "#F5F6F7",
                  border: "none",
                  borderRadius:"4px",
                  marginBottom: "10px",
                }}
                id="commentPost"
                placeholder="Password"
                type="Password"
              ></Input>
              <span style={{ marginBottom: "20px", color: "#F26358" }}>
                {this.state.failedLogin
                  ? "Incorrect username or password."
                  : ""}
              </span>
              <Button
                onClick={this.tryLogin}
                style={{
                  backgroundColor: "#5C7FEC",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                  width: "300px",
                  border: "none",
                }}
              >
                {!this.state.loading ? (
                  "Log In"
                ) : (
                  <i
                    className="fa fa-spinner fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
              </Button>
            </div>
          )}
          {this.state.currentTab === "signup" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#FFFFFF",
                paddingTop: "50px",
                paddingBottom: "100px",
                paddingLeft: "50px",
                paddingRight: "50px",
                borderRadius:"4px",
              }}
            >
              <Input
                onChange={(e) => this.setState({ email: e.target.value })}
                style={{
                  backgroundColor: "#F5F6F7",
                  border: "none",
                  marginBottom: "10px",
                }}
                id="commentPost"
                placeholder="Email"
                type="Text"
              ></Input>
              <Input
                onChange={(e) => this.setState({ password: e.target.value })}
                style={{
                  backgroundColor: "#F5F6F7",
                  border: "none",
                  marginBottom: "30px",
                }}
                id="commentPost"
                placeholder="Password"
                type="Password"
              ></Input>
              <Button
                onClick={this.trySignup}
                style={{
                  backgroundColor: "#5C7FEC",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                  width: "300px",
                  border: "none",
                }}
              >
                {!this.state.loading ? (
                  "Sign Up"
                ) : (
                  <i
                    className="fa fa-spinner fa-spin"
                    style={{ marginRight: "5px" }}
                  />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
