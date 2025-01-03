import { ButtonColorType } from '../../utils/constants';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  colorType?: ButtonColorType;
}

function Button({
  type = 'button',
  text,
  onClick,
  disabled = false,
  colorType = ButtonColorType.black,
}: ButtonProps) {
  return (
    <button
      type={type}
      {...(onClick && { onClick })}
      disabled={disabled}
      className={`${colorType === ButtonColorType.black && 'bg-black text-white'} ${
        colorType === ButtonColorType.gray && 'bg-gray-50 text-gray-600'
      } w-full rounded-lg py-4`}
    >
      {text}
    </button>
  );
}

export default Button;
