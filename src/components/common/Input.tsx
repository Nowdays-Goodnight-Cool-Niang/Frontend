interface InputProps {
  type?: 'password' | 'text';
  value?: string;
  placeholder?: string;
  labelName?: string;
  name?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  validationMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({
  labelName,
  type = 'text',
  value = '',
  placeholder = '',
  required = false,
  name,
  maxLength,
  minLength,
  validationMessage,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <label className="mt-2 block md:mt-6">
      <div className="flex items-center">
        <span className="text-sm font-medium leading-6 tracking-tight text-gray-700">
          {labelName}
        </span>
        {required && (
          <div className="ml-1 rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-semibold text-red-500">
            필수
          </div>
        )}
      </div>

      <input
        type={type}
        value={value}
        {...(name && { name })}
        {...(maxLength && { maxLength })}
        {...(minLength && { minLength })}
        required={required}
        onChange={(e) => {
          if (onChange) onChange(e);
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 leading-7 tracking-tight text-gray-700 placeholder:text-gray-300 dark:bg-gray-700 dark:text-gray-100 md:mt-3 md:px-4 md:py-4"
      />
      {validationMessage && (
        <span className="mt-1 inline-block px-2 text-xs font-medium leading-5 tracking-tight text-red-500 md:mt-2 md:px-4 md:text-sm">
          {validationMessage}
        </span>
      )}
    </label>
  );
}

export default Input;
