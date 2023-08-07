import "./Portfolio.css";
import linkIcon from "../../images/about_me_link_icon.svg";

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__tittle">Портфолио</p>

      <a
        className="portfolio__links"
        target="_blank"
        href="https://github.com/VSBlazhev/how-to-learn"
      >
        Статичный сайт
        <img className="portfolio__link-image" src={linkIcon} alt='Стрелочка указатель'></img>
      </a>
      <a
        className="portfolio__links"
        target="_blank"
        href="https://vsblazhev.github.io/russian-travel/"
      >
        Адаптивный сайт
        <img className="portfolio__link-image" src={linkIcon} alt='Стрелочка указатель'></img>
      </a>
      <a
        className="portfolio__links"
        target="_blank"
        href="https://vsblazhev.github.io/react-mesto-auth"
      >
        Одностраничное приложение
        <img className="portfolio__link-image" src={linkIcon} alt='Стрелочка указатель'></img>
      </a>
    </div>
  );
}

export default Portfolio;
