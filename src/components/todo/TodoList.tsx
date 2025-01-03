import { useTodoStore } from '../../stores/useTodoStore';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  return (
    <div className="mt-12">
      {todos.map((todo) => (
        <TodoItem {...todo} key={todo.id} initialValue="빼빼로 먹기" initialCheck={false} />
      ))}
    </div>
  );
}

export default TodoList;
