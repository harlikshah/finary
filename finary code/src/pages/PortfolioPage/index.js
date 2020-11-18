import React, { Component } from "react";

//subcomponents
import StockGraph from "../../components/StockGraph";
import StockPreview from "../../components/StockPreview";
import GroupPost from "../../components/GroupPost";
import NewPortfolioPost from "../../components/NewPortfolioPost";
import Loading from "../../components/Loading";
import WelcomeCard from "../../components/WelcomeCard";
import OrderPreview from "../../components/OrderPreview";

// import "../../assets/fonts/din1451alt.ttf";
//api
import alpacaApi from "../../api/alpaca";
import { getUserPortfolioPosts } from "../../api/firebase";

// styled components
import {
  Card,
  CardBody,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Input,
} from "reactstrap";
import NewStockPost from "../StockPage/NewStockPost";

class PortfolioPage extends Component {
  state = {
    portfolio: {},
    last_equity: "",
    equityHistory: [],
    assets: [],
    watchlist: [],
    portfolioChange: {},
    posts: [],
    newPostModalOpen: false,
    timeFrame: "1D",
    loading: true,
    stockLoading: false,
    postsLoading: false,
    postSorting: "new",
    orders: [],
  };

  toggleNewPost = () => {
    this.setState({ newPostModalOpen: !this.state.newPostModalOpen });
  };

  changeGroupTab = async (postSorting) => {
    if (this.state.postSorting !== postSorting) {
      this.setState({ postSorting, postsLoading: true });
      const posts = await getUserPortfolioPosts(postSorting);
      this.setState({ posts: posts.data.posts, postsLoading: false });
    }
  };

  changeTimeFrame = async (timeFrame) => {
    const api = alpacaApi();
    await this.setState({ timeFrame, stockLoading: true });
    const portfolio = await api.getPortfolioHistory(this.state.timeFrame);

    this.setState({
      equityHistory: portfolio.combinedDates,
      percentChange: (portfolio.portfolioChange.percentChange * 100).toFixed(2),
      nominalChange: portfolio.portfolioChange.nominalDifference.toFixed(2),
      stockLoading: false,
    });
  };

  refreshPosts = async () => {
    const posts = await getUserPortfolioPosts();
    this.setState({ posts: posts.data.posts });
  };

  async componentDidMount() {
    const api = alpacaApi();
    const portfolio = await api.getPortfolioHistory(this.state.timeFrame);
    const watchList = await api.getWatchlist();
    const positions = await api.getPositions();
    const orders = await api.getOrders();
    console.log("orders", orders);
    const portfolioParsed = this.slicePortfolioTotal(
      portfolio.combinedDates[portfolio.combinedDates.length - 1].close
    );
    const posts = await getUserPortfolioPosts();
    this.setState({
      equityHistory: portfolio.combinedDates,
      portFolioEquityStart: portfolioParsed[0],
      portfolioEquityEnd: portfolioParsed[1],
      percentChange: (portfolio.portfolioChange.percentChange * 100).toFixed(2),
      nominalChange: portfolio.portfolioChange.nominalDifference.toFixed(2),
      assets: positions.data,
      watchlist: watchList,
      posts: posts.data.posts,
      loading: false,
      orders: orders.data,
    });
  }

  slicePortfolioTotal(portfolioAmount) {
    if (portfolioAmount) {
      const newInt = parseFloat(portfolioAmount);
      portfolioAmount = newInt.toLocaleString("en-US");
      const portfolioParsed = portfolioAmount.toString().split(".");
      if (portfolioParsed[1]) {
        portfolioParsed[1] = portfolioParsed[1].slice(0, 2);
      } else {
        portfolioParsed[1] = "00";
      }
      return portfolioParsed;
    }
    return ["", ""];
  }

  checkTimeFrame = () => {
    switch (this.state.timeFrame) {
      case "1D":
        return "Today";

      case "1M":
        return "Last month";

      case "3M":
        return "Last three months";

      case "1Y":
        return "Last year";

      default:
        return "Incorrect time frame";
    }
  };

