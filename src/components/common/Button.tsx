import { ButtonColorType } from "../../utils/constants";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  colorType?: ButtonColorType;
}

function Button({
  text,
  onClick,
  disabled = false,
  colorType = ButtonColorType.black,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        colorType === ButtonColorType.black && "bg-black text-white"
      } ${
        colorType === ButtonColorType.gray && "bg-gray-50 text-gray-600"
      } py-4 rounded-lg w-full`}
    >
      {text}
    </button>
  );
}

export default Button;
