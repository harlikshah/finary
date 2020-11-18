import React, { Component } from "react";
import { parse } from "query-string"


//subcomponents
import Loading from "../../components/Loading"

//api
import { onBoarding, exhangeAlpacaToken } from "../../api/firebase"

// styled components
import {
} from "reactstrap";

class RegisterAlpaca extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        //this.oauthApi = oauthAlpacaApi()
    }

    async componentDidMount() {
        const params = parse(this.props.location.search)
        const tempCode = params.code
        const permCode = await exhangeAlpacaToken(tempCode)

        const onBoardingResponse = await onBoarding(permCode.data.access_token)
        sessionStorage.setItem('alpacaToken', permCode.data.access_token)
        this.props.history.push('/portfolio')
    }


    render() {

        return (
            <div>
                <Loading />
            </div>
        )

    }
}


export default RegisterAlpaca;