import React, { Component } from "react";


// styled components
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";


class AboutPage extends Component {

  render() {
    return (
      
      <div>
        <Card style={{ 
          width: '80rem',height:'39rem',
          margin: "20px",
          display: "flex",
          padding: "30px",
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      
        }}>       
          <CardBody >
            <CardTitle tag="h5">
                <span
                  style={{
                    fontSize: "28px",
                    color: "#22346E",
                    fontWeight: "500",
                    textAlign: "center"
                  }}
                >
                  About Finary
                </span>
              
            </CardTitle>
            
            <CardText tag="h3" style={{
              fontSize: "18px",
              fontWeight: "250",
              }}>
                <p>
                  At its core, Finary is an investing community where people are empowered to share their thoughts, collaborate on ideas, and build trustful relationships with other investors of all levels. 
                </p>&nbsp;
          
                <p>
                  When we first started, our team set out with the mission of building a greater culture around investing for young people. Since then, we've turned an idea into a real product, interacted with thousands of personal investors from around the world, and learned a couple of things too.
                </p>&nbsp;
                <p> 
                We envision a future where everyone can be an investor - and a successful one - not just those with deep pockets and large personal networks. It won't happen overnight, but we're excited for the days when discussing and sharing ideas on investments is as common as talking about sports, politics, and any other part of pop culture. That is what we're working towards. 
                </p>
            </CardText>

            <CardTitle tag="h5" >
                <span style={{
                  fontSize: "28px",
                  color: "#22346E",
                  fontWeight: "500"
                  }}
                >
                  Incubated at:
                </span>
                <div style={{  display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                  <img style={{ display:"block", maxWidth:"400px", maxHeight:"300px", width:"auto", height:"auto" }} src={require("../../assets/img/Harvard incubation.png")} alt="losdsdfsdf..."/>
                  <img style={{ display:"block", maxWidth:"400px", maxHeight:"300px", width:"auto", height:"auto" }} src={require("../../assets/img/mozilla image.png")} alt="losdsdfsdf..."/>
                </div>
            </CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AboutPage;
