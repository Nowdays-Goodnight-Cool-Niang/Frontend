import { useTodoStore } from '../../stores/useTodoStore';
import BoardSection from './BoardSection';

function TodoBoard() {
  const completeTodos = useTodoStore((state) => state.completeTodos);
  const remainingTodos = useTodoStore((state) => state.remainingTodos);

  return (
    <div className="mt-3 w-96 rounded-2xl bg-white p-6 drop-shadow-xl">
      <BoardSection title="완료한 할 일" todos={completeTodos} />
      <hr className="my-4 border-gray-50" />
      <BoardSection title="남은 할 일" todos={remainingTodos} />
    </div>
  );
}

export default TodoBoard;
