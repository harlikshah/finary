import React, { Component } from "react";
import apisauce from "apisauce";

import { combineDates, calculatePercentChange } from "./stockUtils";

const config = {
  API_KEY_ID: "PKOYB70P9SN33IW3E8R4",
  API_SECRET_KEY: "1G8Ht8NO2XfOouYOFBvb1FPghlU0nLWVICVhUxJn",
  PAPER_BASE_URL: "https://paper-api.alpaca.markets/",
  DATA_BASE_URL: "https://data.alpaca.markets/",
};

const alpacaApi = (baseUrl = config.PAPER_BASE_URL) => {

    const api = apisauce.create({
        baseURL: config.PAPER_BASE_URL,
        headers: {
            //'authorization': "Bearer " + sessionStorage.getItem("alpacaToken"),
            'authorization': "Bearer " + sessionStorage.getItem("alpacaToken"),
        },
        timeout: 5000
    })


    const dataApi = apisauce.create({
        baseURL: config.DATA_BASE_URL,
        headers: {
            //'authorization': "Bearer " + sessionStorage.getItem("alpacaToken"),
            "APCA-API-KEY-ID": config.API_KEY_ID,
            "APCA-API-SECRET-KEY": config.API_SECRET_KEY
        },
        timeout: 5000
    })

    const getQuote = (stockSymbol) => dataApi.get("/v1/last_quote/stocks/" + stockSymbol)
    const isMarketOpen = () => api.get('v2/clock')
    const getTradableAssets = () => api.get('v2/assets?status=active')
    const getAccount = () => api.get('v2/account')
    const getPositions = () => api.get('v2/positions')
    const getSpecificPosition = (stockSymbol) => api.get('v2/positions/' + stockSymbol.toUpperCase())
    const getSpecificAsset = (stockSymbol) => api.get('v2/assets/' + stockSymbol.toUpperCase())

    const getPortfolioHistory = async (timeFrame) => {

        /** if (timeFrame === "1D") {
            timeFrame= timeFrame + "&timeframe=5Min"
        }
        **/
        const portfolio = await api.get("v2/account/portfolio/history?period=" + timeFrame)
        console.log("portfolio", portfolio)


        portfolio.combinedDates = combineDates(portfolio.data.timestamp, portfolio.data.equity)
        portfolio.portfolioChange = calculatePercentChange(portfolio.data.base_value, portfolio.combinedDates)

        return portfolio
    }

    const getOrders = () => api.get('v2/orders?status=all&limit=5')
    // const postOrders = data => api.post('v2/orders', data)

    const getWatchlist = async (watchListExisting) => {
        let watchList = [];
        try {
        
        
        let watchListName = watchListExisting ? watchListExisting : (await api.get('v2/watchlists:by_name?name=featured')).data.assets
            let symbols = ''
            for (const stock of watchListName) {
                console.log("watch", stock)
                if (symbols !== "") {
                    symbols += "," + stock.symbol
                }
                else {
                    symbols += stock.symbol
                }
            }
            const watchListData = await dataApi.get('v1/bars/1D?limit=1&symbols=' + symbols)
            for (const stock of Object.keys(watchListData.data)) {
                const currentStock = watchListData.data[stock][0];
                watchList.push(
                    { symbol: stock, current_price: currentStock.c, change_today: (currentStock.c - currentStock.o) / currentStock.o }
                )
            }
        } catch (err) {
            await api.post('v2/watchlists', { name: "featured", symbols: [] })
            watchList = []
        }

        return watchList
    }

    const addWatchList = async (stockSymbol) => {
        const body = { symbol: stockSymbol, name: "featured" }
        const addWatchListResponse = await api.post("v2/watchlists:by_name?name=featured", body)
    }

    const removeWatchList = async (stockSymbol) => {
        const removeWatchListResponse = await api.delete("v2/watchlists:by_name/"+stockSymbol+"?name=featured")
    }

    const isWatchList = async (stockSymbol) => {
        let watchListName = await api.get('v2/watchlists:by_name?name=featured')

        try {
            for (const stock of watchListName.data.assets) {
                if (stockSymbol === stock.symbol) {
                    return true
                }
            }
            return false
        } catch {
            return false
        }
    }

    const createOrder = async (orderType, stockSymbol, qty) => {

        const orderData = {
            symbol: stockSymbol,
            qty: qty,
            side: orderType,
            time_in_force: "fok",
            type: "market"
        }
        const orderResponse = await api.post('v2/orders', orderData)
    }

    const cancelOrder = async (orderID) => {
        const cancelResponse = await api.delete('v2/orders/'+ orderID)
    }


  return {
    getQuote,
    isMarketOpen,
    getTradableAssets,
    getAccount,
    getPositions,
    getPortfolioHistory,
    getOrders,
    getSpecificPosition,
    createOrder,
    getSpecificAsset,
    getWatchlist,
    addWatchList,
    isWatchList,
    removeWatchList
  };
};

export default alpacaApi;

/*



const Alpaca = require('@alpacahq/alpaca-trade-api')
const API_KEY = 'AKFZXJH121U18SHHDRFO';
const API_SECRET = 'pnq4YHlpMF3LhfLyOvmdfLmlz6BnASrTPQIASeiU';
const USE_POLYGON = false;  // by default we use the Alpaca data stream but you can change that

const CLIENT_ID = "985df6514a91378156304f72b06d8711";
const CLIENT_SECRET = "55b69c853e13630dfb3c6bb706d65137ce92773d";



const alpaca = new Alpaca({
    keyId: 'AKFZXJH121U18SHHDRFO',
    secretKey: 'pnq4YHlpMF3LhfLyOvmdfLmlz6BnASrTPQIASeiU',
    paper: true,
    usePolygon: false
  })



export const getPortfolio = async (timePeriod, timeFrame, date_start, date_end) => {
    const profile = await alpaca.getPortfolioHistory({
        date_start: Date,
        date_end: Date,
        period: '1M' | '3M' | '6M' | '1A' | 'all' | 'intraday',
        timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D',
        extended_hours: Boolean
    })

    return profile;
}


export const createOrder = async (timePeriod, timeFrame, date_start, date_end) => {
    const order = await alpaca.createOrder({
        symbol: string, // any valid ticker symbol
        qty: number,
        side: 'buy' | 'sell',
        type: 'market' | 'limit' | 'stop' | 'stop_limit',
        time_in_force: 'day' | 'gtc' | 'opg' | 'ioc',
        limit_price: number,
        stop_price: number,
        client_order_id: string // optional
    })

    return order;
}

*/
