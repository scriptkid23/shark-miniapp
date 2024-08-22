import { useSharkStore } from '@/stores/shark_store';
import React, { HTMLAttributes } from 'react';

type Props = {};

const Button: React.FC<HTMLAttributes<HTMLDivElement>> = ({ onClick, children }) => {
  return (
    <div className="px-4 py-2 bg-[#1D49A9] rounded-xl flex-1 text-sm font-medium cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

const InviteGroup = (props: Props) => {
  const { user } = useSharkStore();
  const [copyStatus, setCopyStatus] = React.useState('Copy Invite Link');

  const handleCopyLink = () => {
    const path=import.meta.env.VITE_INVITE_LINK
    navigator.clipboard.writeText(path+"?startapp="+user?.codeInvite || '');
    setCopyStatus('Copied');
    setTimeout(() => {
      setCopyStatus('Copy Invite Link');
    }, 2000);
  };
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#090909] flex gap-4 justify-between py-2 text-center">
      <Button className="cursor-pointer" onClick={() => {}}>
        Invite
      </Button>
      <Button className="cursor-pointer" onClick={handleCopyLink}>
        {copyStatus}
      </Button>
    </div>
  );
};

export default InviteGroup;
