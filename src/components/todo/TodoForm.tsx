import TodoAddButton from './TodoAddButton';
import TodoInput from './TodoInput';

function TodoForm() {
  return (
    <div className='flex flex-col justify-center gap-2.5'>
      <TodoInput />
      <TodoAddButton />
    </div>
  );
}

export default TodoForm;
