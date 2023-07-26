import { Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useInput } from "../../utils/Validation";
import InputErrorsBlock from "../InputErrorsBlock/InputErrorsBlock";

function Login(props) {
  const { handleLogin, errorMessage } = props;

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ email: email.value, password: password.value });
  }

  const email = useInput("", {
    required: true,
    min: 2,
    max: 800,
    isEmail: true,
  });

  const password = useInput("", { required: true, min: 2, max: 30 });

  return (
    <section className="login">
      <h2 className="form__title form__title_place_signin">Рады видеть!</h2>
      <div className="form__container">
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__input-heading">E-mail</label>
          <input
            className="form__input form__input_email"
            required
            type="email"
            value={email.value}
            onChange={email.onChange}
          ></input>
          <span className="form__input-error">
            {email.touched && !email.isValid ? (
              <InputErrorsBlock errors={email.errors} />
            ) : null}
          </span>
          <label className="form__input-heading">Пароль</label>
          <input
            className="form__input form__input_password"
            required
            type="password"
            value={password.value}
            onChange={password.onChange}
          ></input>
          <span className="form__input-error">
            {password.touched && !password.isValid ? (
              <InputErrorsBlock errors={password.errors} />
            ) : null}
          </span>
          <div className="form__button-container">
          <button
            disabled={!email.isValid || !password.isValid}
            className={`form__button form__button_place_signin ${
              email.isValid && password.isValid ? "" : "form__button_disabled"
            }`}
            type="submit"
          >
            Войти
          </button>
          {errorMessage ? <span className="form__button-error">{errorMessage}</span> : null}
          </div>
        </form>

        <p className="form__text ">
          Ещё не зарегистрированы?
          <Link to="/signup" replace="true" className="form__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
