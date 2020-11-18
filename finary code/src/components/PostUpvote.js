import React, { Component } from "react";
import { Link } from "react-router-dom";

//api
import { createUpVote, removeUpVote, createDownVote, removeDownVote } from "../api/firebase"

// styled components
import {
} from "reactstrap";

class PostUpvote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upVote: this.props.upVote,
            downVote: this.props.downVote,
            score: this.props.score
        }
    }
    
  sendUpVote = async () => {
    if (this.state.upVote) {
      this.setState({ upVote: false, score: this.state.score - 1 });
      await removeUpVote(this.props.postID);
    } else if (this.state.downVote) {
      this.setState({
        downVote: false,
        upVote: true,
        score: this.state.score + 2,
      });
      await removeDownVote(this.props.postID);
      await createUpVote(this.props.postID);
    } else {
      this.setState({ upVote: true, score: this.state.score + 1 });
      await createUpVote(this.props.postID);
    }
  };

  sendDownVote = async () => {
    if (this.state.downVote) {
      this.setState({ downVote: false, score: this.state.score + 1 });
      await removeDownVote(this.props.postID);
    } else if (this.state.upVote) {
      this.setState({
        upVote: false,
        downVote: true,
        score: this.state.score - 2,
      });
      await removeUpVote(this.props.postID);
      await createDownVote(this.props.postID);
    } else {
      this.setState({ downVote: true, score: this.state.score - 1 });
      await createDownVote(this.props.postID);
    }
  };

    render() {
        return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 24, alignSelf:"flex-start", marginTop:"10px"}}>
            <button style={{
                    border: "none", 
                    backgroundColor: "transparent",
                    color: this.state.downVote ? "#FFFFFF" : "#5C7FEC",
                    width: '29px',
                    marginBottom: '4px'
            }}
            onClick={this.sendUpVote}
            >
                <svg viewBox="0 0 29 24" width="29" height="24" transform="translate(-6,-1)" xmlns="http://www.w3.org/2000/svg">
                    <rect width="29" height="24" rx="2" fill={this.state.upVote? "#5C7FEC":"#EBF0FF"}/>
                    <path d="M18.1451 16H10.8549C10.4725 16 10.2317 15.5882 10.4191 15.2549L14.0642 8.77473C14.2554 8.43491 14.7446 8.43491 14.9358 8.77474L18.5809 15.2549C18.7683 15.5882 18.5275 16 18.1451 16Z" fill={this.state.upVote? "#FFFFFF": "#5C7FEC"}/>
                </svg>
            </button>
            <p style={{ textAlign:"center", fontSize: "12px", fontWeight:"600", color:"#0F1C44" }}>{this.state.score}</p>
            <button style={{
                    border: "none", 
                    backgroundColor: "transparent",
                    width: '29px',
                    marginTop: '4px'
            }}
            onClick={this.sendDownVote}
            >
                <svg viewBox="0 0 29 24" width="29" height="24" transform="translate(-6,-1)" xmlns="http://www.w3.org/2000/svg">
                    <rect width="29" height="24" rx="2" fill={this.state.downVote? "#5C7FEC":"#EBF0FF"}/>
                    <path d="M10.8549 8L18.1451 8C18.5275 8 18.7683 8.41183 18.5809 8.74513L14.9358 15.2253C14.7446 15.5651 14.2554 15.5651 14.0642 15.2253L10.4191 8.74513C10.2317 8.41183 10.4725 8 10.8549 8Z" fill={this.state.downVote? "#FFFFFF": "#5C7FEC"}/>
                </svg>
            </button>
        </div>
        )
    }
}
export default PostUpvote
