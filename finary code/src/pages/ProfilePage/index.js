import React, { Component } from "react";
import { withRouter } from "react-router-dom";


//subcomponents
import StockGraph from "../../components/StockGraph";
import StockPreview from "../../components/StockPreview"
import Loading from "../../components/Loading"


//api
import { getProfile, getUserWatchlist, getPortfolioPerformance } from "../../api/firebase"
import alpacaApi from "../../api/alpaca";


// styled components
import {
    Card,
    CardBody,
    CardTitle,
    ListGroupItem,
    ListGroup,
} from "reactstrap";

class ProfilePage extends Component {
    state = {
        portfolio: {},
        timeFrame: "1D",
        equityHistory: {},
        profile: {},
        watchlist: {},
        loading: true
    }

    async componentDidMount() {
        const profile = await getProfile(this.props.match.params.username)
        const portfolio = await getPortfolioPerformance()
        let watchlist = await getUserWatchlist()
        const api = alpacaApi()
        watchlist = await api.getWatchlist(watchlist.data.assets)
        console.log("watch", profile)
        this.setState({
            profile: profile.data,
            equityHistory: portfolio.combinedDates,
            percentChange: (portfolio.portfolioChange.percentChange * 100).toFixed(2),
            watchlist: watchlist,
            loading: false
        })
    }

    changeTimeFrame = async (timeFrame) => {
        await this.setState({ timeFrame });
    }

    render() {

        const isOwnProfile = (this.props.match.params.username === sessionStorage.getItem("email"));
        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center", width: "80%" }}>


                        <Card className="no-transition no-transition card-plain" style={{ margin: "20px", padding: "0", overflow: "hidden" }}>
                            <CardBody style={{ padding: "0px" }}>
                                <div style={{ height: "200px", backgroundColor: "#4866C2" }}>
                                    <div style={{ borderRadius: "50%", overflow: "hidden", maxHeight: "200px", maxWidth: "200px", marginLeft: "10%", marginBottom: "30px", transform: "translate(0px, 100px)" }}>
                                        <img
                                            alt="..."
                                            src={require("../../assets/img/faces/ayo-ogunseinde-2.jpg")}
                                        />
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "#FFFFFF", display: "flex", flexDirection: "row", alignItems: "flex-start", paddingTop: "15px", paddingBottom: "15px" }}>
                                    <div style={{ borderRadius: "50%", overflow: "hidden", width: "200px", marginLeft: "10%", marginBottom: "30px" }}>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", width: "60%" }}>
                                        <p style={{ marginLeft: "5%", fontSize: "26px", fontWeight: "600", color: "#22346E" }}>{this.state.profile.username}</p>
                                        <p style={{ marginLeft: "5%", fontSize: "14px", color: "#6E7A8A" }}>{this.state.profile.firstName} {this.state.profile.lastName}</p>
                                        <p style={{ marginLeft: "5%", fontSize: "14px", color: "#0F1C44" }}>Worked at a top 3 U.S. Back. Frequent Trader.</p>
                                    </div>
                                    {isOwnProfile &&
                                        <button style={{ alignSelf: "flex-end", marginRight: "20px", backgroundColor: "#FFFFFF", borderColor: "#4866C2", color: "#4866C2", fontWeight: "500", borderRadius: "4px", width: "100px" }} onClick={() => this.props.history.push({ pathname: `/profile/${this.state.profile.username}/edit`, state: this.state})}>
                                            Edit Profile
                            </button>}
                                </div>
                            </CardBody>
                        </Card>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "70%" }}>
                                <Card className="no-transition no-transition card-plain" style={{ margin: "20px", padding: "20px", backgroundColor: "#FFFFFF" }}>
                                    <CardBody>
                                        <CardTitle tag="h4" ><span style={{ fontSize: "28px", color: "#22346E", fontWeight: "500" }} >{isOwnProfile ? "Your " : this.state.profile.firstName + "\'s"} Performance</span></CardTitle>
                                        <CardTitle tag="h5"><span style={{ fontSize: "20px", color: "#1CB48D", fontWeight: "500" }} >     
                                        <i class={this.state.percentChange > 0 ? "fa fa-arrow-up" : "fa fa-arrow-down"}></i>{this.state.percentChange}% </span></CardTitle>
                                        <StockGraph
                                            width={800}
                                            height={480}
                                            margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                                            stock={this.state.equityHistory}
                                            nominalChange={this.state.percentChange}
                                            loading={this.state.stockLoading}
                                        />
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",

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
                                                onClick={() => this.changeTimeFrame("1A")}
                                                style={{
                                                    border: "none",
                                                    backgroundColor:
                                                        this.state.timeFrame === "1A" ? " #C7D3FA" : "#FFFFFF",
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
                            </div>


                            <div style={{ display: "flex", flexDirection: "column", width: "30%" }} >
                                <Card className="no-transition card-plain" style={{ margin: "20px", padding: "20px", backgroundColor: "#FFFFFF" }}>
                                    <CardTitle tag="h5" style={{ marginBottom: "20px" }} ><span style={{ fontSize: "24px", color: "#22346E", fontWeight: "500" }} >{isOwnProfile ? "Your" : "Their "} Watchlist</span></CardTitle>
                                    <ListGroup flush>
                                        {this.state.watchlist.map(function (stock, i) {
                                            return (
                                                <ListGroupItem style={{ paddingLeft: "0px" }} key={i}>
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
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default ProfilePage;
