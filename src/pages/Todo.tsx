import ContentHeader from '../components/common/ContentHeader';
import TodoList from '../components/todo/TodoList';
import TodoForm from '../components/todo/TodoForm';

function Todo() {
  return (
    <div className='flex justify-center'>
      <div className='max-w-[24rem] w-full'>
        <ContentHeader>Todo</ContentHeader>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default Todo;
