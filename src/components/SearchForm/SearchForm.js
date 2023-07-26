import "./SearchForm.css";
import find from "../../images/find.svg";
import { useInput } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import InputErrorsBlock from "../InputErrorsBlock/InputErrorsBlock";

function SearchForm(props) {
  const { searchSubmit, handleShortFilms, shortMoviesCheckboxState } = props;

  const location = useLocation();

  const currentLocation = location.pathname;

  const search = useInput(
    currentLocation === "/movies" ? localStorage.getItem("movieSearch") : "",
    { required: true }
  );

  console.log(shortMoviesCheckboxState);

  function handleSubmit(e) {
    e.preventDefault();
    searchSubmit(search.value);
  }

  return (
    <>
      <section className="search-form">
        <div className="search-form__container">
          <form className="search-form__form" onSubmit={handleSubmit}>
            <input
              className="search-form__input"
              value={search.value}
              placeholder="Фильм"
              onChange={search.onChange}
              required
            />

            <button
              className={`search-form__button-submit ${
                !search.isValid ? "search-form__button-submit_disabled" : ""
              }`}
              type="submit"
              disabled={search.isValid ? false : true}
            >
              <img src={find} alt="Найти" />
            </button>
          </form>
          <div className="switch">
            <p className="switch__subtitle">Короткометражки</p>
            <label className="switch__slider">
              <input
                className="switch__input"
                type="checkbox"
                checked={shortMoviesCheckboxState}
                onChange={handleShortFilms}
              />
              <span className="switch__round"></span>
            </label>
          </div>
        </div>
        {search.touched && !search.isValid ? (
          <InputErrorsBlock errors={search.errors} />
        ) : null}
      </section>
    </>
  );
}

export default SearchForm;
