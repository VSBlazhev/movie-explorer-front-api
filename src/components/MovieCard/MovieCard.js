import "./MovieCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function MovieCard(props) {

  const { name, duration, trailerLink, saveMovie, deleteMovie, card, saved} = props

  const movieCardDuration = `${
    Math.trunc(card.duration / 60) > 0
      ? Math.trunc(card.duration / 60) + `ч`
      : ""
  } 
  ${card.duration % 60 > 0 ? (card.duration % 60) + `м` : ""}`;


  function handleLikeMovie (){
      saveMovie(card)
  };

 function handleDislike (){
    deleteMovie(card)
  };

  const location = useLocation();

  const movieCardLocation = location.pathname;

  const movieCardClassname = `${
    movieCardLocation === "/movies"
      ? `movie-card__like-btn`
      : `movie-card__delete-btn `
  } 
    ${saved ? `movie-card__like-btn_active` : ''}`;
  
  const movieSrc = `${
    movieCardLocation === '/movies' ?
    (`https://api.nomoreparties.co`+ card.image.url) :
    
    card.image

  }`  

  return (
    <div className="movie-card">
      <a href={`${trailerLink}`} target="_blank"><img className="movie-card__img" src={movieSrc} alt='Кадр из фильма'></img></a>
      <div className="movie-card__container">
        <p className="movie-card__name">{name}</p>
        <button 
          className={movieCardClassname}
          onClick={!saved ? handleLikeMovie : handleDislike}
        ></button>
      </div>
      <p className="movie-card__duration">{movieCardDuration }</p>
    </div>
  );
}

export default MovieCard;
