import React from "react";
import { Spinner } from "react-bootstrap";


import "./Formulario.css"

export default function Formulario({
  tweet,
  sendTweet,
  handleChange,
  loadingCreacion,
}) {
  return (
    <form className="form">
      <textarea
        name="tweet"
        value={tweet.tweet}
        onChange={handleChange}
        rows="5"
        cols="30"
        maxLength="200"
        placeholder="What's happening?"
      ></textarea>

      <div className="tweet-count">
       <span> {tweet.tweet ? tweet.tweet.length : 0}</span>
        <span>200 max.</span>
      </div>

      <button onClick={sendTweet} className="send">
        {loadingCreacion ? <Spinner animation="border" role="status"/> : "POST"}
      </button>
    </form>
  );
}
