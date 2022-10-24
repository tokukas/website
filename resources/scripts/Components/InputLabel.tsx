import React from 'react';

type TPropsInputLabel = {
  forInput: string;
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export default function InputLabel({
  forInput, value, className = '', children,
}: TPropsInputLabel) {
  return (
    <label
      htmlFor={forInput}
      className={`block font-medium text-sm text-gray-700 ${className}`}
    >
      {value || children}
    </label>
  );
}

InputLabel.defaultProps = {
  className: '',
  children: null,
};
