import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import { useState, useEffect} from "react";


function SavedMovies(props) {
  const { deleteMovie, savedMovies, saveMovie } = props;

  const [shortMoviesCheckboxState, setShortMoviesCheckBoxState] = useState(false);

  const [moviesToRender, setMoviesToRender] = useState(savedMovies);

  const [filteredMovies, setFilteredMovies] = useState(moviesToRender)

  const [errorMessage, setErrorMessage] = useState('')




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
    setFilteredMovies(checkBoxValue ? filterShortMovies(movieList) : movieList);
    
  } 
  }

  function handleSubmit(params) {

    const movieList = filterMoviesByReq(savedMovies, params);
      if (movieList.length === 0){
        setErrorMessage('По вашему запросу ничего не найдено')
       } else {
      handleSetfilteredMovies(movieList, params, shortMoviesCheckboxState);
      setMoviesToRender(filteredMovies)
      
    }
  }

  function handleShortFilms() {
    setShortMoviesCheckBoxState(!shortMoviesCheckboxState);
    if (shortMoviesCheckboxState) {
      setMoviesToRender(filteredMovies);
    } else {
      setMoviesToRender(filterShortMovies(filteredMovies));
    }
  }
  

  useEffect(()=>{
    setMoviesToRender(savedMovies)
  },[])

  return (
    <section className="saved-movies">
      <SearchForm 
      searchSubmit={handleSubmit}
      handleShortFilms={handleShortFilms}
      shortMoviesCheckboxState={shortMoviesCheckboxState}
      />
      {errorMessage ? <span className="movies__error-message">{errorMessage}</span>  : 
        <MoviesCardList
          movieCards={moviesToRender}
          deleteMovie={deleteMovie}
          saveMovie={saveMovie}
          savedMovies={savedMovies}
        />
      }
    </section>
  );
}

export default SavedMovies;
