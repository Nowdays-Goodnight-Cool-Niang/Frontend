import { useState } from 'react';

interface IDropdownProps {
  options: string[];

  name?: string;
  value: { selectValue: string; inputValue: string };
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Dropdown({ options, name, value, onChange }: IDropdownProps) {
  const [selectValue, setSelectValue] = useState(value.selectValue);
  const [inputValue, setInputValue] = useState(value.inputValue);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectValue(newValue);
    onChange(newValue, inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(selectValue, newValue);
  };

  return (
    <div className='flex'>
      <select
        className='w-full rounded-lg border bg-gray-50 border-gray-70 p-3 text-base mt-2 h-11'
        {...(name && { name })}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type='text'
        {...(name && { name })}
        onChange={handleInputChange}
        placeholder={'링크를 입력해 주세요'}
        className='w-full rounded-lg border bg-gray-50 border-gray-70 p-3 text-base placeholder:text-gray-100 mt-2 h-11'
      />
    </div>
  );
}

export default Dropdown;