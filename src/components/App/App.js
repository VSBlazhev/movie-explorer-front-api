import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Main from "../Main/Main";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useEffect, useState, useMemo } from "react";
import React from "react";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import Preloader from "../Preloader/Preloader";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [savedMovies, setSavedMovies] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [isSuccesful, setSuccefull] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth()
  }, [currentUser]);


  useEffect(()=>{
    if(isLoggedIn){
      api.getSavedMovies()
      .then((res)=>{
        setSavedMovies(res)
      })
      api.getUserId()
      .then((currentUser)=>{
        setCurrentUser(currentUser.data)
      })

    }
  },[isLoggedIn])

  function checkAuth(){

    api.checkAuth()
    .then((data)=>{
      if(data){
        setLoggedIn(true)
      }
    })
    .catch((err)=>{
      console.log(err)
      setLoggedIn(false)
    })
  }

  function handleRegister(inputs) {

    api
      .createUser({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .then(() => {
        handleLogin(inputs)
      })
      .catch((err) => {
        if (err === 409) {
          setErrorMessage("Email уже используется");
        } else {
          console.log(err);
        }
      });
  }

  function handleLogin(inputs) {
    api
      .loginUser({ email: inputs.email, password: inputs.password })
      .then(() => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getUserId()
      .then((currentUser) => {
        console.log(currentUser);
        setCurrentUser(currentUser.data);
        
      })
      .catch((err) => {
        if (err === 401) {
          setErrorMessage("Неправильная почта или пароль");
        } else {
          console.log(err);
        }
      });
  }

  function handleLogout() {
    api.logOut().
    then(() => {
      setLoggedIn(false);
      localStorage.clear();
      navigate('/', {replace: true})
    });
  }

  function handlePatchUserInfo(inputs) {
    api
      .patchUserInfo({ name: inputs.name, email: inputs.email })
      .then(() => {
        setCurrentUser({ name: inputs.name, email: inputs.email });
        setSuccefull(true)
      })
      .catch((err) => {
        setSuccefull(false)
        if (err === 409) {
          setErrorMessage("Email уже используется");
        } else {
          console.log(err);
        }
      });
  }

  function handleSaveMovie(card) {
    api
      .saveMovie(card)
      .then((newCard) => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovie(movie) {
    const movieForDel = savedMovies.find(
      (el) => el.movieId === movie.id || el.movieId === movie.movieId
    );
    api
      .deleteMovie(movieForDel._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMovies(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                saveMovie={handleSaveMovie}
                deleteMovie={handleDeleteMovie}
                element={Movies}
                savedMovies={savedMovies}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                deleteMovie={handleDeleteMovie}
                saveMovie={handleSaveMovie}
                element={SavedMovies}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                isLoggedIn={isLoggedIn}
                handlePatchUserInfo={handlePatchUserInfo}
                handleLogout={handleLogout}
                element={Profile}
                isSuccesful={isSuccesful}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />

          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register
                  errorMessage={errorMessage}
                  handleRegister={handleRegister}
                />
              )
            }
          />

          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login errorMessage={errorMessage} handleLogin={handleLogin} />
              )
            }
          />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
