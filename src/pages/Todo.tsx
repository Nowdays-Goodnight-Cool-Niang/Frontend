import TodoAddButton from '../components/todo/TodoAddButton';
import TodoList from '../components/todo/TodoList';

function Todo() {
  return (
    <div className='flex flex-col'>
      Todo
      <TodoAddButton />
      <TodoList />
    </div>
  );
}

export default Todo;
