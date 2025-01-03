import { useNavigate } from "react-router";

interface AuthButtonProps {
  hasLogin: boolean;
}

function AuthButton({ hasLogin }: AuthButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={hasLogin ? () => {} : () => navigate("signin")}
      className=" text-gray-500 py-3 w-24 border border-solid rounded-lg border-slate-200"
    >
      {hasLogin ? "로그아웃" : "로그인"}
    </button>
  );
}

export default AuthButton;
