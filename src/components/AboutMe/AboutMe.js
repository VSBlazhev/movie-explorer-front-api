import "./AboutMe.css";

import me from "../../images/me.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="section__tittle">Студент</h2>
      <div className="about-me__info-container">
        <div className="about-me__about-container">
          <span className="about-me__name">Слава</span>
          <p className="about-me__job">Фронтенд-разработчик, 29 лет</p>
          <p className="about-me__about">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/VSBlazhev?tab=repositories"
            target="_blank"
            className="about-me__git"
          >
            GitHub
          </a>
        </div>
        <div className="about-me__image-container">
          <img className="abbout-me__picture" src={me}></img>
        </div>
      </div>

      <Portfolio />
    </section>
  );
}

export default AboutMe;
