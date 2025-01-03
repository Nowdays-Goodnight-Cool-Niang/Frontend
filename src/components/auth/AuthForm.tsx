import { ReactNode } from 'react';

interface AuthFormProps {
  children: ReactNode,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function AuthForm({ children, onSubmit }: AuthFormProps) {
  return <form onSubmit={onSubmit} className="flex flex-col gap-4">{children}</form>;
}

export default AuthForm;
