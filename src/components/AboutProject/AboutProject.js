import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="section__tittle">О проекте</h2>
      <div className="about-project__text-container">
        <div className="about-project__description">
          <p className="about-project__description-tittle">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__description-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>

        <div className="about-project__description">
          <p className="about-project__description-tittle">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__description-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timetable">
        <div className="about-project__timetable-backend-container">
          <div className="about-project__timetable-backend">
            <p className="about-project__timetable-element-text about-project__timetable-element-text_back">
              1 неделя
            </p>
          </div>

          <span className="about-project__timetable-element-subtext">
            Back-end
          </span>
        </div>
        <div className="about-project__timetable-frontend-container">
          <div className="about-project__timetable-front">
            <p className="about-project__timetable-element-text">4 недели</p>
          </div>
          <span className="about-project__timetable-element-subtext">
            Front-end
          </span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
