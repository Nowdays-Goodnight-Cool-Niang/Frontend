import Input from '../common/Input';

interface IFormProps {
  type: 'default' | 'sns';
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultFields = [
  { labelName: '이름', placeholder: '홍길동', name: 'name', required: true },
  { labelName: '이메일', placeholder: 'example@ex.com', name: 'email', required: true },
];

const snsFields = [
  { labelName: 'LinkedIn', placeholder: 'LinkedIn 아이디', name: 'linkedIn', required: false },
  { labelName: 'Github', placeholder: 'Github 아이디', name: 'github', required: false },
  { labelName: 'Instagram', placeholder: 'Instagram 아이디', name: 'instagram', required: false },
];

function FormSection({ type, handleChange }: IFormProps) {
  const datas = {
    default: { title: '기본 정보', field: defaultFields },
    sns: { title: 'SNS', field: snsFields },
  };

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-xl font-bold text-gray-400">{datas[type].title}</h2>
      {datas[type].field.map((data) => (
        <Input
          key={data.name}
          labelName={data.labelName}
          placeholder={data.placeholder}
          name={data.name}
          required={data.required}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}

export default FormSection;
