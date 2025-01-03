import ContentHeader from '../components/common/ContentHeader';
import TodoBoard from '../components/home/TodoBoard';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ContentHeader>Home</ContentHeader>
      <TodoBoard />
    </div>
  );
}

export default Home;
