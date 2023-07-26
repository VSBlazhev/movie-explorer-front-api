import "./Profile.css";
import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useInput } from "../../utils/Validation";
import InputErrorsBlock from "../InputErrorsBlock/InputErrorsBlock";


function Profile(props) {
  const { handlePatchUserInfo, handleLogout } = props;

  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    handlePatchUserInfo({name: name.value, email: email.value});
  }

  function logOut() {
    handleLogout();
  }

  const name = useInput(currentUser.name, {
    required: true,
    min: 2,
    max: 30,
    isCorrectName: true,
    isUsedValue: currentUser.name,
  });
  const email = useInput(currentUser.email, {
    required: true,
    min: 2,
    max: 800,
    isEmail: true,
    isUsedValue: currentUser.email,
  });




  return (
    <section className="account">
      <div className="account__container">
        <p className="account__hello">{`Привет, ${currentUser.name} !`}</p>
        <form className="account__form" onSubmit={handleSubmit}>
          <div className="account__form-input-container">
            <input
              className="account__input"
              
              value={name.value}
              onChange={name.onChange}
              type="text"
            ></input>

            <label className="account__input-label">Имя</label>
          </div>
          {name.touched && !name.isValid ? (
            <InputErrorsBlock errors={name.errors} />
          ) : null}
          <div className="account__form-input-container">
            <input
              className="account__input"
              
              value={email.value}
              onChange={email.onChange}
              type="email"
            ></input>

            <label className="account__input-label">Email</label>
          </div>
          {email.touched && !email.isValid ? (
            <InputErrorsBlock errors={email.errors} />
          ) : null}
          <button
            disabled={(name.touched && !name.isValid ) ||
              (email.touched && !email.isValid)}
            className={`account__change ${(name.touched && !name.isValid ) ||
             (email.touched && !email.isValid) ? "account__change_disabled" : ""
            }`}

            type='submit'
          >
            Редактировать
          </button>
        </form>

        <a href="" className="account__logut" onClick={logOut}>
          Выйти из аккаунта
        </a>
      </div>
    </section>
  );
}

export default Profile;
