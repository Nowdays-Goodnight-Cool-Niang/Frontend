import { useShareCardDetailStore } from '@/stores/useShareCardDetailStore';
import EditButton from './EditButton';
import { QRBox } from './QRBox';
import ShareCardInput from './ShareCardInput';
import ShareCardLabel from './ShareCardLabel';
import SocialIcons from './SocialIcons';
import { IProfile, IShareCardDetailsByEvent } from '@/types';
import { useState } from 'react';

export type ShareCardMode = 'edit' | 'view';

interface ShareCardProps {
  profile?: IProfile;
  detail?: IShareCardDetailsByEvent;
  mode?: ShareCardMode;
  isReveal?: boolean;
  isTop?: boolean;
}

export default function ShareCard({
  profile,
  detail,
  mode = 'view',
  isReveal = false,
  isTop = false,
}: ShareCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCard = () => {
    if (!isReveal) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="group perspective-1000">
      <div
        onClick={handleToggleCard}
        className={`${!isOpen && '-translate-y-32'} ${isTop && !isOpen && 'group-hover:-rotate-y-12 group-hover:rotate-x-12'} relative w-[340px] transition-transform duration-700 transform-style-3d`}
      >
        <CardTop profile={profile} isReveal={isReveal} isOpen={isOpen} mode={mode} />
        <CardDivider />
        <CardBottom detail={detail} mode={mode} />
      </div>
    </div>
  );
}

function CardTop({
  isReveal,
  isOpen,
  profile,
  mode,
  isTop,
}: {
  isReveal?: boolean;
  isOpen?: boolean;
  mode?: ShareCardMode;
  profile?: IProfile;
  isTop?: boolean;
}) {
  return (
    <div
      className={`transform-style-3d translate-z-[1px] ${!isOpen && '-rotate-x-180'} ${!isOpen && !isReveal && isTop && 'group-hover:-rotate-x-90'} relative h-56 w-full origin-bottom transition-transform duration-700`}
    >
      <CardTopInSide profile={profile} mode={mode} />
      <CardTopOutSide profile={profile} isReveal={isReveal} />
    </div>
  );
}

interface CardTopInsideProps {
  profile?: IProfile;
  mode?: ShareCardMode;
}
function CardTopInSide({ profile, mode }: CardTopInsideProps) {
  const isEditable = mode === 'edit';
  const { isShareCardDetailBlank } = useShareCardDetailStore();

  return (
    <div
      className={`absolute inset-0 h-full w-full overflow-hidden rounded-b-2xl bg-gray-900 p-6 backface-hidden`}
    >
      <img
        src="src/assets/images/img_share_card_graphic.png"
        className="pointer-events-none absolute inset-0 w-full select-none opacity-10 mix-blend-screen -translate-y-10 transform"
      />
      {isEditable && (
        <div className="absolute right-6 top-6">
          <QRBox
            url={`${import.meta.env.VITE_API_BASE_URL}/share-cards/${profile?.id}`}
            isAvailable={!isShareCardDetailBlank()}
          />
        </div>
      )}

      <div className="flex h-full flex-col justify-between">
        <SocialIcons
          linkedinUrl={profile?.linkedinUrl}
          githubUrl={profile?.githubUrl}
          instagramUrl={profile?.instagramUrl}
        />
        <div>
          <h1 className="mb-3 text-3xl font-bold text-gray-50">{profile?.name}</h1>
          <p className="text-body-3 mb-2 text-gray-400">{profile?.email}</p>
          <p className="text-body-3 text-gray-400">삐약톤 캠퍼스 대항전</p>
        </div>
      </div>
    </div>
  );
}

interface CardTopOutSideeProps {
  profile?: IProfile;
  isReveal?: boolean;
}
function CardTopOutSide({ profile, isReveal }: CardTopOutSideeProps) {
  return (
    <div
      className={`${!isReveal && 'grayscale'} absolute flex h-full w-full flex-col justify-end overflow-hidden rounded-t-2xl bg-orange-700 p-6 rotate-y-180 rotate-z-180 backface-hidden`}
    >
      <img
        src="src/assets/images/img_share_card_graphic.png"
        className="pointer-events-none absolute inset-0 w-full select-none mix-blend-multiply -translate-y-10 transform"
      />
      <div className="z-10">
        <h1 className="mb-3 text-3xl font-bold text-gray-50">{profile?.name}</h1>
        <p className="text-body-3 text-gray-100">삐약톤 캠퍼스 대항전</p>
      </div>
    </div>
  );
}

function CardBottom({ detail, mode }: { detail?: IShareCardDetailsByEvent; mode: ShareCardMode }) {
  return (
    <div className="relative h-56 w-full transform-style-3d">
      <CardBottomInSide detail={detail} mode={mode} />
      <CardBottomOutSide />
    </div>
  );
}
function CardBottomInSide({
  detail,
  mode,
}: {
  detail?: IShareCardDetailsByEvent;
  mode: ShareCardMode;
}) {
  const { shareCardDetail, editMode, setEditMode, setShareCardDetailByKey } =
    useShareCardDetailStore();

  const isEditable = mode === 'edit';

  return (
    <div className="absolute inset-0 flex h-56 w-full flex-col justify-between gap-2 rounded-t-2xl bg-gray-900 p-6 backface-hidden">
      <div className="scroll-hide h-full w-full overflow-y-scroll">
        <ShareCardLabel>
          이번 해커톤에서
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.teamName || ''}
              onChange={(val) => setShareCardDetailByKey('teamName', val)}
              placeholder="팀이름"
            />
          ) : (
            <span className="mx-1 text-sm font-semibold leading-8 text-gray-200">
              {detail?.teamName}
            </span>
          )}
          팀에서
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.position || ''}
              onChange={(val) => setShareCardDetailByKey('position', val)}
              placeholder="직군"
            />
          ) : (
            <span className="mx-1 text-sm font-semibold leading-8 text-gray-200">
              {detail?.position}
            </span>
          )}
          역할을 맡아
          {isEditable ? (
            <ShareCardInput
              value={shareCardDetail?.introductionText || ''}
              onChange={(val) => setShareCardDetailByKey('introductionText', val)}
              placeholder="프로젝트 한 줄 소개"
            />
          ) : (
            <span className="mx-1 text-sm font-semibold leading-8 text-gray-200">
              {detail?.introductionText}
            </span>
          )}
          를 만들었어요.
        </ShareCardLabel>
      </div>
      {isEditable && !editMode && (
        <div className="flex justify-end">
          <EditButton onClick={() => setEditMode(true)} />
        </div>
      )}
    </div>
  );
}
function CardBottomOutSide() {
  return (
    <div className="absolute flex h-full w-full rounded-t-2xl bg-orange-700 p-6 -rotate-z-180 rotate-y-180 backface-hidden"></div>
  );
}

function CardDivider() {
  return <hr className="mx-4 border-dashed border-gray-600" />;
}
