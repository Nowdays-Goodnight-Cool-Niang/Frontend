import Input from '@/components/common/Input';
import { IProfile } from '@/types';

interface IFormProps {
  type: 'default' | 'sns';
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  validationMessages: { [key: string]: string };
  formAccount: IProfile;
}

const defaultFields = [
  { labelName: '이름', placeholder: '홍길동', name: 'name', required: true },
  { labelName: '이메일', placeholder: 'example@ex.com', name: 'email', required: true },
];

const snsFields = [
  {
    labelName: 'LinkedIn',
    placeholder: 'linkedin.com/in/ooo',
    name: 'linkedinUrl',
    required: false,
  },
  {
    labelName: 'Github',
    placeholder: 'github.com/ooo',
    name: 'githubUrl',
    required: false,
  },
  {
    labelName: 'Instagram',
    placeholder: 'instagram.com/ooo',
    name: 'instagramUrl',
    required: false,
  },
];

function FormSection({
  type,
  handleChange,
  handleBlur,
  validationMessages,
  formAccount,
}: IFormProps) {
  const datas = {
    default: { title: '기본 정보', field: defaultFields },
    sns: { title: 'SNS', field: snsFields },
  };

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-base font-semibold tracking-tight text-gray-700">
        {datas[type].title}
      </h2>
      {datas[type].field.map((data) => (
        <Input
          key={data.name}
          labelName={data.labelName}
          placeholder={data.placeholder}
          name={data.name}
          value={formAccount ? formAccount[data.name as keyof IProfile] : ''}
          required={data.required}
          onChange={handleChange}
          onBlur={handleBlur}
          validationMessage={validationMessages[data.name] || ''}
        />
      ))}
    </div>
  );
}

export default FormSection;