  //TODO: add max size of all components for larger screens
  // The main graph looks good but the side component is too stretched

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const isPositive = this.state.nominalChange > 0;

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              maxWidth: "800px",
            }}
          >
            <WelcomeCard assets={this.state.assets}></WelcomeCard>
            <Card
              className="no-transition card-plain"
              style={{
                margin: "32px 16px 12px 0px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                paddingBottom: "0",
              }}
            >
              <CardBody>
                <CardTitle tag="h4">
                  <span
                    style={{
                      fontSize: "28px",
                      color: "#22346E",
                      fontWeight: "500",
                      marginLeft: "32px",
                      marginTop: "32px",
                      marginBottom: "16px",
                    }}
                  >
                    My Portfolio
                  </span>
                </CardTitle>
                <CardTitle
                  style={{
                    marginLeft: "32px",
                    marginBotton: "16px",
                  }}
                >
                  <span
                    style={{
                      // fontFamily: ,
                      fontSize: "48px",
                      color: "#0F1C44",
                      fontWeight: "600",
                    }}
                  >
                    ${this.state.portFolioEquityStart}.
                  </span>
                  <span
                    style={{
                      // fontFamily: ,
                      fontSize: "20px",
                      color: "#0F1C44",
                      fontWeight: "600",
                    }}
                  >
                    {this.state.portfolioEquityEnd}
                  </span>
                </CardTitle>
                <CardTitle tag="h5" style={{ marginBottom: "96px" }}>
                  <span
                    style={{
                      // fontFamily: ,
                      fontSize: "20px",
                      color: isPositive ? "#1CCE98" : "#F35533",
                      fontWeight: "500",
                      marginLeft: "32px",
                    }}
                  >
                    <i
                      class={isPositive ? "fa fa-arrow-up" : "fa fa-arrow-down"}
                    ></i>{" "}
                    ${this.state.nominalChange} ({this.state.percentChange}%){" "}
                  </span>
                  <span style={{ marginLeft: "16.25", marginBottom: "49px" }}>
                    {this.checkTimeFrame()}
                  </span>
                </CardTitle>
                <StockGraph
                  width={800}
                  height={231}
                  margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                  stock={this.state.equityHistory}
                  nominalChange={this.state.nominalChange}
                  loading={this.state.stockLoading}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "32px",
                    marginBottom: "0",
                  }}
                >
                  <button
                    onClick={() => this.changeTimeFrame("1D")}
                    style={{
                      border: "none",
                      backgroundColor:
                        this.state.timeFrame === "1D" ? " #C7D3FA" : "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#22346E",
                      borderRadius: "10px",
                      width: "40px",
                      marginRight: "5%",
                    }}
                  >
                    1D
                  </button>
                  <button
                    onClick={() => this.changeTimeFrame("1M")}
                    style={{
                      border: "none",
                      backgroundColor:
                        this.state.timeFrame === "1M" ? " #C7D3FA" : "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#22346E",
                      borderRadius: "10px",
                      width: "40px",
                      marginRight: "5%",
                    }}
                  >
                    1M
                  </button>
                  <button
                    onClick={() => this.changeTimeFrame("3M")}
                    style={{
                      border: "none",
                      backgroundColor:
                        this.state.timeFrame === "3M" ? " #C7D3FA" : "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#22346E",
                      borderRadius: "10px",
                      width: "40px",
                      marginRight: "5%",
                    }}
                  >
                    3M
                  </button>
                  <button
                    onClick={() => this.changeTimeFrame("1Y")}
                    style={{
                      border: "none",
                      backgroundColor:
                        this.state.timeFrame === "1Y" ? " #C7D3FA" : "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#22346E",
                      borderRadius: "10px",
                      width: "40px",
                      marginRight: "5%",
                    }}
                  >
                    1Y
                  </button>
                </div>
              </CardBody>
            </Card>

            <Card
              className="no-transition card-plain"
              style={{
                height: "82px",
                margin: "12px 16px 12px 0px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardBody
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 24px 16px 24px",
                }}
              >
                <Input
                  onClick={this.toggleNewPost}
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "#F5F6F7",
                    borderColor: "#F5F6F7",
                    placeholder: "#AEBECC",
                  }}
                  id="commentPost"
                  placeholder="Share something with the group..."
                  type="Text"
                ></Input>
              </CardBody>
            </Card>

            <Card
              className="no-transition card-plain"
              style={{
                margin: "12px 16px 12px 0px",
                padding: "0px 32px 32px 32px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardTitle tag="h4">
                <span
                  style={{
                    fontSize: "28px",
                    color: "#22346E",
                    fontWeight: "500",
                    width: "736px",
                    marginBottom: "16px",
                  }}
                >
                  Group Posts
                </span>
                <hr style={{ borderTop: "1px solid #F2F2F2" }} />
              </CardTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: "16px",
                }}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor:
                      this.state.postSorting === "new" ? "#C7D3FA" : "#E1E7EB",
                    borderRadius: "4px",
                    color: "#22346E",
                    fontSize: "16px",
                    marginRight: "24px",
                    width: "75px",
                    fontWeight: "600",
                  }}
                  onClick={() => this.changeGroupTab("new")}
                >
                  New 🌟
                </button>
                <button
                  style={{
                    border: "none",
                    backgroundColor:
                      this.state.postSorting === "hot" ? "#C7D3FA" : "#E1E7EB",
                    borderRadius: "4px",
                    color: "#22346E",
                    fontSize: "16px",
                    fontWeight: "600",
                    width: "75px",
                  }}
                  onClick={() => this.changeGroupTab("hot")}
                >
                  Hot 🔥
                </button>
              </div>
              {this.state.postsLoading ? (
                <Loading />
              ) : (
                <ListGroup flush>
                  {this.state.posts.map((post, i) => {
                    return (
                      <ListGroupItem
                        style={{
                          paddingLeft: "0px",
                          borderTop: "1px solid #F2F2F2",
                        }}
                      >
                        <GroupPost
                          key={i}
                          postID={post.postId}
                          groupName={post.group}
                          description={post.description}
                          title={post.title}
                          upVote={post.upVote}
                          score={post.score}
                          downVote={post.downVote}
                          numComments={post.noOfComments}
                          username={post.username}
                          timestamp={post.timestamp._seconds}
                          refreshPosts={this.refreshPosts}
                        />
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              )}
            </Card>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              maxWidth: "320px",
            }}
          >
            <Card
              className="no-transition card-plain"
              style={{
                margin: "32px 0px 12px 16px",
                padding: "0px 32px 32px 32px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardTitle tag="h5" style={{ marginBottom: "32px" }}>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#22346E",
                    fontWeight: "500",
                    marginBottom: "0px",
                  }}
                >
                  My Assets
                </span>
              </CardTitle>
              <ListGroup flush>
                {this.state.assets.map(function (stock, i) {
                  return (
                    <ListGroupItem
                      style={{
                        padding: "16px 0px 16px 0px",
                        borderTop: "1px solid #F8F8F8",
                      }}
                      key={i}
                    >
                      <StockPreview
                        stockSymbol={stock.symbol}
                        currentPrice={stock.current_price}
                        changeToday={stock.change_today}
                        qty={stock.qty}
                      />
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Card>
            <Card
              className="no-transition card-plain"
              style={{
                margin: "12px 0px 12px 16px",
                padding: "0px 32px 32px 32px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardTitle tag="h5" style={{ marginBottom: "32px" }}>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#22346E",
                    fontWeight: "500",
                    marginBottom: "0px",
                  }}
                >
                  Watchlists
                </span>
              </CardTitle>
              <ListGroup flush>
                {this.state.watchlist.map(function (stock, i) {
                  return (
                    <ListGroupItem
                      style={{
                        padding: "16px 0px 16px 0px",
                        borderTop: "1px solid #F8F8F8",
                      }}
                      key={i}
                    >
                      <StockPreview
                        stockSymbol={stock.symbol}
                        currentPrice={stock.current_price}
                        changeToday={stock.change_today}
                        qty={stock.qty}
                      />
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Card>
            <OrderPreview orders={this.state.orders}></OrderPreview>
          </div>
          <NewPortfolioPost
            newPostModalOpen={this.state.newPostModalOpen}
            toggleNewPost={this.toggleNewPost}
            refreshPosts={this.refreshPosts}
            groupName={this.state.title}
          />
        </div>
      );
    }
  }
}

export default PortfolioPage;
