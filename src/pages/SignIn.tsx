import { useNavigate } from "react-router";
import Button from "../components/common/Button";
import ContentHeader from "../components/common/ContentHeader";
import Input from "../components/common/Input";
import { ButtonColorType } from "../utils/constants";
import InputsSpacing from "../components/auth/InputsSpacing";
import ButtonsSpacing from "../components/auth/ButtonsSpacing";
import AuthForm from "../components/auth/AuthForm";

function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div className="max-w-[24rem] w-full">
        <ContentHeader>Sign in</ContentHeader>
        <AuthForm>
          <InputsSpacing>
            <Input placeholder="id" />
            <Input placeholder="password" />
          </InputsSpacing>
          <ButtonsSpacing>
            <Button text="로그인" onClick={() => {}} />
            <Button
              text="회원가입"
              colorType={ButtonColorType.gray}
              onClick={() => navigate("/signup")}
            />
          </ButtonsSpacing>
        </AuthForm>
      </div>
    </div>
  );
}

export default SignIn;
