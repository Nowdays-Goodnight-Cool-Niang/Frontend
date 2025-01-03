import Button from '../common/Button';
import Input from '../common/Input';

function TodoForm() {
  return (
    <div className='flex flex-col justify-center gap-2.5'>
      <Input placeholder='할 일을 입력해 주세요' />
      <Button text={'추가하기'} onClick={() => {}} />
    </div>
  );
}

export default TodoForm;
