import React, { Component } from "react";


//subcomponents
import ProgressBar from "./ProgressBar"
import PersonalInfo from "./PersonalInfo"
import Address from "./Address"
import FAQs from "./FAQs"
import Groups from "./Groups"
import FreeStock from "./FreeStock"

//api


// styled components
import {
} from "reactstrap";

class OnBoardingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: '',
            personalInfo : {},
            address : {},
            investingQuestions : {},
            groupChoices: {},
            currentStep : 0
        }
      }

    
    setFreeStock = (choice) => {
        this.setState({ stock: choice })
        this.setState({ currentStep: this.state.currentStep + 1 })
    }
    setPersonalInfo = (personalInfo) => {
        this.setState({ personalInfo })
        this.setState({ currentStep: this.state.currentStep + 1 })
    }

    setAddress = (address) => {
        this.setState({ address })
        this.setState({ currentStep: this.state.currentStep + 1 })
    }

    setInvestingQuestions = ( investingQuestions ) => {
        this.setState({ investingQuestions })
        this.setState({ currentStep: this.state.currentStep + 1 })
    }

    setGroupChoices = ( groupChoices ) => {
        this.setState({ groupChoices })
    }
    

    render() {
            
        return (
            <div style={{ display:"flex", flexDirection:"column", width:"100%", height:"100vh", paddingLeft:"10%", paddingRight:"10%", alignItems:"center"}}>
                {this.state.currentStep === 0 && <FreeStock setFreeStock={this.setFreeStock}/> }
                {this.state.currentStep > 0 && <ProgressBar currentStep={this.state.currentStep}/> }
                {this.state.currentStep === 1 && <PersonalInfo setPersonalInfo={this.setPersonalInfo} /> }
                {this.state.currentStep === 2 && <Address setAddress={this.setAddress} /> }
                {this.state.currentStep === 3 && <FAQs setInvestingQuestions={this.setInvestingQuestions} /> }
                {this.state.currentStep === 4 && <Groups setGroupChoices={this.setGroupChoices} /> }
            </div>
        )
    }
}

export default OnBoardingPage;
