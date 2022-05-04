import React, { useState } from "react";
import corazon from "../img/corazon.svg";

import { Spinner } from "react-bootstrap";

import "./Tweet.css"

export default function Tweet({
  user,
  tweet,
  deleteTweet,
  likeTweet,
  verPerfilUsuario,
}) {
  const [loading, setLoading] = useState(false);

  const actualizarLike = (id, likes) => {
    setLoading(true);
    let promesaLike = likeTweet(id, likes);
    //recibe la promesa y deja de cargar cuando la promesa termina
    promesaLike.then(() => setLoading(false));
  };

  const eliminarTweet = (id) => {
    const confirmacion = window.confirm(
      "Are you sure you want to delete this tweet?"
    );
    if (confirmacion) {
      deleteTweet(id);
    }
  };

  return (
    <div key={tweet.id}>
      <div className="contenedorTweet">
        <div className="tweets">
          <img
            alt="tweet-foto"
            src={tweet.imagenAutor}
            onClick={() => verPerfilUsuario(tweet.imagenAutor)}
          />
          <h4 className={`tweet-autor tweet-${tweet.color}`}>{tweet.autor}</h4>
          <p className="tweet-autor">{tweet.email}</p>
          {tweet.fechaCreacion && (
            <p className="tweet-autor"> - {tweet.fechaCreacion}</p>
          )}
          <p> {tweet.tweet}</p>
        </div>
        <div className="elementos_tweet">
          {/* borrar tweet: */}
          {user && user.uid === tweet.uid && (
            <button onClick={() => eliminarTweet(tweet.id)} className="delete">
              {" "}
              Eliminar{" "}
            </button>
          )}

          <span className="corazon" onClick={() => actualizarLike(tweet.id, tweet.likes)}>
            <img src={corazon} className="img_corazon" alt="heart" />
            {loading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <div> {tweet.likes ? tweet.likes : 0} </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
