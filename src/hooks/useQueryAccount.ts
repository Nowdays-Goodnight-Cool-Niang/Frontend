import { useQuery, useMutation } from '@tanstack/react-query';
import { accountAPI } from '@/apis/accounts';
import { IAccount } from '@/types/domain/account';

export const useQueryAccount = () => {
  const {
    data: rawProfile,
    isLoading,
    error,
  } = useQuery<IAccount>({
    queryKey: ['account'],
    queryFn: accountAPI.getProfile,
  });

  const profile = rawProfile
    ? {
        ...rawProfile,
        name: rawProfile.name ?? '',
        email: rawProfile.email ?? '',
        linkedinUrl: rawProfile.socialLinks?.linkedIn ?? '',
        githubUrl: rawProfile.socialLinks?.github ?? '',
        instagramUrl: rawProfile.socialLinks?.instagram ?? '',
      }
    : undefined;

  const mutation = useMutation({
    mutationFn: accountAPI.patchProfileInfo,
  });

  return {
    profile,
    isLoading,
    error,
    patchProfileInfo: mutation.mutate,
  };
};
