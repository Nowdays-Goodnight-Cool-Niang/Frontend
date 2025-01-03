import { ITodoItem } from '../../type/todo';

interface IBoardListProps {
  todos: ITodoItem[];
}

function BoardList({ todos }: IBoardListProps) {
  return (
    <ul className="mb-3 flex w-full flex-col justify-between">
      {todos.map((todo) => (
        <li key={todo.id}>{todo.content}</li>
      ))}
    </ul>
  );
}

export default BoardList;
