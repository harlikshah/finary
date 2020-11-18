import React, { Component } from "react";
import moment from "moment";

// styled components
import { Card, CardTitle, ListGroupItem, ListGroup } from "reactstrap";

//api
import { getStockNews } from "../api/stockDetails";

class NewsFeed extends Component {
  state = {
    loading: true,
    newsArticles: [],
  };
  async componentDidMount() {
    const articles = await getStockNews(this.props.stockSymbol);
    const englishArticles = [];
    articles.data.forEach((article) => {
      if (article.lang === "en") {
        englishArticles.push(article);
      }
    });
    this.setState({ newsArticles: englishArticles });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.stockSymbol !== this.props.stockSymbol) {
      const articles = await getStockNews(this.props.stockSymbol);
      const englishArticles = [];
      articles.data.forEach((article) => {
        if (article.lang === "en") {
          englishArticles.push(article);
        }
      });
      this.setState({ newsArticles: englishArticles });
    }
  }

  render() {
    return (
      <Card
        className="no-transition card-plain"
        style={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          margin: "20px",
          padding: "20px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <CardTitle tag="h4">
          <span
            style={{ fontSize: "28px", color: "#22346E", fontWeight: "500" }}
          >
            News
          </span>
        </CardTitle>
        <ListGroup flush style={{ marginLeft: "0px" }}>
          {this.state.newsArticles.map(function (article, i) {
            const shortenedDescription = article.summary.slice(0, 190);
            return (
              <ListGroupItem
                style={{
                  marginLeft: "0px",
                  paddingLeft: "0px",
                  borderTop: "1px solid #F2F2F2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: " column",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p
                      style={{
                        color: "#354D98",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      {article.source}{" "}
                    </p>
                    <p
                      style={{
                        color: "#929FB0",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {" "}
                      {moment.unix(article.datetime).format("MMM Do")}{" "}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: " row",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                      }}
                    >
                      <p
                        style={{
                          color: "#0F1C44",
                          fontSize: "20px",
                          fontWeight: "500",
                          marginRight: "10px",
                        }}
                      >
                        <a
                          target="_blank"
                          style={{
                            color: "#0F1C44",
                            fontSize: "20px",
                            fontWeight: "500",
                          }}
                          href={article.url}
                        >
                          {article.headline}
                        </a>
                      </p>
                      <p
                        style={{
                          color: "#0F1C44",
                          fontSize: "12px",
                          fontWeight: "500",
                          marginRight: "10px",
                        }}
                      >
                        {shortenedDescription}
                        {article.summary.length > 180 ? "..." : ""}{" "}
                      </p>
                    </div>
                    <img
                      alt="..."
                      src={article.image}
                      style={{
                        height: "auto",
                        width: "20%",
                        alignSelf: "flex-end",
                        marginLeft: "auto",
                        alignSelf: "flex-start",
                      }}
                    />
                  </div>
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Card>
    );
  }
}

export default NewsFeed;
