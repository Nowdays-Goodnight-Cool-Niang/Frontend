interface IButtonPrimaryProps {
  children: React.ReactNode;
  variant?: 'default' | 'kakao';
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function ButtonPrimary({ children, variant = 'default', isDisabled = false, onClick }: IButtonPrimaryProps) {
  const bgClasses = {
    default: 'bg-orange-500 text-gray-50 hover:bg-gray-500',
    kakao: 'bg-[#FEE500] text-[#000000]/85 hover:bg-[#eecc0d]',
  };

  return (
    <button
      className={`${bgClasses[variant]} w-full text-button-1 p-4 rounded-lg transition-colors duration-400`}
      disabled={isDisabled}
      onClick={isDisabled ? ()=> {} :  onClick}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
