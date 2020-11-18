import React, { Component } from "react";


// styled components
import {
  Card,
  CardBody,
  CardTitle, 
  CardText,
} from "reactstrap";

class ContactPage extends Component {
  
  render() {
 
      return (
        <div>
        <Card style={{ 
          width: '40rem',height:'25rem',
          margin: "20px",          
          display: "flex",
          padding: "30px",
          backgroundColor: "#FFFFFF",
          borderRadius: "4px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      
        }}>       
          
          <CardBody>         
           <CardTitle tag="h5">
                <span style={{
                  fontSize: "28px",
                  color: "#22346E",
                  fontWeight: "500",
                }}
                >
                  Contact us
                </span>
              
            </CardTitle>
            
            <CardText tag="h3">
            
                <p style={{
                  fontSize: "18px",                  
                  fontWeight: "250",
                }}
                >
                   If you're interested in getting in touch with us, please email <strong>hello@finary.io</strong> or reach out via LinkedIn. 
                </p>&nbsp;
          
            </CardText>

          </CardBody>
        </Card>
      </div>
      );
    
  }
}

export default ContactPage;
