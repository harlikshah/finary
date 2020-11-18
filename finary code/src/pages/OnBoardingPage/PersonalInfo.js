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
            firstName: '',
            lastName: '',
            birthday: '',
            citizen : '',
            work : ''
        }
    }


    setFirstName = (value) => {
        this.setState({ firstName: value })
    }

    
    setLastName = (value) => {
        this.setState({ lastName: value })
    }

    setBirthday = (value) => {
        this.setState({ birthday: value })
    }
        
    setCitizen = (value) => {
        this.setState({ citizen: value })
    }

    setWork = (value) => {
        this.setState({ work: value })
    }



    render() {
    
        return (
            <div style={{ display: "flex", flexDirection: "column", width: "75%", marginTop: "10px", justifyContent: "center", alignItems: "center" }}>
                <p style={{ marginTop: "10px", textAlign: "center", fontSize: "24px", color: "#0F1C44", fontWeight: "500" }}>
                    <strong>A Little Bit about You</strong>
                </p>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", maxWidth: "600px", marginTop: "10px", justifyContent: "center", alignItems: "center" }}>
                    <Input
                        style={{ backgroundColor: "#F5F6F7", width: "50%", margin: "0px", fontSize: "16px", marginRight: "1%", borderRadius: "4px", height: "50px", backgroundColor: "#FFFFFF", border: "none" }}
                        id="firstName"
                        placeholder="First Name"
                        type="name"
                        onChange={(e) => this.setFirstName(e.target.value)}
                    ></Input>
                    <Input
                        style={{ backgroundColor: "#F5F6F7", width: "50%", margin: "0px", fontSize: "16px", marginLeft: "1%", borderRadius: "4px", height: "50px", backgroundColor: "#FFFFFF", border: "none" }}
                        id="lastName"
                        placeholder="Last Name"
                        type="name"
                        onChange={(e) => this.setLastName(e.target.value)}
                    ></Input>
                </div>
                <div style={{ marginTop: "20px", width: "100%", maxWidth: "600px" }}>
                    <FormGroup style={{ height: "50px", border: "none" }}>
                        <InputGroup className="date" id="datetimepicker" style={{ border: "none" }}>
                            <Datetime
                                inputProps={{
                                    style: { height: "50px", border: "none" },
                                    className: "form-control",
                                    placeholder: "Birthday (MM/DD/YYYY)"
                                }}
                                dateFormat="MM/DD/YYYY"
                                timeFormat={false}
                                onChange={(e) => this.setBirthday(e._d)}
                            />
                            <InputGroupAddon addonType="append">
                                <InputGroupText style={{ border: "none" }}>
                                    <span className="glyphicon glyphicon-calendar">
                                        <i className="fa fa-calendar" />
                                    </span>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </div>
                <div style={{ width: "100%", maxWidth: "600px", marginBottom: "10px" }}>
                    <Select style={{ width: "100%", marginTop: "10px", maxWidth: "600px", border: "none", padding: "10px", height:"50px" }} options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' }
                    ]}
                        value={this.state.citizen}
                        onChange={(e) => this.setCitizen(e.value)}
                        placeholder="Are you a U.S. Citizen?"
                    />
                </div>
                <div style={{ width: "100%", maxWidth: "600px", marginBottom: "10px" }}>
                    <Select style={{ width: "100%", marginTop: "10px", maxWidth: "600px", border: "none", padding: "10px", height:"50px" }} options={[
                        { value: 'full-time', label: 'Work Full-time' },
                        { value: 'part-time', label: 'Work Part-time' }
                    ]}
                        value={this.state.work}
                        onChange={(e) => this.setWork(e.value)}
                        placeholder="What do you do? (Employment status)"
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "10px" }}>
                </div>
                {this.state.firstName && this.state.lastName && this.state.birthday && this.state.citizen && this.state.work &&
                <button style={{ width : "25%", borderRadius:"4px", marginTop:"50px", backgroundColor:"#5C7FEC", color:"#FFFFFF", height:"50px", border:"none"}} onClick={() => this.props.setPersonalInfo(this.state)}> Next Step </button>
                }

            </div>
        )
    }
}


export default PersonalInfo;
