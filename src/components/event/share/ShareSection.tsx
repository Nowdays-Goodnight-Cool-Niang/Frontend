import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import NoticeInfo from '@/components/common/NoticeInfo';
import TabSelector from './TabSelector';
import CompactTabPanel from './CompactTabPanel';
import LockSvg from '@/assets/icons/ic_lock.svg?react';
import ErrorSvg from '@/assets/icons/ic_error.svg?react';
import BaseButton from '@/components/common/BaseButton';
import Input from '@/components/common/Input';
import { useMutateGetProfileByPin } from '@/hooks/useQueryGetProfileByPin';
import { EVENT_ID } from '@/constants/eventId';
import { useQueryRegisterParticipant } from '@/hooks/useQueryRegisterParticipant';
import WebcamCapture from './WebcamCapture';
import { BrowserQRCodeReader } from '@zxing/browser';
import SpotlightCard from '../card/SpotlightCard';
import { showCustomToast } from '@/utils/showToast';
import { useQueryEventProfile } from '@/hooks/useQueryEventProfile';
import { IFullEventProfile } from '@/types/domain/event';

export default function ShareSection() {
  const { data: eventProfile, isLoading, error } = useQueryEventProfile(EVENT_ID);

  const isProfileComplete = useMemo(() => {
    if (!eventProfile) return false;
    return Object.values(eventProfile.template.fields).every(
      (field) => field.value !== null && field.value.trim() !== ''
    );
  }, [eventProfile]);

  const myPinNumber = eventProfile?.pinNumber;
  const qrReader = new BrowserQRCodeReader();
  const [cameraPermissionState, setCameraPermissionState] = useState<
    'granted' | 'denied' | 'prompt' | null
  >(null);

  const [showSpotlightCard, setShowSpotlightCard] = useState(false);
  const [fetchedProfile, setFetchedProfile] = useState<IFullEventProfile | null>(null);
  const [activeTab, setActiveTab] = useState<string>('share');
  const [receiveMethod, setReceiveMethod] = useState<string>('qr');
  const [pinInput, setPinInput] = useState('');
  const [qrText, setQrText] = useState('');

  const { mutate: mutateGetProfile } = useMutateGetProfileByPin(EVENT_ID);
  const { mutate: mutateRegisterParticipant } = useQueryRegisterParticipant(EVENT_ID);

  useEffect(() => {
    navigator.permissions.query({ name: 'camera' as PermissionName }).then((result) => {
      setCameraPermissionState(result.state);
      result.onchange = () => setCameraPermissionState(result.state);
    });
  }, []);

  const handlePinSubmit = () => {
    if (pinInput.length === 4) {
      handleRegisterAndShowProfile(pinInput);
    }
  };

  const handleRegisterAndShowProfile = (pinNumber: string) => {
    mutateRegisterParticipant(pinNumber, {
      onSuccess: () => {
        showCustomToast({ message: '명함 교환에 성공했어요!' });
        mutateGetProfile(pinNumber, {
          onSuccess: (data) => {
            setFetchedProfile(data);
            setShowSpotlightCard(true);
          },
        });
        setPinInput('');
      },
      onError: (error: any) => {
        const code = error?.response?.data?.code;
        if (code === 'REGISTER_ALREADY' || code === 'REGISTER_MYSELF') {
          mutateGetProfile(pinNumber, {
            onSuccess: (data) => {
              setFetchedProfile(data);
              setShowSpotlightCard(true);
            },
          });
          setPinInput('');
          return;
        }

        if (code === 'PROFILE_NOT_FOUND') {
          showCustomToast({ message: '핀 번호에 해당하는 참여자가 없어요!' });
        } else {
          showCustomToast({ message: '명함 교환에 실패했어요. 다시 시도해주세요.' });
        }
      },
    });
  };

  const handleImage = async (imageSrc: string) => {
    try {
      const result = await qrReader.decodeFromImageUrl(imageSrc);
      const pinNumber = result?.getText();
      if (pinNumber && pinNumber !== qrText) {
        setQrText(pinNumber);
        handleRegisterAndShowProfile(pinNumber);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <div className="wrapper py-10 text-center tracking-tight text-gray-500">로딩 중...</div>;
  }

  if (error || !eventProfile) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-gray-50 p-10">
        <ErrorSvg width={60} height={60} className="mb-7 mt-4" />
        <div className="flex flex-col gap-2 text-center">
          <p className="text-lg font-medium leading-7 tracking-tight text-gray-600">
            앗! 명함을 완성하기 전까지
            <br />
            사용하실 수 없어요!
          </p>
          <p className="leading-6 tracking-tight text-gray-400">
            명함을 먼저 완성해 주시면
            <br />
            다른 사람과 명함을 주고받을 수 있어요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {showSpotlightCard && fetchedProfile && (
        <SpotlightCard
          profile={fetchedProfile}
          eventName="CODE:ME"
          onClose={() => setShowSpotlightCard(false)}
          showLinkIcons
        />
      )}

      <div className="wrapper">
        <div className="my-2 flex h-12 items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">명함 공유</h3>
        </div>

        {!isProfileComplete ? (
          <div className="flex flex-col items-center rounded-3xl bg-gray-50 p-10">
            <LockSvg width={60} height={60} className="mb-7 mt-4" />
            <div className="flex flex-col gap-2 text-center">
              <p className="text-lg font-medium leading-7 tracking-tight text-gray-600">
                앗! 명함을 완성하기 전까지
                <br />
                사용하실 수 없어요!
              </p>
              <p className="leading-6 tracking-tight text-gray-400">
                명함을 먼저 완성해 주시면
                <br />
                다른 사람과 명함을 주고받을 수 있어요
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <TabSelector
                tabConfigs={[
                  { label: '내 명함 공유', value: 'share' },
                  { label: '명함 받기', value: 'receive' },
                ]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {activeTab === 'share' && (
              <div className="mt-6 flex w-full flex-col items-center gap-4">
                <div className="mx-auto flex aspect-square max-h-56 w-full max-w-56 items-center justify-center rounded-2xl bg-white p-4">
                  <QRCodeSVG value={myPinNumber?.toString()} className="h-52 w-full" />
                </div>
                <div className="flex justify-center gap-3">
                  {myPinNumber
                    ?.toString()
                    .split('')
                    .map((digit, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center rounded-xl bg-gray-50 px-5 py-5"
                      >
                        <span className="text-4xl font-bold text-gray-900">{digit}</span>
                      </div>
                    ))}
                </div>
                <NoticeInfo>상대방에게 QR이나 PIN 번호를 보여주세요</NoticeInfo>
              </div>
            )}

            {activeTab === 'receive' && (
              <CompactTabPanel
                title="명함 받기"
                activeTab={receiveMethod}
                setActiveTab={setReceiveMethod}
                tabConfigs={[
                  {
                    label: 'QR 코드',
                    value: 'qr',
                    content: (
                      <div className="my-6 flex flex-col items-center gap-4">
                        <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-gray-50">
                          <WebcamCapture onCapture={handleImage} />
                        </div>
                        {cameraPermissionState === 'denied' && (
                          <NoticeInfo type="error">
                            카메라 접근 권한이 차단되어 있어 QR 코드를 인식할 수 없어요. 브라우저
                            설정에서 카메라 권한을 허용해주세요.
                          </NoticeInfo>
                        )}
                      </div>
                    ),
                  },
                  {
                    label: 'PIN 번호',
                    value: 'pin',
                    content: (
                      <div className="flex flex-col gap-3 pt-4">
                        <Input
                          placeholder="핀번호 입력"
                          maxLength={4}
                          value={pinInput}
                          onChange={(e) =>
                            setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))
                          }
                        />
                        <BaseButton isDisabled={pinInput.length !== 4} onClick={handlePinSubmit}>
                          {pinInput.length === 4
                            ? '명함 가져오기'
                            : `${4 - pinInput.length}자리 더 입력하세요`}
                        </BaseButton>
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
