import React, { Component } from "react";
import Datetime from "react-datetime";
import Select from 'react-select'


//subcomponents


//api


// styled components
import {
    Input,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup
} from "reactstrap";

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            street: '',
            residence: '',
            zip: '',
            city: '',
            state: '',
            phone: ''
        }
    }

    setStreet = (value) => {
        this.setState({ street: value})
    }
    setResidence = (value) => {
        this.setState({ residence: value})
    }
    setZipCode = (value) => {
        this.setState({ zip: value})
    }
    setCity = (value) => {
        this.setState({ city: value})
    }
    setAState = (value) => {
        this.setState({ state: value})
    }
    setPhoneNumber = (value) => {
        this.setState({ phone: value})
    }



    render() {


        return (
            <div style={{ display: "flex", flexDirection: "column", width: "75%", marginTop: "10px", justifyContent: "center", alignItems: "center" }}>
                <p style={{ marginTop: "10px", textAlign: "center", fontSize: "24px", color: "#0F1C44", fontWeight: "500" }}>
                    <strong>Your Address</strong>
                </p>
                <p>
                    It is usually the address on your driver's liscense or state ID
                </p>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "600px", marginTop: "25px", justifyContent: "center", alignItems: "center" }}>
                    <Input
                        style={{ backgroundColor: "#F5F6F7", margin: "0px", fontSize: "16px", borderRadius: "4px", height: "50px", backgroundColor: "#FFFFFF", border: "none" }}
                        id="streetAddress"
                        placeholder="Street Address"
                        type="name"
                        onBlur={(e) => this.setStreet(e.target.value)}
                    ></Input>
                    <Input
                        style={{ backgroundColor: "#F5F6F7", marginTop: "25px", fontSize: "16px", borderRadius: "4px", height: "50px", backgroundColor: "#FFFFFF", border: "none" }}
                        id="lastName"
                        placeholder="Apt, Suite, Building (Optional)"
                        type="name"
                        onBlur={(e) => this.setResidence(e.target.value)}
                    ></Input>

                    <div style={{ display: "flex", flexDirection: "row", width: "100%", maxWidth: "600px", marginTop: "25px", justifyContent: "center", alignItems: "center" }}>
                        <Input
                            style={{ backgroundColor: "#F5F6F7", width: "33%", margin: "0px", fontSize: "16px", marginRight: "1%", borderRadius: "4px", height: "50px", backgroundColor: "#FFFFFF", border: "none" }}
                            id="streetAddress"
                            placeholder="Zip Code"
                            type="name"
                            onBlur={(e) => this.setZipCode(e.target.value)}
                        ></Input>
                        <Input
                            style={{ backgroundColor: "#F5F6F7", width: "33%", margin: "0px", fontSize: "16px", marginLeft: "1%", marginRight: "1%", borderRadius: "4px", height: "50px", backgroundColor: "#FFFFFF", border: "none" }}
                            id="streetAddress"
                            placeholder="City"
                            type="name"
                            onBlur={(e) => this.setCity(e.target.value)}
                        ></Input>
                        <Input
                            style={{ backgroundColor: "#F5F6F7", width: "33%", margin: "0px", fontSize: "16px", marginLeft: "1%", borderRadius: "4px", height: "50px", backgroundColor: "#FFFFFF", border: "none" }}
                            id="streetAddress"
                            placeholder="State"
                            type="name"
                            onBlur={(e) => this.setAState(e.target.value)}
                        ></Input>
                    </div>
                    <Input
                        style={{ backgroundColor: "#F5F6F7", marginTop: "25px", fontSize: "16px", borderRadius: "4px", height: "50px", backgroundColor: "#FFFFFF", border: "none" }}
                        id="lastName"
                        placeholder="Phone Number"
                        type="name"
                        onBlur={(e) => this.setPhoneNumber(e.target.value)}
                    ></Input>
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "10px" }}>
                </div>
                {this.state.street && this.state.zip && this.state.city && this.state.state && this.state.phone &&
                <button style={{ width : "25%", borderRadius:"4px", marginTop:"50px", backgroundColor:"#5C7FEC", color:"#FFFFFF", height:"50px", border:"none"}} onClick={() => this.props.setAddress(this.state)}> Next Step </button>
                }
            </div>
        )
    }
}


export default PersonalInfo;
