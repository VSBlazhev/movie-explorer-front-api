import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";
import logo from "../../images/logo.svg";
import accountButton from "../../images/profile.svg";
import { useState } from "react";

function Navigation() {

  const location = useLocation();
  const headerLocation = location.pathname;

  const [isBurgerOpen, setBurgerOpen] = useState(false);

  const openBurger = () => {
    setBurgerOpen(true);
  };

  const closeBurger = () => {
    setBurgerOpen(false);
  };

  return (
    <header className={`header ${headerLocation != '/' ? "header_bg_white" : ''}`}>
      <Link to="/" className="header__logo">
        <img className="header__logo-img" src={logo} alt='Логотип проекта'></img>
      </Link>
      <button className="navigation__burger" onClick={openBurger}></button>

      <nav className={`navigation ${isBurgerOpen ? "navigation_opened" : ""}`}>
        <div className="navigation__container">
          <button
            className="navigation__close-btn"
            onClick={closeBurger}
          ></button>

          <div className="navigation__link-container">
            <NavLink to="/" className="navigation__link">
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Сохранённые фильмы
            </NavLink>
            <NavLink to="/profile" className="navigation__account-btn">
              <img src={accountButton} alt='Картинка профайла'></img>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
