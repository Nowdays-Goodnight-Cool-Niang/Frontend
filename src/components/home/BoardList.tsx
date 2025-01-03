import { ITodoItem } from '../../type/todo';

interface IBoardListProps {
  todos: ITodoItem[];
}

function BoardList({ todos }: IBoardListProps) {
  return (
    <ul className="flex w-full flex-col justify-between">
      {todos.map((todo) => (
        <li className={`mb-1.5 ${todo.isDone ? 'text-gray-200' : ''}`} key={todo.id}>
          {todo.content}
        </li>
      ))}
    </ul>
  );
}

export default BoardList;
