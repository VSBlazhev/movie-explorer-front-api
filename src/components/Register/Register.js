import { Link } from "react-router-dom";
import "./Register.css";
import { useInput } from "../../utils/Validation";
import InputErrorsBlock from "../InputErrorsBlock/InputErrorsBlock";


function Register(props) {
  const { handleRegister, errorMessage } = props;

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({
      name: name.value,
      email: email.value,
      password: password.value,
    });
  }

  const name = useInput("", {
    required: true,
    min: 2,
    max: 30,
    isCorrectName: true,
  });
  const email = useInput("", {
    required: true,
    min: 2,
    max: 800,
    isEmail: true,
  });

 

  const password = useInput("", { required: true, min: 2, max: 30 });

  return (
    <section className="register">
      <h2 className="form__title form__title_place_signup">
        Добро пожаловать!
      </h2>
      <div className="form__container">
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__input-heading">Имя</label>
          <input
            onChange={name.onChange}
            required
            value={name.value}
            className="form__input form__input_name"
          />

          {name.touched && !name.isValid ? (
            <InputErrorsBlock errors={name.errors} />
          ) : null}
          <label className="form__input-heading">E-mail</label>
          <input
            type="email"
            required
            onChange={email.onChange}
            value={email.value}
            className="form__input form__input_email"
          />

          {email.touched && !email.isValid ? (
            <InputErrorsBlock errors={email.errors} />
          ) : null}
          <label className="form__input-heading">Пароль</label>
          <input
            type="password"
            required
            onChange={password.onChange}
            value={password.value}
            className="form__input form__input_password"
          />
          {password.touched && !password.isValid ? (
            <InputErrorsBlock errors={password.errors} />
          ) : null}
          <div className="form__button-container">
            
          <button
            disabled={!email.isValid || !password.isValid || !name.isValid}
            className={`form__button form__button_place_signin ${
              email.isValid && password.isValid && name.isValid
                ? ""
                : "form__button_disabled"
            }`}
            type="submit"
          >
            Зарегистрироваться
          </button>
          {errorMessage ? <span className="form__button-error">{errorMessage}</span> : null}
          </div>
        </form>
            
        <p className="form__text ">
          Уже зарегистрированы?
          <Link to="/signin" className="form__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
