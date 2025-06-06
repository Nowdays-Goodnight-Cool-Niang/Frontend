import SocialIcon from './SocialIcon';
import GtihubSvg from '@/assets/icons/ic_github.svg?react';
import LinkedInSvg from '@/assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '@/assets/icons/ic_instagram.svg?react';

interface SocialIconsProps {
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
}

function SocialIcons({ linkedinUrl, githubUrl, instagramUrl }: SocialIconsProps) {
  return (
    <ul className="flex gap-1">
      <SocialIcon link={linkedinUrl}>
        <LinkedInSvg className="w-full" />
      </SocialIcon>
      <SocialIcon link={githubUrl}>
        <GtihubSvg className="w-full" />
      </SocialIcon>
      <SocialIcon link={instagramUrl}>
        <InstagramSvg className="w-full" />
      </SocialIcon>
    </ul>
  );
}

export default SocialIcons;
