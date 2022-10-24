/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';

type TPropsTextInput = {
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  value?: string;
  className?: string;
  required?: boolean;
  isFocused?: boolean;
  autoComplete?: string;
  /* eslint-disable no-unused-vars */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  type = 'text',
  name,
  value,
  className,
  autoComplete,
  required,
  isFocused,
  handleChange,
}: TPropsTextInput) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <input
        type={type}
        name={name}
        value={value}
        className={
          `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${className}`
        }
        ref={input}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

TextInput.defaultProps = {
  type: 'text',
  className: '',
  value: '',
  autoComplete: '',
  required: false,
  isFocused: false,
};
