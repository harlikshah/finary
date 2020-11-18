import React, { Component } from "react";
import Datetime from "react-datetime";
import Select from 'react-select'


//subcomponents


//api


// styled components
import {
    Input,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup
} from "reactstrap";

class FAQs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion : 0
        }
    }

    toggleQuestion = () => {
        this.setState({currentQuestion : this.state.currentQuestion + 1 })
    }

    answerInvestGoal = (num) => {
        const ans = ['Learn more about investing', 'Engage with other users', 'Grow my investments', 'Save for the long-term'][num]
        this.setState({ goal: ans })
        this.toggleQuestion()
    }
    answerInvestHow = (num) => {
        const ans = ['Conservatively', 'Aggressively', 'Not sure what else','Not sure what else'][num]
        this.setState({ how: ans })
        this.toggleQuestion()
    }
    answerInvestExp = (num) => {
        const ans = ['Brand new investor', 'Amatuer investor', 'Competent investor', 'Expert invester'][num]
        this.setState({ exp: ans })
        this.toggleQuestion()
    }
    answerInvestCap = (num) => {
        const ans = ['Less than $5,000', '$5,000-$25,000', '$25,000-$100,000', 'More than $100,000'][num]
        this.setState({ cap: ans })
        this.toggleQuestion()
    }



    render() {


        return (
            <div style={{ display: "flex", flexDirection: "column", width: "75%", marginTop: "10px", justifyContent: "center", alignItems: "center" }}>
                <p style={{ marginTop: "10px", textAlign: "center", fontSize: this.state.currentQuestion === 0 ? "24px" : "20px", color: this.state.currentQuestion === 0 ? "#0F1C44" : "#CCD4DA", fontWeight: "500" }}>
                    {this.state.currentQuestion === 0 ? <strong>What is your investment goal?</strong> : "What is your investment goal?"}
                </p>
                { this.state.currentQuestion === 0 && 
                <div style ={{ marginBottom:"50px", marginTop:"50px"}}>
                    <button style={{ width:"45%", marginBottom:"10px", marginRight:"2%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestGoal(0)}>
                        Learn more about investing
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestGoal(1)}>
                        Engage with other users
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", marginRight:"2%", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestGoal(2)}>
                        Grow my investments
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestGoal(3)}>
                        Save for the long-term
                    </button>
                </div>}
                <p style={{ marginTop: "10px", textAlign: "center", fontSize: this.state.currentQuestion === 1 ? "24px" : "20px", color: this.state.currentQuestion === 1 ? "#0F1C44" : "#CCD4DA", fontWeight: "500", marginBottom:"10px" }}>
                    {this.state.currentQuestion === 1 ? <strong>How do you want to invest?</strong> : "How do you want to invest?"}
                </p>
                { this.state.currentQuestion === 1 && 
                <div style ={{ marginBottom:"50px", marginTop:"50px"}}>
                    <button style={{ width:"45%", marginBottom:"10px", marginRight:"2%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestHow(0)}>
                        Conservatively
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestHow(1)}>
                        Aggressively
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", marginRight:"2%", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestHow(2)}>
                        Not sure what else
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestHow(3)}>
                        Not sure what else
                    </button>
                </div>}
                <p style={{ marginTop: "10px", textAlign: "center", fontSize: this.state.currentQuestion === 2 ? "24px" : "20px", color: this.state.currentQuestion === 2 ? "#0F1C44" : "#CCD4DA", fontWeight: "500", marginBottom:"10px" }}>
                    {this.state.currentQuestion === 2 ? <strong>What is your investing experience?</strong> : "What is your investing experience?"}
                </p>
                { this.state.currentQuestion === 2 && 
                <div style ={{ marginBottom:"50px", marginTop:"50px"}}>
                    <button style={{ width:"45%", marginBottom:"10px", marginRight:"2%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestExp(0)}>
                        Brand New Investor
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestExp(1)}>
                        Amatuer Investor (Few months of experience)
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", marginRight:"2%", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestExp(2)}>
                        Competent Investor (1-2 years of experience)
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestExp(3)}>
                        Expert Investor (5+ years of experience)
                    </button>
                </div>}
                <p style={{ marginTop: "10px", textAlign: "center", fontSize: this.state.currentQuestion === 3 ? "24px" : "20px", color: this.state.currentQuestion === 3 ? "#0F1C44" : "#CCD4DA", fontWeight: "500", marginBottom:"10px" }}>
                    {this.state.currentQuestion === 3 ? <strong>How much investable money do you have?</strong> : "How much investable money do you have?"}
                </p>
                { this.state.currentQuestion === 3 && 
                <div style ={{ marginBottom:"50px", marginTop:"50px"}}>
                    <button style={{ width:"45%", marginBottom:"10px", marginRight:"2%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestCap(0)}>
                        Less than $5,000
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestCap(1)}>
                        $5,000-$25,000
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", marginRight:"2%", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestCap(2)}>
                        $25,000-$100,000
                    </button>
                    <button style={{ width:"45%", backgroundColor:"#FFFFFF", border:"none", height:"80px", fontSize:"20px", fontWeight:"600"}} onClick={() => this.answerInvestCap(3)}>
                        More than $100,000
                    </button>
                </div>}
                {this.state.goal && this.state.how && this.state.exp && this.state.cap &&
                <button style={{ width : "25%", borderRadius:"4px", marginTop:"50px", backgroundColor:"#5C7FEC", color:"#FFFFFF", height:"50px", border:"none"}} onClick={() => this.props.setInvestingQuestions(this.state)}> Next Step </button>
                }
            </div>
        )
    }
}


export default FAQs;
