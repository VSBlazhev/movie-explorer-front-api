import { useEffect, useState } from "react";

const useValidation = (value, schema) => {
  const [inputErrors, setErrors] = useState({});

  useEffect(() => {
    let errors = {};

    for (const validation in schema) {
      switch (validation) {
        case "min": {
          if (value.length < schema[validation]) {
            errors[
              validation
            ] = `В поле должно быть больше ${schema[validation]} символов`;

            console.log("не валидна minLength");
          } else {
            delete errors[validation];
          }
          break;
        }
        case "max": {
          if (value.length > schema[validation]) {
            errors[
              validation
            ] = `В поле должно быть меньше ${schema[validation]} символов`;

            console.log("не валидна maxLength");
          } else {
            delete errors[validation];
          }

          break;
        }
        case "required": {
          if (!value) {
            errors[validation] = `Поле не может быть пустым`;

            console.log("не валидна пустота +", validation);
          } else {
            delete errors[validation];
          }

          break;
        }
        case "isEmail": {
          const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!re.test(String(value).toLowerCase())) {
            errors[validation] = `Введите корректный email`;

            console.log("не валидна regexp");
          } else {
            delete errors[validation];
          }

          break;
        }
        case "isUsedValue":
          if (value === schema[validation]) {
            errors[validation] = "Ввидите новые данные";
          } else {
            delete errors[validation];
          }

          break;

        case "isCorrectName": {
          const reName = /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/;

          if (!reName.test(String(value))) {
            errors[validation] = `Некорректное имя`;

            console.log("Name error ");
          } else {
            delete errors[validation];
          }
          break;
        }

        default: {
          break;
        }
      }
    }

    setErrors(errors);
  }, [value, schema.min, schema.max, schema.isCorrectName, schema.isEmail, schema.isUsedValue]);

  return {
    errors: inputErrors,
    isValid: !Object.keys(inputErrors).length
  };
};

export const useInput = (initialValue, schema) => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
    setTouched(true);
  };

  const validationResult = useValidation(value, schema);

  return { value, onChange, ...validationResult, touched };
};