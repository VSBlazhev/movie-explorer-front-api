import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const footerLocation = location.pathname;

  return (
    <footer
      className={`footer ${
        footerLocation === "/" ||
        footerLocation === "/movies" ||
        footerLocation === "/saved-movies"
          ? ""
          : "footer_hidden"
      }`}
    >
      <span className="footer__heading">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </span>
      <div className="footer__info-container">
        <p className="footer__date">© 2023</p>
        <div className="footer__links-container">
          <a
            href="https://practicum.yandex.ru/"
            target="_blank"
            className="footer__links"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            className="footer__links"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
