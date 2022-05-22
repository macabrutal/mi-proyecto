import React, { useEffect, useState } from "react";
import logo_small from "./img/logo_small.svg";
import logo_small_title from "./img/logo_small_title.svg";
import logout_img from "./img/logout.svg";
import back from "./img/back.svg"
import { firestore, loginConGoogle, auth, logout } from "./firebase";

import "./App.css";
import "./index.css";
import Tweet from "./Tweet/Tweet";
import Formulario from "./Formulario/Formulario";
import ConfigurarPerfil from "./ConfigurarPerfil/ConfigurarPerfil";
import Login from "./Login/Login";

export default function App() {
  //1. crear hooks de estado
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
    fechaCreacion: "",
    imagenAutor: "",
    color: ""
  });
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  const [color, setColor] = useState();
  const [perfilCompleto, setPerfilCompleto] = useState(false);
  const [filtrarTweets, setFiltrarTweets] = useState(false);
  const [loadingCreacion, setLoadingCreacion] = useState(false);
  const [usuarioElegido, setUsuarioElegido] = useState();

  //2. crear useEffect:
  useEffect(() => {
    const desuscribir = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            uid: doc.data().uid,
            tweet: doc.data().tweet,
            autor: doc.data().autor,
            likes: doc.data().likes,
            email: doc.data().email,
            fechaCreacion: doc.data().fechaCreacion,
            imagenAutor: doc.data().imagenAutor,
            color: doc.data().color
          };
        });
        setTweets(tweets);
      });

    auth.onAuthStateChanged((user) => {
      setUser(user);
      setUsuarioElegido(user.photoURL);
    });

    return () => desuscribir();
  }, []);

  const cerrarSesion = () => {
    setUser();
    setFiltrarTweets(false);
    setPerfilCompleto(false);
    logout();
  };

  // ENVIAR TWEET
  const sendTweet = (e) => {
    e.preventDefault(); //para evitar que se actualice la página
    let enviarTweet = firestore.collection("tweets").add(tweet); //enviamos el tweet a la colección
    //el envio devuelve una promesa
    let solicitarDocumento = enviarTweet.then((docRef) => {
      return docRef.get();
    });

    setLoadingCreacion(true);

    //docRef.det() devuelve una promesa y dentro podemos rescatar la info del doc:
    solicitarDocumento.then((doc) => {
      let nuevoTweet = {
        tweet: doc.data().tweet,
        autor: doc.data().autor,
        email: user.email,
        uid: user.uid,
        id: doc.id,
        fechaCreacion: doc.data().fechaCreacion,
        imagenAutor: user.photoURL,
        color: doc.data().color
      };
      //el cual añadiré dentro del estado el nuevo tweet y luego los demás tweets
      setTweets([nuevoTweet, ...tweets]);
      setTweet({
        tweet: "",
        autor: "",
        uid: "",
        email: "",
        fechaCreacion: "",
        imagenAutor: "",
      });

      setLoadingCreacion(false);
    });
  };

  //MANEJADOR DE CAMBIO:
  const handleChange = (e) => {
    const fecha = new Date();

    let nuevoTweet = {
      tweet: e.target.value,
      uid: user.uid,
      email: user.email,
      autor: userName,
      fechaCreacion: fecha.toLocaleDateString(),
      imagenAutor: user.photoURL,
      color: color,
    };
    setTweet(nuevoTweet);
  };
  //fin ----MANEJADOR DE CAMBIO

  //BORRAR Tweets:
  const deleteTweet = (id) => {
    //borramos el tweet de nuestro estado:
    const nuevosTweets = tweets.filter((tweet) => {
      return tweet.id !== id;
    });
    //actualizamos los tweets:
    setTweets(nuevosTweets);
    //borramos el tweet en firestore:
    firestore.doc(`tweets/${id}`).delete();
  };
  //fin ----BORRAR Tweets

  //ACTUALIZAR EL DOC:
  // const actualizarDoc = (id, algunParametro) => {
  //   firestore.doc(`tweets/${id}`).update({ unaPropiedad: algunParametro });
  // };
  // fin----ACTUALIZAR EL DOC:

  //ACTUALIZAR LIKES:
  const likeTweet = (id, numlikes) => {
    if (!numlikes) numlikes = 0;
    //retorna la promesa para saber cuando eliminar el loader
    return firestore.doc(`tweets/${id}`).update({ likes: numlikes + 1 });
  };

  const configurarPerfil = () => {
    setColor();
    setUserName();
    setPerfilCompleto(false);
  };

  const verTodosTweets = () => {
    setFiltrarTweets(false);
    setUsuarioElegido(user.photoURL);
  };

  const verPerfilUsuario = (imagenPerfil) => {
    setFiltrarTweets(true);
    setUsuarioElegido(imagenPerfil);
  };

  return (
    <div >
      {!user && <Login loginConGoogle={loginConGoogle} />}

      {user && !perfilCompleto && (
        <ConfigurarPerfil
          user={user}
          color={color}
          userName={userName}
          setColor={setColor}
          setUserName={setUserName}
          setPerfilCompleto={setPerfilCompleto}
        />
      )}

      {perfilCompleto && (
        <div className="user-profile ">
          {!filtrarTweets ? (
            <>
              <img
                alt="foto"
                className={`user-profile-pic user-profile-pic-${color}`}
                src={user.photoURL}
                onClick={() => verPerfilUsuario(user.photoURL)}
              />
              <div
                style={{ marginLeft: "100px" }}
                onClick={() => configurarPerfil()}
              >
                <img alt="logo" src={logo_small}/>
                <img alt="logo" src={logo_small_title} className="logo_small_title"/>
              </div>
            </>
          ) : (
            <>
            <div className="back">
              <img src={back} alt="back"/>
              <p onClick={() => verTodosTweets()}>{userName}</p>
            </div>
              
              {user.photoURL === usuarioElegido && (
                <button className="logout-btn" onClick={cerrarSesion}>
                  <div>
                    <img src={logout_img} alt="logout"/>
                  </div>
                  <p>Log out</p>
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Formulario */}
      {user && perfilCompleto && (
        <div className="main_section">
          <img alt="user-profile" src={usuarioElegido} className="user-avatar"
/>

          {!filtrarTweets && (
            <Formulario
              tweet={tweet}
              sendTweet={sendTweet}
              handleChange={handleChange}
              loadingCreacion={loadingCreacion}
            />
          )}
        </div>
      )}
      {/* fin----Formulario------ */}

      {/* Tweets */}
      {user &&
        perfilCompleto &&
        (filtrarTweets
          ? tweets
              .filter((tweet) => {
                return tweet.imagenAutor === usuarioElegido;
              })
              .map((tweet) => {
                return (
                  <Tweet
                    user={user}
                    tweet={tweet}
                    likeTweet={likeTweet}
                    deleteTweet={deleteTweet}
                    verPerfilUsuario={verPerfilUsuario}
                  />
                );
              })
          : tweets.map((tweet) => {
              return (
                <Tweet
                  user={user}
                  tweet={tweet}
                  likeTweet={likeTweet}
                  deleteTweet={deleteTweet}
                  verPerfilUsuario={verPerfilUsuario}
                />
              );
            }))}
      {/* fin----Formulario------ */}
    </div>
  );
}
