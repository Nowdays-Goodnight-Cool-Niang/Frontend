import { useTodoStore } from '../../stores/useTodoStore';
import BoardList from './BoardList';

function TodoBoard() {
  const completeTodos = useTodoStore((state) => state.completeTodos);
  const remainingTodos = useTodoStore((state) => state.remainingTodos);

  return (
    <div className="mt-12 w-96 rounded-2xl bg-white p-6 drop-shadow-xl">
      <h2 className="mb-2 text-xl font-bold">완료한 할 일</h2>
      <BoardList todos={completeTodos} />
      <hr className="my-4 border-gray-50" />
      <h2 className="mb-2 text-xl font-bold">남은 할 일</h2>
      <BoardList todos={remainingTodos} />
    </div>
  );
}

export default TodoBoard;
