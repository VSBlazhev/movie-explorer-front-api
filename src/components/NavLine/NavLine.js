import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import accountButton from "../../images/profile.svg";

function NavLine() {

  const location = useLocation();
  const headerLocation = location.pathname;

  return (
    <header className={`header ${headerLocation != '/' ? "header_bg_white" : ''}`}>
      <Link to="/" className="header__logo">
        <img className="header__logo-img" src={logo} alt='Логотип проекта'></img>
      </Link>
      <div className="header__nav-container">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `header__nav-link ${isActive ? "header__nav-link_active" : ""}`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            `header__nav-link ${isActive ? "header__nav-link_active" : ""}`
          }
        >
          Сохраненные фильмы
        </NavLink>
      </div>
      <Link to="/profile" className="header__account-btn">
        <img className="header__account-btn-img" src={accountButton} alt='Картинка профайла'></img>
      </Link>
    </header>
  );
}

export default NavLine;
