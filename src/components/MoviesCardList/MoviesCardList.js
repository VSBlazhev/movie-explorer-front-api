import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}


function MoviesCardList(props) {

const {savedMovies, movieCards, deleteMovie, saveMovie} = props

const [cardsToRender, setCardsToRender] = useState(0)

const[cardsToAdd, setCardsToAdd] = useState(0)

const [width, setDimensions] = useState(window.innerWidth);

const location = useLocation()

const currentLocation = location.pathname


function handleCardsToAdd(width){

  if(width > 768){
    setCardsToAdd(4)
   }
 else if(width <= 768 ){
    setCardsToAdd(2)
   }
 else if(width <= 322){
    setCardsToAdd(2)
   }
}

function addMore(){
  setCardsToRender(prevCount => prevCount + cardsToAdd)
}


function returnSaved(arr, movie) {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}


useEffect(()=>{
  if(width > 768){
    setCardsToRender(8)
    setCardsToAdd(4)
   }
 else if(width <= 768 ){
    setCardsToRender(4)
    setCardsToAdd(2)
   }
 else if(width <= 322){
    setCardsToRender(5)
    setCardsToAdd(2)
   }

},[])


useEffect(() => {
  const debouncedHandleResize = debounce(function handleResize() {
    setDimensions(window.innerWidth);

  }, 1000);

  const debouncedCards = debounce(function handleCards() {
    handleCardsToAdd(window.innerWidth)
  }, 1000);

  window.addEventListener("resize",debouncedHandleResize);
  window.addEventListener("resize",debouncedCards);

  return (_) => {
    window.removeEventListener("resize", debouncedHandleResize);
    window.removeEventListener("resize",debouncedCards);
  };
});




  return (
      <section className="movies-card-list">
        <div className="movies-card-list__container">
        { 
        movieCards.slice(0, cardsToRender).map((item) => (
          <MovieCard
            card={item}
            key={item.id || item._id}
            name={item.nameRU}
            duration={item.duration}
            trailerLink={item.trailerLink}
            deleteMovie={deleteMovie}
            saveMovie={saveMovie}
            saved={returnSaved(savedMovies, item)}
          />
        ))}
        </div>
      {(movieCards.length === 0 || cardsToRender >= movieCards.length || currentLocation === '/saved-movies' ) ? null : <button className="movies-card-list__btn" onClick={addMore}>Ещё</button>  }
      </section>
  );
}

export default MoviesCardList;
