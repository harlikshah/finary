import React, { Component } from "react";

//subcomponents
import StockGraphIex from "../../components/StockGraphIex";
import BuySellOrders from "./BuySellOrders";
import Loading from "../../components/Loading";
import Equity from "./Equity";
import NewsFeed from "../../components/NewsFeed";
import StockPost from "../../components/StockPost";

//api
import alpacaApi from "../../api/alpaca";
import {
  getStockDetails,
  getStockStatistics,
  getStockHistoricalPricing,
  getStockPricing,
} from "../../api/stockDetails";
import { getStockPosts } from "../../api/firebase";
import { formatStatistics } from "../../api/stockUtils";

// styled components
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

class StockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: "",
      sharesOwned: 0,
      currentPrice: "",
      buyingPower: 0,
      percentChange: "",
      nominalChange: "",
      currentPriceUnsplit: 0,
      stockDetails: {},
      stockStatistics: {},
      stockPricing: [],
      loading: true,
      timeFrame: "1D",
      isOpen: false,
      nextMarketOpen: "",
      currentPosition: undefined,
      stockLoading: false,
      stockPosts: [],
      watchListed: false,
    };
    this.api = alpacaApi();
    this.refreshPositions = this.refreshPositions.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
  }

  changeTimeFrame = async (timeFrame) => {
    const stockSymbol = this.props.match.params.stockSymbol;
    await this.setState({ timeFrame, stockLoading: true });
    const stockPricing = await getStockHistoricalPricing(
      stockSymbol,
      this.state.timeFrame
    );
    const stockQuote = await getStockPricing(stockSymbol);

    let percentChange = (stockPricing.stockChange.percentChange * 100).toFixed(
      2
    );
    let nominalChange = stockPricing.stockChange.nominalDifference.toFixed(2);
    if (timeFrame === "1D") {
      percentChange = (stockQuote.data.changePercent * 100).toFixed(2);
      nominalChange = stockQuote.data.change.toFixed(2);
    }

    this.setState({
      currentPrice: this.sliceStockPrice(stockQuote.data.latestPrice),
      currentPriceUnsplit: stockQuote.data.latestPrice.toFixed(2),
      stockPricing: stockPricing.data,
      percentChange: percentChange,
      nominalChange: nominalChange,
      stockLoading: false,
    });
  };

  async refreshPositions(stockSymbol) {
    const currentPosition = await this.api.getSpecificPosition(stockSymbol);
    this.setState({
      sharesOwned: currentPosition.data.qty ? currentPosition.data.qty : 0,
      currentPosition: currentPosition.data,
    });
  }

  async refreshPosts(stockSymbol) {
    const stockPosts = await getStockPosts(stockSymbol);
    this.setState({ stockPosts });
  }

  toggleWatchListStock = async () => {
    console.log("watch toggle");
    if (this.state.watchListed) {
      this.api.removeWatchList(this.props.match.params.stockSymbol);
    } else {
      this.api.addWatchList(this.props.match.params.stockSymbol);
    }
    this.setState({ watchListed: !this.state.watchListed });
  };

  async componentDidUpdate(newProps) {
    if (this.props.match.params.stockSymbol !== this.state.stockSymbol) {
      await this.loadStockStatistics(this.props.match.params.stockSymbol);
    }
  }

  async componentDidMount() {
    const isWatchListed = await this.api.isWatchList(
      this.props.match.params.stockSymbol
    );
    const marketOpen = await this.api.isMarketOpen();
    const stockPosts = await getStockPosts(this.props.match.params.stockSymbol);
    this.setState({
      isOpen: marketOpen.data.is_open,
      nextMarketOpen: marketOpen.data.next_open,
      stockPosts: stockPosts.data.stockPosts,
      watchListed: isWatchListed,
    });
    await this.loadStockStatistics(this.props.match.params.stockSymbol);
  }

  async loadStockStatistics(stockSymbol) {
    const account = await this.api.getAccount();
    const currentPosition = await this.api.getSpecificPosition(stockSymbol);
    const stockDetails = await getStockDetails(stockSymbol);
    const stockStatistics = await getStockStatistics(stockSymbol);
    const stockPricing = await getStockHistoricalPricing(
      stockSymbol,
      this.state.timeFrame
    );
    const stockQuote = await getStockPricing(stockSymbol);
    this.setState({
      stockSymbol: this.props.match.params.stockSymbol.toUpperCase(),
      sharesOwned: currentPosition.data.qty ? currentPosition.data.qty : 0,
      currentPrice: this.sliceStockPrice(stockQuote.data.latestPrice),
      buyingPower: account.data.buying_power,
      currentPriceUnsplit: stockQuote.data.latestPrice.toFixed(2),
      stockDetails: stockDetails.data,
      stockStatistics: stockStatistics.data,
      stockPricing: stockPricing.data,
      percentChange: (stockQuote.data.changePercent * 100).toFixed(2),
      nominalChange: stockQuote.data.change.toFixed(2),
      dailyLow: stockQuote.data.low,
      dailyHigh: stockQuote.data.high,
      loading: false,
      currentPosition: currentPosition.data,
    });
  }
  sliceStockPrice(stockPrice) {
    if (stockPrice) {
      const newInt = parseFloat(stockPrice);
      stockPrice = newInt.toLocaleString("en-US");
      console.log("hi" + stockPrice);
      const portfolioParsed = stockPrice.toString().split(".");
      portfolioParsed[1] = portfolioParsed[1].slice(0, 2);
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
    console.log("position", this.state.currentPosition)
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
            overflow: "hidden",
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
            <Card
              className="card-plain no-transition"
              style={{
                margin: "20px",
                padding: "20px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardBody>
                <CardTitle tag="h4">
                  <div style={{ display: "flex" }}>
                    <span
                      style={{
                        fontSize: "32px",
                        color: "#22346E",
                        fontWeight: "600",
                      }}
                    >
                      {this.state.stockDetails.securityName}
                    </span>
                    <span
                      style={{
                        marginTop: "6px",
                        marginLeft: "13px",
                        fontSize: "16px",
                        color: "#929FB0",
                        fontWeight: "600",
                      }}
                    >
                      {this.state.stockSymbol}
                    </span>
                    <button
                      style={{
                        marginLeft: "auto",
                        border: "none",
                        backgroundColor: "#FFFFFF",
                        color: "#5C7FEC",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                      onClick={this.toggleWatchListStock}
                    >
                      <i
                        class={
                          this.state.watchListed ? "fa fa-star" : "fa fa-star-o"
                        }
                        aria-hidden="true"
                      ></i>{" "}
                      Watchlist
                    </button>
                  </div>
                </CardTitle>
                <CardTitle style={{}}>
                  <span
                    style={{
                      // fontFamily: ,
                      fontSize: "48px",
                      color: "#0F1C44",
                      fontWeight: "600",
                    }}
                  >
                    ${this.state.currentPrice[0]}.
                  </span>
                  <span
                    style={{
                      // fontFamily: ,
                      fontSize: "30px",
                      color: "#0F1C44",
                      fontWeight: "600",
                    }}
                  >
                    {this.state.currentPrice[1]}
                  </span>
                </CardTitle>
                <CardTitle tag="h5">
                  <span
                    style={{
                      // fontFamily: ,
                      fontSize: "20px",
                      color: isPositive ? "#1CCE98" : "#F35533",
                      fontWeight: "500",
                    }}
                  >
                    <i
                      class={isPositive ? "fa fa-arrow-up" : "fa fa-arrow-down"}
                    ></i>{" "}
                    ${this.state.nominalChange} ({this.state.percentChange}%){" "}
                  </span>
                  <span style={{ marginLeft: "16.25px" }}>
                    {this.checkTimeFrame()}
                  </span>
                </CardTitle>
                <StockGraphIex
                  width={800}
                  height={480}
                  margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                  stock={this.state.stockPricing}
                  nominalChange={this.state.nominalChange}
                  timeFrame={this.state.timeFrame}
                  loading={this.state.stockLoading}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "10%",
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
                <div
                  style={{
                    borderBottom: "2px solid #F2F2F2",
                    marginTop: "30px",
                  }}
                ></div>
              </CardBody>
              <CardBody>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "50%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            color: "#6E7A8A",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Market Cap
                        </p>
                        <p
                          style={{
                            // fontFamily: ,
                            color: "#4866C2",
                            fontSize: "28px",
                            fontWeight: "600",
                          }}
                        >
                          {formatStatistics(
                            this.state.stockStatistics.marketcap,
                            2
                          )}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            color: "#6E7A8A",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Volume (30 Days)
                        </p>
                        <p
                          style={{
                            // fontFamily: ,
                            color: "#4866C2",
                            fontSize: "28px",
                            fontWeight: "600",
                          }}
                        >
                          {formatStatistics(
                            this.state.stockStatistics.avg30Volume,
                            2
                          )}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "50%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            color: "#6E7A8A",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Price-Earnings Ratio
                        </p>
                        <p
                          style={{
                            // fontFamily: ,
                            color: "#4866C2",
                            fontSize: "28px",
                            fontWeight: "600",
                          }}
                        >
                          {this.state.stockStatistics.peRatio
                            ? this.state.stockStatistics.peRatio.toFixed(2)
                            : ""}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            color: "#6E7A8A",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Dividend Yield
                        </p>
                        <p
                          style={{
                            // fontFamily: ,
                            color: "#4866C2",
                            fontSize: "28px",
                            fontWeight: "600",
                          }}
                        >
                          {this.state.stockStatistics.dividendYield
                            ? this.state.stockStatistics.dividendYield.toFixed(
                                3
                              )
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "50%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            color: "#6E7A8A",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Daily Low
                        </p>
                        <p
                          style={{
                            // fontFamily: ,
                            color: "#4866C2",
                            fontSize: "28px",
                            fontWeight: "600",
                          }}
                        >
                          $
                          {this.state.dailyLow
                            ? this.state.dailyLow.toFixed(2)
                            : ""}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            color: "#6E7A8A",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          Daily High
                        </p>
                        <p
                          style={{
                            // fontFamily: ,
                            color: "#4866C2",
                            fontSize: "28px",
                            fontWeight: "600",
                          }}
                        >
                          $
                          {this.state.dailyHigh
                            ? this.state.dailyHigh.toFixed(2)
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "50%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            color: "#6E7A8A",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          52 Week Low
                        </p>
                        <p
                          style={{
                            // fontFamily: ,
                            color: "#4866C2",
                            fontSize: "28px",
                            fontWeight: "600",
                          }}
                        >
                          $
                          {this.state.stockStatistics.week52low
                            ? this.state.stockStatistics.week52low.toFixed(2)
                            : ""}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <p
                          style={{
                            color: "#6E7A8A",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          52 Week High
                        </p>
                        <p
                          style={{
                            // fontFamily: ,
                            color: "#4866C2",
                            fontSize: "28px",
                            fontWeight: "600",
                          }}
                        >
                          $
                          {this.state.stockStatistics.week52high
                            ? this.state.stockStatistics.week52high.toFixed(2)
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {this.state.sharesOwned !== 0 && (
              <Equity
                marketValue={this.state.currentPosition.market_value}
                costBasis={this.state.currentPosition.cost_basis}
                unRealizedPL={this.state.currentPosition.unrealized_pl}
                unRealizedPLPercent={(
                  this.state.currentPosition.unrealized_intraday_plpc * 100
                ).toFixed(2)}
                changeToday={(
                  this.state.currentPosition.current_price -
                  this.state.currentPosition.lastday_price
                ).toFixed(2)}
                changeTodayPercent={(
                  this.state.currentPosition.change_today * 100
                ).toFixed(2)}
                numShares={this.state.sharesOwned}
              />
            )}
            <Card
              className="card-plain no-transition"
              style={{
                margin: "20px",
                padding: "20px",
                border: "2px solid #F8F8F8",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardTitle tag="h5" style={{ marginBottom: "20px" }}>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#22346E",
                    fontWeight: "500",
                    padding: "0px",
                  }}
                >
                  {this.state.stockDetails.securityName}
                </span>
              </CardTitle>
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: "16px", color: "#6E7A8A" }}>
                  {this.state.stockDetails.description}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#4866C2",
                    marginTop: "20px",
                  }}
                >
                  <i class="fa fa-globe"></i>
                  <a
                    style={{
                      fontSize: "16px",
                      color: "#4866C2",
                      marginTop: "20px",
                    }}
                    target="_blank"
                    href={this.state.stockDetails.website}
                  >
                    {" "}
                    {this.state.stockDetails.website}
                  </a>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "#4866C2",
                    marginTop: "5px",
                  }}
                >
                  <i class="fa fa-users"></i>{" "}
                  {this.state.stockDetails.employees} Employees
                </div>
              </div>
            </Card>

            <NewsFeed stockSymbol={this.state.stockSymbol} />

            <Card
              className="no-transition card-plain"
              style={{
                margin: "20px",
                padding: "20px",
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
                  }}
                >
                  Discussion
                </span>
              </CardTitle>
              <ListGroup flush>
                {this.state.stockPosts.map( (post, i) => {
                  return (
                    <ListGroupItem
                      style={{
                        paddingLeft: "0px",
                        borderTop: "1px solid #F8F8F8",
                      }}
                    >
                      <StockPost
                        key={i}
                        postID={post.stockPostId}
                        priceBought={post.stockPriceBought}
                        priceSold={post.stockPriceSold}
                        stockSymbol={post.stock}
                        description={post.description}
                        upVote={post.upVote}
                        score={post.score}
                        downVote={post.downVote}
                        numComments={post.noOfComments}
                        username={post.username}
                        refreshPosts={this.refreshPosts}
                        side={post.stockTradeType}
                      />
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
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
            <BuySellOrders
              currentPosition={this.state.currentPosition}
              sharePrice={this.state.currentPriceUnsplit}
              stockSymbol={this.state.stockSymbol}
              buyingPower={this.state.buyingPower}
              sharesOwned={this.state.sharesOwned}
              buySellStock={this.buySellStock}
              isOpen={this.state.isOpen}
              nextOpen={this.state.nextMarketOpen}
              refreshPositions={this.refreshPositions}
              refreshPosts={this.refreshPosts}
            />
          </div>
        </div>
      );
    }
  }
}

export default StockPage;
