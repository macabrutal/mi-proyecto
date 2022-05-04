import React from "react";
import { Spinner } from "react-bootstrap";

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

      <div>
        {tweet.tweet ? tweet.tweet.length : 0}
        <p>200 max.</p>
      </div>

      <button onClick={sendTweet} className="send">
        {loadingCreacion ? <Spinner animation="border" role="status"/> : "POST"}
      </button>
    </form>
  );
}
