import { useTodoStore } from '../../stores/useTodoStore';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  return (
    <div className='mt-12'>
      {todos.map((todo) => (
        <TodoItem {...todo} key={todo.id} />
      ))}
    </div>
  );
}

export default TodoList;
