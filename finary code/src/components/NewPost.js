import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea"

//subcomponent

//api
import { createPost } from "../api/firebase"


// styled components
import {
    Modal,
    Card,
    Input
} from "reactstrap";

class NewPost extends Component {

    state = {
        title: "",
        description: "",
        loading: false
    }


    createNewPostToggle = async () => {
        this.setState({ loading: true })
        await createPost(this.props.groupName, this.state.title, this.state.description)
        await this.props.refreshPosts()
        this.props.toggle()
    }

    changeTitle = (e) => {
        this.setState({ title: e.target.value })
    }

    changeDescription = (e) => {
        this.setState({ description: e.target.value })
    }


    render() {


        return (
            <Modal
                isOpen={this.props.newPostModalOpen}
            >
                <Card className="card-plain no-transition" style={{ padding: "0px" }}>
                    <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#F2F2F2" }}>
                        <div style={{ backgroundColor: "#F2F2F2", fontWeight: "600", fontSize: "16px", padding: "20px" }}>Create a New Post</div>
                        <button onClick={this.props.toggle} style={{ border: "none", marginLeft: "auto", backgroundColor: "#F2F2F2", marginRight: "3%" }}><i class="fa fa-times"></i></button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px", borderBottom: "2px solid #F8F8F8", justifyContent: "center", padding: "10px", paddingBottom: "15px" }}>
                            <Input
                                style={{ border: "none", fontSize: "20px" }}
                                id="commentPost"
                                placeholder="What is your thought..."
                                type="Text"
                                onChange={(e) => this.changeTitle(e)}
                            ></Input>
                        </div>
                        <div style={{ marginBottom: "20px", display: "flex", flexDirection: "row", alignItems: "center", padding: "20px" }}>
                            <TextareaAutosize placeholder="Details (optional)" rows={5} style={{ border: "none", color: "#6E7A8A", fontSize: "16px", marginTop: "5px", width: "100%" }} onChange={(e) => this.changeDescription(e)} />
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
        )
    }
}

export default NewPost;