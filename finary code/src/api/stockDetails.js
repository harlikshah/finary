import axios from 'axios'

import { calculatePercentChangeFromCloses } from "./stockUtils"

const configStock = {
    token: 'pk_d38d11300b2147dda15bd18785c0e011'
}

const getStockStatistics = async (symbol) => {
    const statistics = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=${configStock.token}`)
    return statistics
}

const getStockFinancials = async (symbol) => {
    const financials = await axios.get("https://cloud.iexapis.com/stable/stock/GOOGL/financials?token=pk_38652998cb3045628f7f82de81ad931d&period=annual")
    return financials
}

const getStockPricing = async (symbol) => {
    const quote = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${configStock.token}`)
    return quote
}

const getStockDetails = async (symbol) => {

    const details = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${configStock.token}`)
    return details
}

const getStockHistoricalPricing = async (symbol, timeFrame) => {
    const pricing = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/${timeFrame}?token=${configStock.token}&includeToday=true`)
    const newPricing = []
    if (timeFrame === "1D") {
        const currentPricing = pricing.data
        currentPricing.forEach(time => {
            if (time.close) {
                newPricing.push(time)
            }
        
        pricing.data = newPricing
        });
    }
    pricing.stockChange = calculatePercentChangeFromCloses(pricing.data)
    return pricing
}

const getStockNews = async (symbol) => {
    const news = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/news/last/15?token=${configStock.token}`)
    return news
}

export { getStockStatistics, getStockDetails, getStockPricing, getStockFinancials, getStockHistoricalPricing, getStockNews }
