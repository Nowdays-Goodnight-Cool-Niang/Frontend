interface IBaseButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'kakao' | 'white';
  size?: 'default' | 'large';
  isDisabled?: boolean;
  animate?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function BaseButton({
  children,
  variant = 'default',
  size = 'default',
  isDisabled = false,
  animate = false,
  onClick,
}: IBaseButtonProps) {
  const bgClasses = {
    default: 'bg-blue-500 text-white hover:bg-blue-400',
    white: 'bg-white text-gray-800 hover:bg-gray-100',
    kakao: 'bg-[#FEE500] text-[#000000]/85 hover:bg-[#eecc0d]',
  };

  const sizeClasses = {
    default: 'h-14',
    large: 'h-16',
  };

  return (
    <button
      className={`${animate && 'animate-button-in'} ${bgClasses[variant]} w-full rounded-2xl px-5 font-semibold tracking-tight transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${sizeClasses[size]}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BaseButton;
