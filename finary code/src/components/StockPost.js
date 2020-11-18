import React, { Component } from "react";
import { Link } from "react-router-dom";

//subcomponents
import CommentsSection from "./CommentsSection";
import ThreeDots from "./ThreeDots";
import PostUpvote from "./PostUpvote";

// styled components
import { } from "reactstrap";

// api
import alpacaApi from "../api/alpaca"

class StockPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_comment_shown: false,
      commentsOpen: false,
      upVote: this.props.upVote,
      downVote: this.props.downVote,
      score: this.props.score,
      profited: true,
      profitPercentage: 0.00,
      currentPrice: '',
      loading: true,
    };
  }

  toggleMore = () => {
    this.setState({ full_comment_shown: !this.state.full_comment_shown });
  };

  toggleComments = () => {
    this.setState({ commentsOpen: !this.state.commentsOpen });
  };

  componentDidMount = async () => {
    const api = alpacaApi()
    const quote = await api.getQuote(this.props.stockSymbol)
    console.log(quote, "quoted")
    const currentPrice = quote.data.last.askprice

    let profitPercentage
    if (this.props.side === "bought") { 
      profitPercentage = (((currentPrice - this.props.priceBought) / this.props.priceBought) * 100).toFixed(2)
    } else {
      profitPercentage = (((this.props.priceSold - this.props.priceBought) / this.props.priceBought) * 100).toFixed(2)
    }
    const profited = profitPercentage >= 0
    this.setState({ currentPrice: currentPrice, profitPercentage: profitPercentage, profited: profited, loading: false })
  }


  render() {
    // will be passed in as a prop eventually
    const full_comment_text = this.props.description
      ? this.props.description
      : "";
    console.log(full_comment_text);
    const shortened_text = full_comment_text.slice(0, 150);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",

        }}>
          <PostUpvote postID={this.props.postID} upVote={this.state.upVote} downVote={this.state.downVote} score={this.state.score} />
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            width:"100%"
          }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center", padding:"5px",
              }}
            >
              <Link to={"/profile/" + this.props.username}>
                <span
                  style={{ color: "#354D98", fontSize: "12px", fontWeight: 600 }}
                >
                  {this.props.username}
                </span>
              </Link>
              <i class="fa fa-caret-right"></i>
              <span
                style={{ color: "#4866C2", fontSize: "12px", fontWeight: 600 }}
              >
                {this.props.stockSymbol}
              </span>
              <span
                style={{ color: "#929FB0", fontSize: "12px", marginLeft: "10px" }}
              >
                Yesterday at 3:00PM
                </span>
            </div>
            <div style={{ width: "100%" }}>
              {this.props.side === "bought" &&
                <div style={{ width: "95%", padding: "20px", backgroundColor: this.state.profited ? "#F0FFF9" : "#FFF0F0", borderRadius: "4px" }}>
                  <div style={{ fontSize: "20px", fontWeight: "600", color: "#0F1C44", display: "flex", flexDirection: "row" }}>{"Bought " + this.props.stockSymbol}<p style={{ alignSelf: "flex-end", justifySelf: "flex-end", marginLeft: "auto", color: this.state.profited ? "#40C391" : "#FA6767", fontSize: "14px", fontWeight: "600" }}>{this.state.profited ? "Made " + this.state.profitPercentage + "%" : "Lost " + this.state.profitPercentage + "%"}</p></div>
                  <p style={{ textAlign: "left" }}>Bought at {this.props.priceBought}</p>
                </div>
              }
              {this.props.side === "sold" &&
                <div style={{ width: "95%", padding: "20px", backgroundColor: this.state.profited ? "#F0FFF9" : "#FFF0F0", borderRadius: "4px" }}>
                  <div style={{ fontSize: "20px", fontWeight: "600", color: "#0F1C44", display: "flex", flexDirection: "row" }}>{"Sold " + this.props.stockSymbol}<p style={{ alignSelf: "flex-end", justifySelf: "flex-end", marginLeft: "auto", color: this.state.profited ? "#40C391" : "#FA6767", fontSize: "14px", fontWeight: "600" }}>{this.state.profited ? "Made " + this.state.profitPercentage + "%" : "Lost " + this.state.profitPercentage + "%"}</p></div>
                  <p style={{ textAlign: "left", marginBottom: "0px", fontSize: "12px" }}>Bought at {parseFloat(this.props.priceBought).toFixed(2)}</p>
                  <p style={{ textAlign: "left", marginBottom: "0px", fontSize: "12px" }}>Sold at {this.props.priceSold}</p>
                </div>
              }
              <p style={{ color: "#6E7A8A", fontSize: "16px" }}>
                {!this.state.full_comment_shown && (
                  <div>
                    {" "}
                    {shortened_text}
                    {full_comment_text && full_comment_text.length > 150
                      ? "..."
                      : ""}
                    {full_comment_text && full_comment_text.length > 150 && (
                      <button
                        onClick={this.toggleMore}
                        style={{
                          padding: "0",
                          border: "none",
                          background: "none",
                          color: "#4866C2",
                          marginLeft: "10px",
                          fontWeight: "600",
                        }}
                      >
                        {" "}
                    More <i class="fa fa-angle-down"></i>
                      </button>
                    )}
                  </div>
                )}
                {this.state.full_comment_shown && (
                  <div>
                    {full_comment_text}
                    <button
                      onClick={this.toggleMore}
                      style={{
                        padding: "0",
                        border: "none",
                        background: "none",
                        color: "#4866C2",
                        marginLeft: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                  Less <i class="fa fa-angle-up"></i>
                    </button>
                  </div>
                )}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <button
                onClick={this.toggleComments}
                style={{
                  border: "none",
                  color: "#929FB0",
                  fontSize: "12px",
                  fontWeight: "500",
                  margin: "5px",
                }}
              >
                <i class="fa fa-comment"></i>
                {this.props.numComments} Comments
          </button>
              {/** <button style={{ border: "none", color: "#929FB0", fontSize: "12px", fontWeight: "500", margin: "5px" }}><i class="fa fa-share-alt"></i>Share</button> **/}
              <ThreeDots postID={this.props.postID} refreshPosts={this.props.refreshPosts} username={this.props.username} />
            </div>
          </div>
        </div>
        {this.state.commentsOpen && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CommentsSection postID={this.props.postID} />
          </div>
        )}
      </div>
    );
  }
}

export default StockPost;
