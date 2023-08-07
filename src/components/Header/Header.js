import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import NavLine from "../NavLine/NavLine";

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

function Header(props) {
  const { isLoggedIn } = props;

  const [width, setDimensions] = useState(window.innerWidth);
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions(window.innerWidth);
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  const breakpoint = 768;

  const navLineOrNavigation =
    width <= breakpoint ? <Navigation /> : <NavLine />;


  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            navLineOrNavigation
          ) : (
            <header className="header">
              <Link to="/" className="header__logo">
                <img
                  className="header__logo-img"
                  src={logo}
                  alt="Логотип проекта"
                ></img>
              </Link>
              <div className="header__nav-container">
                <Link
                  to="/signup"
                  href=""
                  className="header__nav-link header__nav-link_register"
                >
                  Регистрация
                </Link>
                <Link
                  to="signin"
                  className="header__nav-link header__nav-link_enter"
                >
                  Войти
                </Link>
              </div>
            </header>
          )
        }
      />

      <Route
        path="/signin"
        element={
          <header className="header header_place_signs header_bg_white">
            <Link to="/" className="header__logo">
              <img
                className="header__logo-img"
                src={logo}
                alt="Логотип проекта"
              ></img>
            </Link>
          </header>
        }
      />

      <Route
        path="/signup"
        element={
          <header className="header header_place_signs header_bg_white">
            <Link to="/" className="header__logo">
              <img
                className="header__logo-img"
                src={logo}
                alt="Логотип проекта"
              ></img>
            </Link>
          </header>
        }
      />

      <Route
        path="/movies"
        element={width <= breakpoint ? <Navigation /> : <NavLine />}
      />

      <Route
        path="/saved-movies"
        element={width <= breakpoint ? <Navigation /> : <NavLine />}
      />

      <Route
        path="/profile"
        element={width <= breakpoint ? <Navigation /> : <NavLine />}
      />
    </Routes>
  );
}

export default Header;
