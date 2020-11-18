import React, {Component} from 'react';

// import { getAccount, getPositions } from '../api/alpacaApi'
import alpacaApi from '../api/alpaca';





class AlpacaData extends Component{

    
    constructor(props){
        super(props);
        this.state = {
            buying_power: 0,
            cash: 0,
            long_market_value: 0,
            portfolio_value: 0,
            isMarketOpen: false
        }
    }

    componentDidMount() {

        const api = alpacaApi()
     
        api.isMarketOpen()
            .then((response) => {
                // console.log(response);
                
                if(response.data.is_open){
                    this.setState({
                        isMarketOpen: true
                    })                    
                }
            })
        
        api.getAccount()
            .then((response) => {
                // console.log(response);

                if(response.ok){
                    this.setState({
                        buying_power: response.data.buying_power,
                        cash: response.data.cash ,
                        long_market_value: response.data.long_market_value ,
                        portfolio_value: response.data.portfolio_value
                    })
                }

        })

        api.getPositions()
            .then((response) => {
                // console.log(response);
        })

        api.getPortfolioHistory()
            .then((response) => {
                // console.log(response);
        })

        api.getOrders()
            .then((response) => {
                // console.log(response);
        })

        // THIS is not working, need to take a look over POST - postOrders()

        // const url = config.PAPER_BASE_URL
        // fetch(config.PAPER_BASE_URL, {
        //     method: "POST",
        //     headers: {
        //         'APCA-API-KEY-ID': config.API_KEY_ID,
        //         'APCA-API-SECRET-KEY': config.API_SECRET_KEY,
        //         'Content-type': "application/json"
        //     },
        //     body: JSON.stringify({
        //         "symbol": "MTNB",
        //         "qty": 1,
        //         "side": "buy",
        //         "type": "market",
        //         "time_in_force": "day"
                    
        //     }),
        //     mode: "cors"
        // }).then(() => {
        //     fetch(url+"v2/orders")
        //         .then(response => response.json())
        //         .then(result => {
        //             console.log("resule inside", result)
    
        //         })
        //         .catch(e => console.error(e))
        // })
        

        
           
    }

    render(){
        return (
            <div>
                <h1>Account Details</h1>
                <ul>
                    <h2>{this.state.buying_power}</h2>
                    <h2>{this.state.cash}</h2>
                    <h2>{this.state.long_market_value}</h2>
                    <h2>{this.state.portfolio_value}</h2>
                </ul>
            </div>
        )
    }
 
}

export default AlpacaData;
