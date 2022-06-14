import React from "react";
import "./customInput.scss";

interface Props {
  name: string;
  customName?: string;
  description?: string;
  placeholder?: string;
  register: any;
  error?: any;
  required?: boolean | string;
  pattern?: RegExp;
  patternMessage?: string;
  minLength?: number;
  maxLength?: number;
}

const CustomInput: React.FC<Props> = ({
  name,
  customName,
  description,
  placeholder,
  register,
  error,
  required,
  pattern,
  patternMessage,
  minLength,
  maxLength,
}) => {
  const label = customName
    ? customName.replace(/^./, customName[0].toUpperCase())
    : name.replace(/^./, name[0].toUpperCase());
  return (
    <div className="customInputContainer">
      <label className="customInputContainer__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="customInputContainer__input"
        placeholder={placeholder}
        type="text"
        id={name}
        name={name}
        {...register(name, {
          required: required ? `${label} is required` : false,
          minLength: {
            value: minLength && minLength,
            message: minLength && `Minimum length of ${minLength} characters`,
          },
          maxLength: {
            value: maxLength && maxLength,
            message: maxLength && `Maximum length of ${maxLength} characters`,
          },
          pattern: {
            value: pattern && pattern,
            message: patternMessage && patternMessage,
          },
        })}
      />
      {error[name]?.message && (
        <p className="inputError">{error[name]?.message}</p>
      )}
      {description && <p className="inputDescription">{description}</p>}
    </div>
  );
};

export default CustomInput;
