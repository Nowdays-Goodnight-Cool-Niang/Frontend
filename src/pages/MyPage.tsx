import MySection from '@/components/mypage/MySection';
import Header from '@/components/common/Header';
import useScrollToTop from '@/hooks/useScrollToTop';

function MyPage() {
  useScrollToTop();

  return (
    <>
      <main className="background bg-gray-50">
        <Header title="마이페이지" showBackButton />
        <MySection />
      </main>
    </>
  );
}

export default MyPage;
