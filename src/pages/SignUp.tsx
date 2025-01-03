import AuthForm from "../components/auth/AuthForm";
import InputsSpacing from "../components/auth/InputsSpacing";
import Button from "../components/common/Button";
import ContentHeader from "../components/common/ContentHeader";
import Input from "../components/common/Input";

function SignUp() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[24rem] w-full">
        <ContentHeader>Sign up</ContentHeader>
        <AuthForm>
          <InputsSpacing>
            <Input placeholder="id" />
            <Input placeholder="password" />
            <Input placeholder="password 재입력" />
          </InputsSpacing>

          <Button text="회원가입" onClick={() => {}} />
        </AuthForm>
      </div>
    </div>
  );
}

export default SignUp;
