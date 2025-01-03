interface InputProps {
  value?: string;
  placeholder?: string;
}

function Input({ value = "", placeholder = "" }: InputProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="w-full border border-gray-100 text-base px-4 py-3 rounded-lg placeholder:text-gray-100"
    />
  );
}

export default Input;
