import React, { Component } from "react";


//subcomponents

//api


// styled components
import {
    Card,
    CardTitle,
    ListGroupItem,
    ListGroup,
} from "reactstrap";


class FAQs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_comment_shown: false,
            faqs_displayed: {
                0: false,
                1: false,
                2: false
            }
        }
    }


    toggleFaq = (index) => {
        const updated_displays = this.state.faqs_displayed
        updated_displays[index] = !updated_displays[index]
        this.setState({ faqs_displayed: updated_displays })
    }


    render() {


        return (
            <Card className="no-transition card-plain" style={{ boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.05)", borderRadius:"4px", margin: "20px", padding: "20px", paddingTop: "0px", width: "auto", backgroundColor:"#FFFFFF" }}>
                <CardTitle tag="h4" ><span style={{ fontSize: "28px", color: "#22346E", fontWeight: "500" }} >FAQ</span></CardTitle>
                <ListGroup flush>
                    <ListGroupItem style={{ fontSize: "16px", color: "#333333", fontWeight: "600", paddingLeft: "0px", paddingRight: "0px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <p style={{ color: "#333333", fontSize: "16px", fontWeight: "600" }}>How does group work?</p>
                            <button onClick={() => this.toggleFaq(0)} style={{ border: "none", backgroundColor: "#FFFFFF", color: "#5C7FEC", fontSize: "12px", fontWeight: "600", marginLeft: "auto" }}>{this.state.faqs_displayed[0] ? <i class="fa fa-angle-up"></i> : <i class="fa fa-angle-down"></i>}</button>
                        </div>
                        
                        {this.state.faqs_displayed[0] && <div>
                            <p>Now Finary community is in its very early stage. Users don’t have permission to create their own groups. If you find topics that are interesting, you can leave comments in App Feedback group and we will create that for you. </p>
                        </div>}


                    </ListGroupItem>
                    <ListGroupItem style={{ fontSize: "16px", color: "#333333", fontWeight: "600", paddingLeft: "0px", paddingRight: "0px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <p style={{ color: "#333333", fontSize: "16px", fontWeight: "600" }}>How can I create my own group?</p>
                            <button onClick={() => this.toggleFaq(1)} style={{ border: "none", backgroundColor: "#FFFFFF", color: "#5C7FEC", fontSize: "12px", fontWeight: "600", marginLeft: "auto", alignSelf:"flex-start" }}>{this.state.faqs_displayed[1] ? <i class="fa fa-angle-up"></i> : <i class="fa fa-angle-down"></i>}</button>
                        </div>
                        
                        {this.state.faqs_displayed[1] && <div>
                            <p>Now Finary community is in its very early stage. Users don’t have permission to create their own groups. If you find topics that are interesting, you can leave comments in App Feedback group and we will create that for you. </p>
                        </div>}

                    </ListGroupItem>
                    <ListGroupItem style={{ fontSize: "16px", color: "#333333", fontWeight: "600", paddingLeft: "0px", paddingRight: "0px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <p style={{ color: "#333333", fontSize: "16px", fontWeight: "600" }}>How can I create my own group?</p>
                            <button onClick={() => this.toggleFaq(2)} style={{ border: "none", backgroundColor: "#FFFFFF", color: "#5C7FEC", fontSize: "12px", fontWeight: "600", marginLeft: "auto", alignSelf:"flex-start" }}>{this.state.faqs_displayed[2] ? <i class="fa fa-angle-up"></i> : <i class="fa fa-angle-down"></i>}</button>
                        </div>

                        {this.state.faqs_displayed[2] && <div>
                            <p>Now Finary community is in its very early stage. Users don’t have permission to create their own groups. If you find topics that are interesting, you can leave comments in App Feedback group and we will create that for you. </p>
                        </div>}

                    </ListGroupItem>
                </ListGroup>
            </Card>
        )
    }
}


export default FAQs;
