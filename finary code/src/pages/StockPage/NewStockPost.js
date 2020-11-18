import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea"

//subcomponent

//api
import { createStockPost } from "../../api/firebase"


// styled components
import {
    Modal,
    Card,
    Input,
    CardTitle
} from "reactstrap";

class NewStockPost extends Component {

    state = {
        title: "Just invested in " + this.props.stockSymbol,
        description: "",
        loading: false,
        newPostModalOpen : false
    }


    createNewPostToggle = async () => {
        this.setState({ loading: true })
        await createStockPost(this.props.stockSymbol, this.state.title, this.state.description, this.props.side === "buy" ? this.props.stockPrice : this.props.cost, this.props.side === "buy" ? "" : this.props.stockPrice, this.props.qty, this.props.side === "buy" ? "bought" : "sold")
        await this.props.refreshPosts(this.props.stockSymbol)
        this.setState({ newPostModalOpen : false, loading : false })
        this.props.closeStockPostOption()
    }

    changeTitle = (e) => {
        this.setState({ title: e.target.value })
    }

    changeDescription = (e) => {
        this.setState({ description: e.target.value })
    }

    render() {
        const profitPercentage = (((this.props.stockPrice - this.props.cost)/this.props.cost)*100).toFixed(2)
        const profited = profitPercentage >= 0
        return (
            <div>
                <Card className="card-plain no-transition" style={{ margin: "20px", backgroundColor: "#FFFFFF", padding:"20px" }}>
                    <CardTitle tag="h5" style={{ marginBottom: "15px", paddingTop:"0px" }} ><span style={{ fontSize: "24px", color: "#22346E", fontWeight: "500" }} >Share Your Thoughts</span></CardTitle>
                    <p style={{ fontSize:"14px", fontColor:"#0F1C44", fontWeight:"500", marginBottom :"20px" }}>Just {this.props.side=== "buy" ? "bought " : "sold "} {this.props.stockSymbol}</p>
                    <textarea style={{ backgroundColor : "#F5F6F7", borderRadius:"4px", height:"130px", border:"none", resize:"none"}} placeholder={ "Why did you invest in " + this.props.stockSymbol + "? Your thoughts can help other investors..."} onClick={()=> this.setState({ newPostModalOpen : true })} />
                </Card>
                <Modal
                    isOpen={this.state.newPostModalOpen}
                >
                    <Card className="card-plain no-transition" style={{ padding: "0px" }}>
                        <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#F2F2F2" }}>
                            <div style={{ backgroundColor: "#F2F2F2", fontWeight: "600", fontSize: "16px", padding: "20px" }}>Create a New Post</div>
                            <button onClick={() => this.setState({ newPostModalOpen : false })} style={{ border: "none", marginLeft: "auto", backgroundColor: "#F2F2F2", marginRight: "3%" }}><i class="fa fa-times"></i></button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", borderBottom: "2px solid #F8F8F8", justifyContent: "center", padding: "10px", paddingBottom: "15px" }}>
                                {this.props.side=== "buy" && 
                                <div style={{ width:"95%", padding:"20px", backgroundColor:"#EBF0FF", borderRadius:"4px"}}>
                                <p style={{ fontSize:"20px", fontWeight:"600", color : "#0F1C44", display:"flex", flexDirection:"row" }}>{"Invested in " + this.props.stockSymbol}<img style={{ alignSelf :"flex-end", justifySelf:"flex-end", marginLeft:"auto" }} alt="..." src={require("../../assets/trending-up.png")}/></p>
                                <p style={{textAlign:"left" }}>Bought at {this.props.stockPrice}</p>
                                </div>
                                }
                                {this.props.side=== "sell" && 
                                    <div style={{ width:"95%", padding:"20px", backgroundColor: profited ? "#F0FFF9" : "#FFF0F0", borderRadius:"4px"}}>
                                    <div style={{ fontSize:"20px", fontWeight:"600", color : "#0F1C44", display:"flex", flexDirection:"row" }}>{"Sold " + this.props.stockSymbol}<p style={{ alignSelf :"flex-end", justifySelf:"flex-end", marginLeft:"auto", color : profited ? "#40C391" : "#FA6767", fontSize:"14px", fontWeight:"600" }}>{profited ? "Made "+ profitPercentage + "%": "Lost "+profitPercentage + "%"}</p></div>
                                    <p style={{textAlign:"left", marginBottom:"0px", fontSize:"12px" }}>Bought at {parseFloat(this.props.cost).toFixed(2)}</p>
                                    <p style={{textAlign:"left", marginBottom:"0px", fontSize:"12px" }}>Sold at {this.props.stockPrice}</p>
                                </div>
                                }
                            </div>
                            <div style={{ marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", padding: "20px" }}>
                                <TextareaAutosize placeholder={"Why did you " +this.props.side + " " + this.props.stockSymbol + "? Your thoughts can help other investors..."} rows={5} style={{ border: "none", color: "#6E7A8A", fontSize: "16px", marginTop: "5px", width: "100%" }} onChange={(e) => this.changeDescription(e)} />
                            </div>
                            
                            <button disabled={this.state.loading} style={{ width: "20%", fontSize: "16px", fontWeight: "600", textAlign: "center", height: "30px", backgroundColor: "#5C7FEC", color: "#FFFFFF", marginLeft: "70%", border: "none", alignSelf: "center" }}
                                onClick={() => this.createNewPostToggle()}>
                                {!this.state.loading ? "Post" : <i
                                    className="fa fa-spinner fa-spin"
                                    style={{ marginRight: "5px" }}
                                />}
                            </button>
                        </div>
                    </Card>
                </Modal>
            </div>
        )
    }
}

export default NewStockPost;