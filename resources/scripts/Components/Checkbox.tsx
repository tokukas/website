/* eslint-disable max-len */
import React from 'react';

type TProps = {
  id: string;
  name: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  id, name, value, handleChange,
}: TProps) {
  return (
    <input
      id={id}
      type="checkbox"
      name={name}
      value={value}
      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      onChange={(e) => handleChange(e)}
    />
  );
}
