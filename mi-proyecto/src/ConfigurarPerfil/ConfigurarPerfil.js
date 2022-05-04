import React from "react";
import logo from "../img/logo_big.svg";

import "./ConfigurarPerfil.css";

export default function ConfigurarPerfil({
  user,
  color,
  userName,
  setColor,
  setUserName,
  setPerfilCompleto,
}) {
  const actualizarUserName = (e) => {
    setUserName(e.target.value);
  };

  const completarPerfil = () => {
    if (color !== null && userName !== null) {
      setPerfilCompleto(true);
    }
  };

  return (
    <div className="row container-perfil">
      {/* div padre*/}
      <div className="col-lg-6">
        <img className="logo-perfil" src={logo} alt="logo" />
      </div>
      {/* div 2 */}
      <div className="col-lg-6">
        <h1 className="h1-perfil">
          WELCOME
          <br />
          <span className="user">{user.displayName}!</span>
        </h1>
        <input
          className="username-input"
          name="username"
          placeholder="Type your username"
          onChange={(e) => actualizarUserName(e)}
        ></input>
        <p className="select-text">Select your favorite color</p>

        {/* colors */}
        <div className="colors">
          <div
            className={`color-select rojo ${
              color === "rojo" ? "selected" : ""
            }`}
            onClick={() => setColor("rojo")}
          ></div>

          <div
            className={`color-select naranjo ${
              color === "naranjo" ? "selected" : ""
            }`}
            onClick={() => setColor("naranjo")}
          ></div>

          <div
            className={`color-select amarillo ${
              color === "amarillo" ? "selected" : ""
            }`}
            onClick={() => setColor("amarillo")}
          ></div>

          <div
            className={`color-select verde ${
              color === "verde" ? "selected" : ""
            }`}
            onClick={() => setColor("verde")}
          ></div>

          <div
            className={`color-select celeste ${
              color === "celeste" ? "selected" : ""
            }`}
            onClick={() => setColor("celeste")}
          ></div>

          <div
            className={`color-select morado ${
              color === "morado" ? "selected" : ""
            }`}
            onClick={() => setColor("morado")}
          ></div>
        </div>
        {/* fin colors */}

        {/* footer*/}
        <div>
          {userName && color && (
            <button className="bot-continue" onClick={() => completarPerfil()}>Continue</button>
          )}
          <p className="footer1-perfil">© 2020 Devs_United - 
          <span className="footer-rojo">BETA</span>
          </p>
        </div>
        {/* fin footer*/}
      </div>
      {/* fin div 2 */}
    </div>
    // fin div padre
  );
}
