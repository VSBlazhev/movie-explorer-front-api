import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="section__tittle">Технологии</h2>
      <span className="techs__tittle">7 технологий</span>
      <p className="techs__subtittle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__name">HTML</li>
        <li className="techs__name">CSS</li>
        <li className="techs__name">JS</li>
        <li className="techs__name">React</li>
        <li className="techs__name">Git</li>
        <li className="techs__name">Express.js</li>
        <li className="techs__name">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
