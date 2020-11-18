import React, { Component } from "react"

//subcomponents

//api
import { getProfile, getUserWatchlist, getPortfolioPerformance } from "../../api/firebase"

//styled components
import EditTab from "./EditTab"
import AccountTab from "./AccountTab"
import NotificationsTab from "./NotificationsTab"
import LoginTab from "./LoginTab"
import PrivacyTab from "./PrivacyTab"


class EditProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 0,
            editPrefs: this.props.location.state.profile,
            accountPrefs: {'email': '', 'phone': ''},
        }
    }
        

    selectButton = (e) => {
        return
        if (e.target.style.backgroundColor) {
            e.target.style.border = "1px solid #7746FC"
        }
    }

    deselectButton = (e) => {
        return
        if (e.target.style.backgroundColor) {
            e.target.style.border = "1px solid #FFFFFF"
        }
    }

    setEditPrefs = (vals) => {
        this.setState({ editPrefs: vals })
    }
        
    setAccountPrefs = (vals) => {
        this.setState({ accountPrefs: vals })
    }


    render() {
        return (
            <div style={{ width: "80%", minHeight: "648px", height: "85%", display: "flex", flexDirection: "row", marginTop: "2%", marginLeft: "10%" }} >
                <div style={{ width: "20%", display: "flex", flexDirection: "column", marginRight: "10px", alignItems: "center", backgroundColor: "#FFFFFF" }} >
                    <div style={{ width: "90%", height: "50%", display: "flex", flexDirection: "column", marginTop: "10%" }}>
                            <button style={{
                                    backgroundColor: this.state.tab === 0? "#C7D3FA": "#FFFFFF",
                                    marginBottom: "25px",
                                    border: "1px solid #FFFFFF",
                                    borderRadius: "4px",
                            }} onMouseEnter={this.selectButton} onMouseLeave={this.deselectButton} onClick={() => this.setState({ tab: 0 })}>
                                <p style={{ fontSize: "16px", backgroundColor: "none", fontWeight: "500", color: "#22346E", marginTop: "16px", marginBottom: "16px"}} >
                                    Edit Profile
                                </p>
                            </button>
                            <button style={{
                                    backgroundColor: this.state.tab === 1? "#C7D3FA": "#FFFFFF",
                                    marginBottom: "25px",
                                    border: "1px solid #FFFFFF",
                                    borderRadius: "4px",
                            }} onMouseEnter={this.selectButton} onMouseLeave={this.deselectButton} onClick={() => this.setState({ tab: 1 })}>
                                <p style={{ fontSize: "16px", backgroundColor: "none", fontWeight: "500", color: "#22346E", marginTop: "16px", marginBottom: "16px"}} >
                                    Account Settings
                                </p>
                            </button>
                            <button style={{
                                    backgroundColor: this.state.tab === 2? "#C7D3FA": "#FFFFFF",
                                    marginBottom: "25px",
                                    border: "1px solid #FFFFFF",
                                    borderRadius: "4px",
                            }} onMouseEnter={this.selectButton} onMouseLeave={this.deselectButton} onClick={() => this.setState({ tab: 2 })}>
                                <p style={{ fontSize: "16px", backgroundColor: "none", fontWeight: "500", color: "#22346E", marginTop: "16px", marginBottom: "16px"}} >
                                    Notifications
                                </p>
                            </button>
                            <button style={{
                                    backgroundColor: this.state.tab === 3? "#C7D3FA": "#FFFFFF",
                                    marginBottom: "25px",
                                    border: "1px solid #FFFFFF",
                                    borderRadius: "4px",
                            }} onMouseEnter={this.selectButton} onMouseLeave={this.deselectButton} onClick={() => this.setState({ tab: 3 })}>
                                <p style={{ fontSize: "16px", backgroundColor: "none", fontWeight: "500", color: "#22346E", marginTop: "16px", marginBottom: "16px"}} >
                                    Login Activity
                                </p>
                            </button>
                            <button style={{
                                    backgroundColor: this.state.tab === 4? "#C7D3FA": "#FFFFFF",
                                    marginBottom: "25px",
                                    border: "1px solid #FFFFFF",
                                    borderRadius: "4px",
                            }} onMouseEnter={this.selectButton} onMouseLeave={this.deselectButton} onClick={() => this.setState({ tab: 4 })}>
                                <p style={{ fontSize: "16px", backgroundColor: "none", fontWeight: "500", color: "#22346E", marginTop: "16px", marginBottom: "16px"}} >
                                    Privacy Settings
                                </p>
                            </button>
                    </div>
                </div>
                <div style={{ width: "80%", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF" }} >
                    {this.state.tab === 0 && < EditTab vals={this.state.editPrefs} setEditPrefs={this.setEditPrefs}/>}
                    {this.state.tab === 1 && < AccountTab vals={this.state.accountPrefs} setAccountPrefs={this.setAccountPrefs}/>}
                    {this.state.tab === 2 && < NotificationsTab />}
                    {this.state.tab === 3 && < LoginTab />}
                    {this.state.tab === 4 && < PrivacyTab />}
                </div>
            </div>
        )
    }
}

export default EditProfilePage
