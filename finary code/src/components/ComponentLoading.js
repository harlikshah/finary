/*eslint-disable*/
import React from "react";

// reactstrap components
import logo from '../assets/single-wave-loader.gif'

// core components

function ComponentLoading(h) {
  h = typeof h === 'number'? h: 90
  return (
      <div style={{ display : "flex", justifyContent : "center", alignItems:"center", backgroundColor : "#FFFFFF", height :`${h}vh`}}>
          <img style={{ display:"block", maxWidth:"400px", maxHeight:"300px", width:"auto", height:"auto" }} src={logo} alt="loading..."/>
        </div>
  );
}

export default ComponentLoading;
