/*eslint-disable*/
import React, { Component } from "react";

// reactstrap components
import { Container, Row } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

// core components

class Footer extends Component {

  render() {

    if (this.props.history.location.pathname === "/login" || this.props.history.location.pathname === "/onboarding") {
      return <div></div>;
    }

    return (
      <>
        <footer style={{ marginTop: "100px" }} className="footer footer-black footer-white">
          <Container>
            <Row>
              <nav className="footer-nav">
                <ul>
                  <li>
                    <a
                      href="https://finary.now.sh/portfolio"
                      target="_blank"
                      className="mr-1"
                    >
                      Finary
                  </a>
                  </li>
                  <li>
                    <a
                      href=""
                      target="_blank"
                      className="mr-1"
                    >
                      About
                  </a>
                  </li>
                  <li>
                    <a
                      href=""
                      target="_blank"
                    >
                      Contact Us
                  </a>
                  </li>
                </ul>
              </nav>
              <div className="credits ml-auto">
                <span className="copyright">
                  © {new Date().getFullYear()}
                , made with <i className="fa fa-heart heart" /> by Finary
              </span>
              </div>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default withRouter(Footer);