import React from "react";
import "./Login.css";

import logo from "../img/logo_big.svg"
import logo_google from "../img/logo_google.svg"

export default function Login({ loginConGoogle }) {
  return (
    <div className="row container-login">
      <div className="col-lg-6">
        <img className="logo-login" src={logo} alt="logo" />
      </div>

      <div className="col-lg-6">
        <h1 className="h1-signIn">
          LOREM
          <br />
          IPSUM DOLOR
        </h1>

        <p className="p-signIn">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        <div className="login-btn" >
          <button  className="login-btn1"  onClick={loginConGoogle}>
            <img  src={logo_google} alt="google"    />
          </button >
          <button className="login-btn2" onClick={loginConGoogle} >Sign in with Google</button>
        </div>

        <p className="footer_signIn">© 2020 Devs_United - 
        <span className="footer-rojo">BETA</span>
        </p>
        
      </div>
    </div>
  );
}
