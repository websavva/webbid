import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';

export type UserAvatarProps = DefineProps<{
  email: string;
}>;

export const UserAvatar = ({ email, className, ...attrs }: UserAvatarProps) => {
  const avatarCharacter = email[0].toUpperCase();

  return (
    <div
      {...attrs}
      className={cn(
        'flex items-center justify-center rounded-full bg-blue-500 font-bold text-white',
        className,
      )}
    >
      {avatarCharacter}
    </div>
  );
};
