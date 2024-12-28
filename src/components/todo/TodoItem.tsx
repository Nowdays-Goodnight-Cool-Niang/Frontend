import { ITodoItem } from '../../type/todo';
import TodoDeleteButton from './TodoDeleteButton';

function TodoItem({ content, isDone }: ITodoItem) {
  const handleCheck = () => {};

  return (
    <div className='flex justify-between w-full mb-3'>
      <label>
        <input type='checkbox' checked={isDone} className='mr-3' onChange={handleCheck} />
        <span>{content}</span>
      </label>
      <TodoDeleteButton />
    </div>
  );
}

export default TodoItem;
