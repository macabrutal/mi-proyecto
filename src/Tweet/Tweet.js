import React, { useState } from "react";

import likeOff from "../img/like-off.svg";
import delete_icon from "../img/delete_icon.svg";



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
      <img
            alt="tweet-foto"
            className="tweet-avatar"
            src={tweet.imagenAutor}
            onClick={() => verPerfilUsuario(tweet.imagenAutor)}
          />
        <div className="tweets">
          <section className="tweet-header">
          <h4 className={`tweet-autor tweet-${tweet.color}`}>{tweet.autor}</h4>
          {tweet.fechaCreacion && (
            <p className="tweet-fecha"> - {tweet.fechaCreacion}</p>
          )}
          <div >
          {/* borrar tweet: */}
          {user && user.uid === tweet.uid && (
            <button onClick={() => eliminarTweet(tweet.id)} className="delete">
               <img src={delete_icon}  alt="delete" />
              {" "}
              {" "}
            </button>
          )}  
        </div>
          </section>
          <p className="tweet-autor">{tweet.email}</p>
          <p> {tweet.tweet}</p>
          <span className="corazon" onClick={() => actualizarLike(tweet.id, tweet.likes)}>
            <img src={likeOff} className="img_corazon" alt="heart" />
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
