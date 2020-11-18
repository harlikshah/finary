import React, { Component } from "react";
import VirtualizedSelect from "react-virtualized-select";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "react-select/dist/react-select.css";
import { withRouter } from "react-router-dom";

import alpacaApi from "../api/alpaca";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: [],
      inputValue: "",
      searching: false,
    };
    this.api = alpacaApi();
  }

  async componentDidMount() {
    const assets = await this.api.getTradableAssets();
    this.setState({ assets: this.formatAssets(assets.data) });
  }

  onInputChange = (inputValue) => {
    console.log("CHANGE");
    this.setState({ inputValue });
    if (inputValue) {
      this.props.history.push("/stock/" + inputValue);
    }
  };
  onSearchFocus = () => {
    this.setState({ searching: true });
  };
  onSearchBlur = () => {
    this.setState({ searching: false });
  };

  formatAssets(assets) {
    const formattedAssets = [];
    if (Array.isArray(assets)) {
      assets.forEach((stock) => {
        formattedAssets.push({ value: stock.symbol, label: stock.symbol });
      });
    }
    return formattedAssets;
  }

  render() {
    return (
      <div style={{ width: "300px", zIndex: 1000 }}>
        <VirtualizedSelect
          style={{
            borderRadius: "4px",
            backgroundColor: "#F5F6F7",
            borderColor: "#F5F6F7",
          }}
          autofocus
          clearable={true}
          options={this.state.assets}
          value={this.state.inputValue}
          simpleValue
          onChange={this.onInputChange}
          onFocus={this.onSearchFocus}
          onBlur={this.onSearchBlur}
          placeholder={
            this.state.searching ? (
              ""
            ) : (
              <div>
                <i class="fa fa-search" aria-hidden="true"></i> Search stocks by
                symbol
              </div>
            )
          }
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
