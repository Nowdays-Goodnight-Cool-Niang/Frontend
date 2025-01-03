import { useState } from 'react';
import TodoDeleteButton from './TodoDeleteButton';

export interface TodoItemProps {
  initialValue: string;
  initialCheck: boolean;
}

function TodoItem({ initialValue, initialCheck }: TodoItemProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [check, setCheck] = useState(initialCheck);
  const [value, setValue] = useState(initialValue);

  return (
    <div className="mb-3 flex w-full items-center justify-between">
      <label>
        <input
          type="checkbox"
          checked={check}
          className="mr-3"
          onChange={() => setCheck((current) => !current)}
        />
        {!isEditMode && <span>{value}</span>}
      </label>
      {isEditMode && (
        <input
          className="w-full rounded-lg border border-gray-100 px-4 py-2 text-base placeholder:text-gray-100"
          type="text"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              setIsEditMode(false);
            }
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      {!isEditMode && (
        <div className="flex gap-2">
          <button onClick={() => setIsEditMode(true)}>✏️</button>
          <TodoDeleteButton />
        </div>
      )}
    </div>
  );
}

export default TodoItem;
