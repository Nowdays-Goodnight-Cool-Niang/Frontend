import ContentHeader from '../components/common/ContentHeader';
import Input from '../components/common/Input';
import TodoList from '../components/todo/TodoList';
import Button from '../components/common/Button';
import TodoForm from '../components/todo/TodoForm';

function Todo() {
  return (
    <div className='flex justify-center'>
      <div className='max-w-[24rem] w-full'>
        <ContentHeader>Todo</ContentHeader>
        <Input placeholder='할 일을 입력해 주세요' />
        <Button text={'추가하기'} onClick={() => {}} />
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default Todo;
