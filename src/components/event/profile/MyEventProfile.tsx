import EventProfileCard from '../card/EventProfileCard';
import { useEffect, useRef, useState } from 'react';
import { EVENT_ID } from '@/constants/eventId';
import { useSuspenseQueryEventProfile } from '@/hooks/useQueryEventProfile';
import { useMutateMyEventProfile } from '@/hooks/useMutateMyEventProfile';
import { useEventProfileStore } from '@/stores/useEventProfileStore';
import { ProfileContent } from '@/types/api/event';
import { EventProfileStateType } from '@/types/domain/event';
import { EventProfileState } from '@/constants/event';
import { showCustomToast } from '@/utils/showToast';

interface MyEventProfileProps {
  onFlipChange: (flipped: boolean) => void;
  onEditStateChange?: (isEditing: boolean) => void;
}

export default function MyEventProfile({ onFlipChange, onEditStateChange }: MyEventProfileProps) {
  const [eventProfileState, setEventProfileState] = useState<EventProfileStateType>(
    EventProfileState.READONLY
  );
  const [loading, setLoading] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const initialFieldValues = useRef<Record<string, string>>({});

  const { data: eventProfile, error: eventProfileError } = useSuspenseQueryEventProfile(EVENT_ID);
  const { mutate } = useMutateMyEventProfile();
  const setProfileComplete = useEventProfileStore((state) => state.setProfileComplete);
  const setMyPinNumber = useEventProfileStore((state) => state.setMyPinNumber);

  useEffect(() => {
    if (onEditStateChange) {
      onEditStateChange(eventProfileState === EventProfileState.EDIT);
    }
  }, [eventProfileState]);

  // 데이터를 받아온 후 프로필 정보 입력 상태를 전역 상태로 저장
  useEffect(() => {
    if (!eventProfile) return;
    const isComplete = Object.values(eventProfile.template.fields).every(
      (field) => field.value !== null && field.value.trim() !== ''
    );
    setProfileComplete(isComplete);

    if (eventProfile.pinNumber) setMyPinNumber(eventProfile.pinNumber);
  }, [eventProfile]);

  const updateFieldValue = (key: string, newValue: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleEdit = () => {
    initialFieldValues.current = fieldValues;
    setEventProfileState(EventProfileState.EDIT);
  };

  useEffect(() => {
    if (
      !(eventProfileState === EventProfileState.EDIT) &&
      eventProfile?.template?.fields &&
      !loading
    ) {
      if (Object.keys(fieldValues).length === 0) {
        const newFieldValues = Object.fromEntries(
          Object.entries(eventProfile.template.fields).map(([key, { value }]) => [key, value])
        );
        setFieldValues(newFieldValues);
        initialFieldValues.current = newFieldValues;
      }
    }
  }, [eventProfile, eventProfileState, loading]);

  const handleSave = () => {
    const prevFieldValues = { ...fieldValues };

    const payload: ProfileContent = {
      introduce: fieldValues.introduce ?? '',
      proudestExperience: fieldValues.proudestExperience ?? '',
      toughExperience: fieldValues.toughExperience ?? '',
    };

    setLoading(true);

    mutate(payload, {
      onSuccess: () => {
        showCustomToast({ message: '저장했어요!' });
        setEventProfileState(EventProfileState.READONLY);
        initialFieldValues.current = fieldValues;
        setLoading(false);
      },
      onError: () => {
        setFieldValues(prevFieldValues);
        showCustomToast({ message: '저장에 실패했어요! 잠시 후 다시 시도해 주세요.' });
        setLoading(false);
      },
    });
  };

  const handleCancel = () => {
    setFieldValues(initialFieldValues.current);
    setEventProfileState(EventProfileState.READONLY);
    showCustomToast({ message: '변경사항이 취소되었어요' });
  };

  if (eventProfileError || !eventProfile) return <div>에러 발생</div>;

  return (
    <EventProfileCard
      state={eventProfileState}
      profile={eventProfile}
      eventName="CODE:ME"
      fieldValues={fieldValues}
      onFieldChange={updateFieldValue}
      onActionButtonClick={eventProfileState === EventProfileState.EDIT ? handleSave : handleEdit}
      onCancelButtonClick={eventProfileState === EventProfileState.EDIT ? handleCancel : undefined}
      onFlipChange={onFlipChange}
      showButtons
      isActionButtonLoading={loading}
    />
  );
}
