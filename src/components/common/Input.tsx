import { useState } from "react";

interface InputProps {
  initialValue?: string;
  placeholder?: string;
}

function Input({ initialValue = "", placeholder = "" }: InputProps) {
  const [value, setValue] = useState(initialValue);
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-100 text-base px-4 py-3 rounded-lg placeholder:text-gray-100"
    />
  );
}

export default Input;
