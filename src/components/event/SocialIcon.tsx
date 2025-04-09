import { PropsWithChildren } from 'react';

interface SocialIconProps extends PropsWithChildren {
  link?: string;
}

function SocialIcon({ link, children }: SocialIconProps) {
  return (
    <a href={link} className={`${link && 'hover:cursor-pointer'}`}>
      <li className={`flex h-5 w-5 items-center justify-center ${!link && 'opacity-20'}`}>
        {children}
      </li>
    </a>
  );
}

export default SocialIcon;
