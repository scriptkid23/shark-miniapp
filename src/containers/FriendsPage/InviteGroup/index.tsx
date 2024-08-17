import React, { HTMLAttributes } from 'react';

type Props = {};

const Button: React.FC<HTMLAttributes<HTMLDivElement>> = ({onClick, children}) => {
  return <div className="px-4 py-2 bg-[#1D49A9] rounded-xl flex-1 text-sm font-medium" onClick={onClick}>{children}</div>;
};



const InviteGroup = (props: Props) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#090909] flex gap-4 justify-between py-2 text-center">
      <Button onClick={() => {}}>Invite</Button>
      <Button onClick={() => {}}>Copy Invite Link</Button>
    </div>
  );
};

export default InviteGroup;
