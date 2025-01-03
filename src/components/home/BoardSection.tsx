import { ITodoItem } from '../../type/todo';
import BoardList from './BoardList';

interface IBoardSectionProps {
  title: string;
  todos: ITodoItem[];
}

function BoardSection({ title, todos }: IBoardSectionProps) {
  return (
    <>
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <BoardList todos={todos} />
    </>
  );
}

export default BoardSection;
