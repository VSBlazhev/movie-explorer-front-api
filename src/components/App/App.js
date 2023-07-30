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


function App() {
  const [currentUser, setCurrentUser] = useState();

  const [savedMovies, setSavedMovies] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [isSuccesful, setSuccefull] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .checkAuth()
      .then((currentUser) => {
        
        setCurrentUser(currentUser.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  
  useEffect(() => {
    if (currentUser) {
      api.getSavedMovies().then((res) => {
        setSavedMovies(res);
      });
    }
  }, [currentUser]);

  function handleRegister(inputs) {
    api
      .createUser({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .then(() => {
        handleLogin(inputs);
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
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });

    api
      .getUserId()
      .then((currentUser) => {
        console.log(currentUser);
        setCurrentUser(currentUser.data);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
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
    api.logOut().then(() => {
      setLoggedIn(false);
      localStorage.clear();
      navigate("/", { replace: true });
    });
  }

  function handlePatchUserInfo(inputs) {
    api
      .patchUserInfo({ name: inputs.name, email: inputs.email })
      .then(() => {
        setCurrentUser({ name: inputs.name, email: inputs.email });
        setSuccefull(true);
      })
      .finally(()=>{
        setTimeout(()=>{
          setSuccefull(false)
        }, 5000)
      })
      .catch((err) => {
        setSuccefull(false);
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
        console.log(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header isLoggedIn={!!currentUser} />
        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                isLoading={isLoading}
                isLoggedIn={!!currentUser}
              >
                <Movies
                  saveMovie={handleSaveMovie}
                  deleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                />
              </ProtectedRouteElement>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                isLoading={isLoading}
                isLoggedIn={!!currentUser}
              >
                <SavedMovies
                  savedMovies={savedMovies}
                  deleteMovie={handleDeleteMovie}
                  saveMovie={handleSaveMovie}
                />
              </ProtectedRouteElement>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                isLoading={isLoading}
                isLoggedIn={!!currentUser}
              >
                <Profile
                  handlePatchUserInfo={handlePatchUserInfo}
                  handleLogout={handleLogout}
                  isSuccesful={isSuccesful}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              </ProtectedRouteElement>
            }
          />

          <Route
            path="/signup"
            element={
              !!currentUser ? (
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
              !!currentUser ? (
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
