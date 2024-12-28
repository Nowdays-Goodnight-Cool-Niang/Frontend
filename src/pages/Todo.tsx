import ContentHeader from '../components/common/ContentHeader';
import TodoInput from '../components/todo/TodoInput';
import TodoAddButton from '../components/todo/TodoAddButton';
import TodoList from '../components/todo/TodoList';

function Todo() {
  return (
    <div className='flex justify-center'>
      <div className='max-w-[24rem] w-full'>
        <ContentHeader>Todo</ContentHeader>
        <TodoInput></TodoInput>
        <TodoAddButton />
        <TodoList />
      </div>
    </div>
  );
}

export default Todo;
