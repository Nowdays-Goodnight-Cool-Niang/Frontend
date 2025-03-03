import BaseButton from '../components/common/BaseButton';
import Wrapper from '../components/common/Wrapper';
import KakaoSvg from "../assets/icons/ic_kakao.svg?react"

function Home() {
  const handleKakaoLogin = () => {
    console.log(import.meta.env.VITE_API_BASE_URL)
    const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
    window.location.assign(url);
  };

  return (
    <div className='relative background'>
      <div className='w-full h-screen overflow-hidden'>
        <img src='src/assets/images/img_geometric_graphic.png' className='w-full absolute bottom-[15%]'/>
      </div>
      <div className='absolute w-full h-screen bottom-0'>
        <Wrapper>
          <div className='flex flex-col justify-between items-center h-full py-11 gap-[40%]'>
            <div className='opacity-0 translate-y-5 animate-fade-in h-full flex flex-col justify-center items-center gap-4'>
              <h1 className='text-5xl text-gray-50 font-museo'>SharE:v</h1>
              <p className='text-title-1 text-center text-gray-50'>프로필을 등록하고<br/>간편하게 네트워킹하세요</p>
            </div>
            <BaseButton variant='kakao' onClick={handleKakaoLogin}>
              <span className='flex items-center gap-2 justify-center'><KakaoSvg/>카카오 로그인</span>
            </BaseButton>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

export default Home;
