import "./Profile.css";
import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useInput } from "../../utils/Validation";
import InputErrorsBlock from "../InputErrorsBlock/InputErrorsBlock";


function Profile(props) {
  const { handlePatchUserInfo, handleLogout,isSuccesful, errorMessage, setErrorMessage} = props;

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

  

  useEffect(()=>{
    setErrorMessage('')
    /* crossOriginIsolated.log("я сработал") */
   },[])

   const buttonActive = name.isValid || email.isValid & (email.touched || name.touched)


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
          {isSuccesful ? <span>Данные успешно обновлены</span> : null}
          {errorMessage ? <span className="form__button-error">{errorMessage}</span> : null}
          {email.touched && !email.isValid ? (
            <InputErrorsBlock errors={email.errors} />
          ) : null}
          <button
            disabled={ !buttonActive }
            className={`account__change ${ !buttonActive ? "account__change_disabled" : ""
            }`}

            type='submit'
          >
            Редактировать
          </button>
        </form>

        <button href="" className="account__logut" onClick={logOut}>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
