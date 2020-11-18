import React, { Component } from "react"

import {
    Input
} from "reactstrap"

class EditTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: this.props.vals.email,
            phone: this.props.vals.phone,
        }
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10%" }}>
                <div style={{ width: "90%", marginLeft: "20%",  display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#6E7A8A",
                        marginRight: "7%",
                    }} >
                        Email Address
                    </p>
                    <Input style={{ width: "45%", backgroundColor: "#F5F6F7", border: "none", borderRadius: "4px", fontSize: "12px", color: "F5F6F7" }} type="name" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value})} />
                </div>
                <div style={{ width: "90%", marginLeft: "19%", marginTop: "3%",  display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#6E7A8A",
                        marginRight: "7%",
                    }} >
                        Phone Number
                    </p>
                    <Input style={{ width: "45%", backgroundColor: "#F5F6F7", border: "none", borderRadius: "4px", fontSize: "12px", color: "F5F6F7" }} type="name" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value})} />
                </div>
                <button style={{
                    backgroundColor: "#FFFFFF",
                    border: "none",
                    marginTop: "3%",
                    marginRight: "20%",
                 }} onClick={() => this.setState({ changePass: !this.state.changePass})}>
                    <p style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#4866C2",
                    }}>
                        Change password
                    </p>
                </button>
                {this.state.changePass && <>
                <div style={{ width: "90%", marginLeft: "21%", marginTop: "3%",  display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#6E7A8A",
                        marginRight: "7%",
                    }} >
                        Old password
                    </p>
                    <Input style={{ width: "45%", backgroundColor: "#F5F6F7", border: "none", borderRadius: "4px", fontSize: "12px", color: "F5F6F7" }} type="password" />
                </div>
                <div style={{ width: "90%", marginLeft: "19.5%", marginTop: "3%",  display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#6E7A8A",
                        marginRight: "7%",
                    }} >
                        New password
                    </p>
                    <Input style={{ width: "45%", backgroundColor: "#F5F6F7", border: "none", borderRadius: "4px", fontSize: "12px", color: "F5F6F7" }} type="password"/>
                </div>
                <div style={{ width: "90%", marginLeft: "13.5%", marginTop: "3%",  display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#6E7A8A",
                        marginRight: "7%",
                    }} >
                        Confirm password
                    </p>
                    <Input style={{ width: "45%", backgroundColor: "#F5F6F7", border: "none", borderRadius: "4px", fontSize: "12px", color: "F5F6F7" }} type="password" />
                </div>
                </>}
                <button style={{ 
                    width: "92px", 
                    height: "42px", 
                    backgroundColor: "#5C7FEC",
                    border: "none",
                    borderRadius: "4px",
                    marginTop: "70px",
                    marginLeft: "50%",
                    marginBottom: "50px",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "16px",
                }} onClick={() => this.props.setAccountPrefs(this.state)}>
                    Save
                </button>
            </div>
        )
    }
}

export default EditTab
