import "./Promo.css";
import promoImg from "../../images/text__COLOR_landing-logo.svg";

function Promo(props) {
  return (
    <section className="promo ">
      <div className="promo__container">
        <div className="promo__about">
          <h1 className="promo__heading">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__text">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a href="" className="promo__button">
            Узнать больше
          </a>
        </div>
        <img className="promo__img" src={promoImg} alt='Земной шар из слова web'></img>
      </div>
    </section>
  );
}

export default Promo;
