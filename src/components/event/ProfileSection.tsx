import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useShareCardDetailStore } from '@/stores/useShareCardDetailStore';
import { useQueryShareCard } from '@/hooks/useQueryShareCard';
import { useQueryAccount } from '@/hooks/useQueryAccount';
import BaseButton from '@/components/common/BaseButton';
import { useMutateShareCard } from '@/hooks/useMutateShareCard';
import ShareCard from '@/components/event/ShareCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Modal from '@/components/common/Modal';
import NoticeInfo from '@/components/common/NoticeInfo';
import { TOAST_MESSAGE } from '@/utils/labels';

function ProfileSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, isLoading: isProfileLoading, error: profileError } = useQueryAccount();
  const {
    participantInfo,
    isLoading: isParticipantInfoLoading,
    error: participantError,
  } = useQueryShareCard(profile?.id || '', {
    enabled: !!profile?.id,
  });

  const { mutate: saveShareCard } = useMutateShareCard();

  const { shareCardDetail, setShareCardDetail, isShareCardDetailBlank, editMode, setEditMode } =
    useShareCardDetailStore();

  useEffect(() => {
    // TODO: 초기값 null로 확실한지 확인하기
    if (participantInfo) {
      if (
        participantInfo.teamName !== '' &&
        participantInfo.teamName !== null &&
        participantInfo.position !== '' &&
        participantInfo.position !== null &&
        participantInfo.introductionText !== '' &&
        participantInfo.introductionText !== null
      ) {
        setShareCardDetail(participantInfo);
      } else {
        setIsModalOpen(true);
        setEditMode(true);
      }
    }
  }, [participantInfo, setEditMode, setShareCardDetail]);

  if (isProfileLoading || isParticipantInfoLoading) return <LoadingSpinner />;

  if (profileError || participantError || !participantInfo)
    return (
      <div className="tex-white">
        에러가 발생했습니다:
        {profileError?.message || participantError?.message}
      </div>
    );

  const handleSaveCardDetail = () => {
    if (shareCardDetail) {
      saveShareCard({
        teamName: shareCardDetail.teamName,
        position: shareCardDetail.position,
        introductionText: shareCardDetail.introductionText,
      });
      toast.success(TOAST_MESSAGE.PROFILE_SAVE_SUCCESS, { icon: '🎉' });
      setEditMode(false);
      setShareCardDetail(shareCardDetail);
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <span className="text-body-2 text-center text-gray-100">
          이번 행사에서 사용할 나만의 프로필을 완성해 보세요! 등록한 행사 프로필은 언제든지 수정
          가능해요.
        </span>
        <BaseButton onClick={() => setIsModalOpen(false)}>알겠습니다</BaseButton>
      </Modal>
      <div className="wrapper mt-11 flex flex-col items-center overflow-x-hidden">
        <NoticeInfo>프로필을 입력하면 자신의 QR 코드가 생성돼요</NoticeInfo>
        <div className="my-2"></div>
        <ShareCard profile={profile} isReveal={true} mode="edit" />
        <div className="my-6"></div>
        {editMode && (
          <BaseButton isDisabled={isShareCardDetailBlank()} onClick={handleSaveCardDetail}>
            프로필 완성하기
          </BaseButton>
        )}
      </div>
    </>
  );
}

export default ProfileSection;
