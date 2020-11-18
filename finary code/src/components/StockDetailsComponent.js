import React, {Component} from 'react';
import axios from 'axios';

const configStock = {
    token: 'pk_38652998cb3045628f7f82de81ad931d'
}

class StockDetailsComponent extends Component{

    
    constructor(props){
        super(props);
        this.state = {

            // Stock details
            companyName : null,
            marketcap : 0, 
            avg30Volume : 0, 
            dividendYield : 0, 
            peRatio : 0, 
            week52high : 0, 
            week52low : 0,

            //Quote
            latestPrice : 0, 
            high : 0, 
            low : 0, 
            changePercent : 0, 
            change : 0,

            //Company Details
            symbol : null, 
            companyName : null, 
            website : null, 
            industry : null, 
            description : null
        }
    }

    componentDidMount() {
        
        const symbol = "PYPL";

        axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=${configStock.token}`)
                .then((res) => {

                    this.setState({
                        companyName : res.data.companyName,
                        marketcap : res.data.marketcap, 
                        avg30Volume : res.data.avg30Volume, 
                        dividendYield : res.data.dividendYield, 
                        peRatio : res.data.peRatio, 
                        week52high : res.data.week52high, 
                        week52low : res.data.week52low
                    });
        })

        axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${configStock.token}`)
        .then((res) => {

            this.setState({
                latestPrice : res.data.latestPrice, 
                high : res.data.high, 
                low : res.data.low, 
                changePercent : res.data.changePercent, 
                change : res.data.change,
            });
        })

        axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${configStock.token}`)
        .then((res) => {

            this.setState({
                symbol : res.data.symbol, 
                companyName : res.data.companyName, 
                website : res.data.website, 
                industry : res.data.industry, 
                description : res.data.description
            });
        })
         
         
    }

    render(){
        return (
            <div>
                <h1>Stock Details</h1>
                <ul>
                    
                    <h2>companyName: {this.state.companyName}</h2>
                    <h2>marketcap: {this.state.marketcap}</h2>
                    <h2>avg30Volume: {this.state.avg30Volume}</h2>
                    <h2>dividendYield: {this.state.dividendYield}</h2>
                    <h2>peRatio: {this.state.peRatio}</h2>
                    <h2>week52high: {this.state.week52high}</h2>
                    <h2>week52low: {this.state.week52low}</h2>
                </ul>

                <h1>Quote Details</h1>
                <ul>
                
                    
                    <h2>latestPrice: {this.state.latestPrice}</h2>
                    <h2>high: {this.state.high}</h2>
                    <h2>low: {this.state.low}</h2>
                    <h2>changePercent: {this.state.changePercent}</h2>
                    <h2>change: {this.state.change}</h2>
                    
                </ul>

                <h1>Company Details</h1>
                <ul>
                
                    <h2>symbol: {this.state.symbol}</h2>
                    <h2>companyName: {this.state.companyName}</h2>
                    <h2>website: {this.state.website}</h2>
                    <h2>industry: {this.state.industry}</h2>
                    <h2>description: {this.state.description}</h2>
                </ul>
            </div>

        )
    }
 
}

export default StockDetailsComponent;