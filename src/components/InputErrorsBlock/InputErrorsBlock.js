 const InputErrorsBlock = ({ errors = {} }) => {
    const entries = Object.entries(errors);
    return (
      <>
        {entries.map(([key, value]) => (
          <div className="form__input-error-container">
          <span className="form__input-error" key={key}>
            {value}
          </span>
          </div>
        ))}
      </>
    );
  };

  export default InputErrorsBlock