import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { beatApi } from "../../utils/BeatApi";
import Preloader from "../Preloader/Preloader";

function Movies(props) {

  const {saveMovie, deleteMovie, savedMovies } = props;

  const [shortMoviesCheckboxState, setShortMoviesCheckBoxState] =  useState(false);
  
  const [beatMovies, setAllMovies] = useState([]); 

  const [initialMovies, setInitialMovies] = useState([]); 

  const [filteredMovies, setFilteredMovies] = useState([]); 

  const [errorMessage, setErrorMessage] = useState('')

  const [isPreloaderOpen, setPreloaderOpen] = useState(false)

  function filterShortMovies(cards) {
    const shortMovies = cards.filter((el) => el.duration <= 40);
    return shortMovies;
  }

  function filterMoviesByReq(movies, params) {
    const filteredCards = movies.filter((el) =>
      el.nameRU.toString().toLowerCase().includes(params.toLowerCase())
    );

    return filteredCards;
  }

  function handleSetfilteredMovies(movies, params, checkBoxValue) {
    const movieList = filterMoviesByReq(movies, params);
      if (movieList.length === 0){
        setErrorMessage('По вашему запросу ничего не найдено')

  } else{ 
    setErrorMessage('')
    setInitialMovies(movieList);
    setFilteredMovies(checkBoxValue ? filterShortMovies(movieList) : movieList);
    localStorage.setItem("movies", JSON.stringify(movieList));
  } 
  }

  function handleSubmit(params) {
    localStorage.setItem("movieSearch", params);
    localStorage.setItem("shortMovieCheckBoxState", shortMoviesCheckboxState);

    if (beatMovies.length <= 0) {
      setPreloaderOpen(true)
      beatApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem("beatMovies", movies);
          setAllMovies(movies);
          handleSetfilteredMovies(movies, params, shortMoviesCheckboxState);
        })
        .catch((err) => {
          console.log(err)
          setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема  с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
          
        })
        .finally(() => {
          setPreloaderOpen(false)
        });
    } else {
      handleSetfilteredMovies(beatMovies, params, shortMoviesCheckboxState);
    }
  }

  function handleShortFilms() {
    setShortMoviesCheckBoxState(!shortMoviesCheckboxState);
    if (shortMoviesCheckboxState) {
      setFilteredMovies(initialMovies);
    } else {
      setFilteredMovies(filterShortMovies(initialMovies));
    }

    localStorage.setItem("shortMovieCheckBoxState", !shortMoviesCheckboxState);
  }

  useEffect(() => {
    if (localStorage.getItem("shortMovieCheckBoxState") === "true") {
      setShortMoviesCheckBoxState(true);
    } else {
      setShortMoviesCheckBoxState(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      if (localStorage.getItem("shortMovieCheckBoxState") === "true") {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  return (
    <section className="movies">
      <SearchForm
        searchSubmit={handleSubmit}
        handleShortFilms={handleShortFilms}
        shortMoviesCheckboxState={shortMoviesCheckboxState}
      />
      {isPreloaderOpen ? <Preloader/> : null}  

      {errorMessage ? <span className="movies__error-message">{errorMessage}</span> :    
      
      <MoviesCardList
      movieCards={filteredMovies}
      savedMovies={savedMovies}
      saveMovie={saveMovie}
      deleteMovie={deleteMovie}
    />
      
      }

    </section>
  );
}

export default Movies;
