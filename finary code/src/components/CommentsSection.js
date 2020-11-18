import React, { Component } from "react";
import { getComments } from "../api/firebase"
import TextareaAutosize from 'react-autosize-textarea';
import moment from 'moment';

//subcomponents
import Comment from "./Comment"
import ComponentLoading from "./ComponentLoading"

//api
import { createComment } from "../api/firebase"



class CommentsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            description: '',
            loading: true
        }
    }

    changeComment(e) {
        this.setState({ description: e.target.value })
    }

    async refreshComments() {
        const comments = await getComments(this.props.postID)
        this.setState({ comments: comments.data.comments, description: '', loading: false })
    }

    async createNewComment() {
        this.setState({ loading: true })
        await createComment(this.props.postID, this.state.description)
        this.refreshComments()
    }

    async componentDidMount() {
        this.setState({loading: true})
        const comments = await getComments(this.props.postID)
        this.setState({ comments: comments.data.comments, loading: false })
    }

    render() {
        if (this.state.loading) {
            return (
            <div style={{ overflow:"hidden"}}>
            {ComponentLoading(15)}
            </div>
            )
        }
        return (
            <div style={{ marginLeft: "1%", overflow:"hidden" }}>
                {this.state.comments.map(function (comment, i) {
                    return <Comment user={comment.username} comment={comment.comment} timestamp =  {moment.unix(comment.timestamp._seconds).fromNow()} ></Comment>
                })}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextareaAutosize rows={2} style={{ border: "none", backgroundColor: "#F5F6F7", color: "#6E7A8A", fontSize: "16px", marginTop: "5px", width: "100%" }} onChange={(e) => this.changeComment(e)} value={this.state.description} />
                    <div style={{ border: "none", backgroundColor: "#F5F6F7", color: "#6E7A8A", fontSize: "16px", width: "100%", display: "flex", justifyContent: "right" }}>
                        <button disabled={this.state.loading} onClick={() => this.createNewComment()} style={{ border: "none", backgroundColor: "#5C7FEC", color: "#FFFFFF", fontSize: "12px", width: "60px", fontWeight: "600", margin: "5px", marginLeft: "auto" }}>
                            {!this.state.loading ? "Post" : <i
                                className="fa fa-spinner fa-spin"
                                style={{ marginRight: "5px" }}
                            />}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentsSection
