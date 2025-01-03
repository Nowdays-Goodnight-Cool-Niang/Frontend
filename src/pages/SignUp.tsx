import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';
import InputsSpacing from '../components/auth/InputsSpacing';
import Button from '../components/common/Button';
import ContentHeader from '../components/common/ContentHeader';
import Input from '../components/common/Input';
import {
  ID_MAX_LENGTH,
  ID_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../utils/constants';

function SignUp() {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[24rem]">
        <ContentHeader>Sign up</ContentHeader>
        <AuthForm onSubmit={handleSubmit}>
          <InputsSpacing>
            <Input
              placeholder="id"
              name="id"
              onChange={handleChange}
              required
              minLength={ID_MIN_LENGTH}
              maxLength={ID_MAX_LENGTH}
            />
            <Input
              placeholder="password"
              name="password"
              onChange={handleChange}
              required
              minLength={PASSWORD_MIN_LENGTH}
              maxLength={PASSWORD_MAX_LENGTH}
            />
          </InputsSpacing>
          <Button text="회원가입" type="submit" />
        </AuthForm>
      </div>
    </div>
  );
}

export default SignUp;
