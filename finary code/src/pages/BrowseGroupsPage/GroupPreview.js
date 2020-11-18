import React, { Component } from "react";

import { Link } from "react-router-dom"


//subcomponents

//api
import { joinGroup, leaveGroup } from "../../api/firebase"


// styled components
import {
    Card,
    CardBody,
} from "reactstrap";


class GroupPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_comment_shown: false,
            tempJoined : this.props.isMember
        }
    }

    toggleMore = () => {
        this.setState({ full_comment_shown: !this.state.full_comment_shown })
    }

    leaveTempGroup = () => {
        this.setState( { tempJoined : false })
        this.props.removeMyGroup(this.props.groupName)
        leaveGroup(this.props.groupName)
    }
    joinTempGroup = () => {
        this.setState( { tempJoined : true })
        this.props.addMyGroup(this.props.groupName)
        joinGroup(this.props.groupName)
    }


    render() {

        const { groupName, membersCount, postsCount, isMember, description } = this.props;

        return (
            <Card className="no-transition" style={{ borderRadius:"4px", padding: "0", overflow: "hidden", width: "45%", margin: "10px" }}>
                <CardBody style={{ padding: "0px" }}>
                    <div style={{ height: "150px", backgroundColor: "#4866C2" }}>
                    </div>
                    <div style={{ height: "50px", backgroundColor: "#FFFFFF", display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                        <img
                            style={{ borderRadius: "10px", overflow: "hidden", marginLeft: "10%", width: "90px", height: "90px" }}
                            alt="..."
                            src={require("../../assets/img/Rectangle 64.png")}
                        />
                            <button onClick={(this.state.tempJoined)? this.leaveTempGroup: this.joinTempGroup}  style={{ border: "none", backgroundColor: (this.state.tempJoined) ? "#1CCE98" : "#5C7FEC", color: "#FFFFFF", fontSize: "16px", fontWeight: "500", marginRight: "5%", marginLeft: "auto", width: "75px", height: "30px", borderRadius:"4px" }}> {(this.state.tempJoined) ? "Joined" : "Join"} </button>
                    </div>
                    <div style={{ backgroundColor: "#FFFFFF", display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                        <p style={{ margin: "10%", marginBottom: "0%", fontSize: "20px", fontWeight: "600", color: "#22346E" }}>
                            <Link style={{ fontSize: "20px", fontWeight: "600", color: "#22346E" }} to={groupName}>{groupName}</Link></p>
                    </div>
                    
                    <div style={{ backgroundColor: "#FFFFFF", display: "flex", flexDirection: "row", alignItems: "flex-end", marginTop:"10px", marginBottom:"10px" }}>
                        <p style={{ marginLeft: "10%", marginRight:"5%", fontSize: "12px", fontWeight: "600", color: "#929FB0" }}>{membersCount} Members</p>
                        <p style={{ marginRight: "10%", fontSize: "12px", fontWeight: "600", color: "#929FB0" }}>{postsCount} Posts</p>
                    </div>
                    <div>
                        <p style={{ marginLeft: "10%", marginRight:"5%", fontSize: "14px", fontWeight: "600", color: "#404B5A", marginBottom: "50px" }}>
                            {description}
                        </p>
                    </div>
                    {/**  
                    <div style={{ backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column", paddingTop:"20px", paddingBottom: "20px", borderTop: "2px solid #F2F2F2" }}>
                        <p style={{ marginLeft: "10%", marginRight:"10%", fontSize: "12px", fontWeight: "600", color: "#929FB0" }}>Hot Discussion</p>
                        <p style={{ margin:"10%", marginTop:"10px", marginBottom:"10px", fontSize: "12px", fontWeight: "600", color: "#354D98" }}>Wall Street Journal reporting that Congress Congress Congress?</p>
                        <p style={{ margin:"10%", marginTop:"10px", marginBottom:"10px", fontSize: "12px", fontWeight: "600", color: "#354D98" }}>Will we see a rise in the number of companies who opt for a distri...</p>
                    </div>
                    */}
                </CardBody>
            </Card>
        )
    }
}


export default GroupPreview;
