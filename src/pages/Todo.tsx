import ContentHeader from "../components/common/ContentHeader";
import TodoInput from "../components/todo/TodoInput";

function Todo() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[24rem] w-full">
        <ContentHeader>Todo</ContentHeader>
        <TodoInput></TodoInput>
      </div>
    </div>
  );
}

export default Todo;
