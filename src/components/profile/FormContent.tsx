import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import BaseButton from '../common/BaseButton';
import FormSection from './FormSection';
import { IProfile } from '../../types';
import { useQueryAccount } from '../../hooks/useQueryAccount';
import { validateInput } from '../../utils/form';
import { TOAST_MESSAGE } from '../../utils/labels';

interface IContentProps {
  variant: 'setup' | 'edit';
}

function Content({ variant }: IContentProps) {
  const navigate = useNavigate();
  const { profile, isLoading, patchProfileInfo } = useQueryAccount();

  const [formAccount, setFormAccount] = useState<IProfile>(profile || {});
  const [validationMessages, setValidationMessages] = useState<{ [key: string]: string }>({});
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (variant === 'edit' && profile) {
      const isChanged = Object.keys(profile).some(
        (key) => formAccount[key as keyof IProfile] !== profile[key as keyof IProfile]
      );
      setIsModified(isChanged);
    }
  }, [formAccount]);

  useEffect(() => {
    if (!isLoading && profile) {
      setFormAccount((prevFormAccount) => {
        if (JSON.stringify(prevFormAccount) !== JSON.stringify(profile)) {
          return { ...profile };
        }
        return prevFormAccount;
      });
    } else if (isLoading) {
      const loadingToastId = toast.loading(TOAST_MESSAGE.PROFILE_LOADING);
      return () => toast.dismiss(loadingToastId);
    }
  }, [isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormAccount((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validationMessage = validateInput(name, value);
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: validationMessage || '',
    }));
  };

  const handleProfileSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationMessages = Object.keys(formAccount).reduce(
      (acc, key) => {
        const validationMessage = validateInput(key, formAccount[key as keyof IProfile] || '');
        if (validationMessage) acc[key] = validationMessage;
        return acc;
      },
      {} as { [key: string]: string }
    );

    if (Object.keys(validationMessages).length > 0) {
      setValidationMessages(validationMessages);
      return;
    }

    patchProfileInfo(formAccount, {
      onSuccess: () => {
        if (variant === 'setup') {
          navigate('/event');
        } else {
          navigate('/setting');
          toast.success(TOAST_MESSAGE.PROFILE_SAVE_SUCCESS, { icon: '🎉' });
        }
      },
      onError: (error) => {
        toast.error(TOAST_MESSAGE.PROFILE_SAVE_FAILURE);
        console.error('Profile Edit error:', error);
      },
    });
  };

  const isFormValid =
    Object.values(validationMessages).every((validationMessage) => !validationMessage) &&
    !!formAccount.name &&
    !!formAccount.email;

  return (
    <form>
      <FormSection
        type="default"
        handleChange={handleChange}
        handleBlur={handleBlur}
        validationMessages={validationMessages}
        formAccount={formAccount}
      />
      <FormSection
        type="sns"
        handleChange={handleChange}
        handleBlur={handleBlur}
        validationMessages={validationMessages}
        formAccount={formAccount}
      />

      <div className="fixed bottom-11 left-6 right-6 max-w-full">
        <BaseButton
          isDisabled={!isFormValid || (variant === 'edit' && !isModified)}
          onClick={(e) => handleProfileSubmit(e)}
        >
          {`프로필을 ${variant === 'setup' ? '완성했어요' : '수정할래요'}`}
        </BaseButton>
      </div>
    </form>
  );
}

export default Content;
