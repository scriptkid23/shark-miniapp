import { useSharkStore } from "@/stores/shark_store";
import React, { HTMLAttributes } from "react";
import { initUtils } from "@telegram-apps/sdk";
import { useCopy } from "@/hooks/useCopy";

type Props = {};

const Button: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  onClick,
  children,
}) => {
  return (
    <div
      className="px-4 py-2 bg-[#1D49A9] rounded-xl flex-1 text-sm font-medium cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const InviteGroup = (props: Props) => {
  const { user } = useSharkStore();
  const { copy, isCopied } = useCopy();
  const utils = initUtils();

  const handleInvite = () => {
    const path = import.meta.env.VITE_INVITE_LINK;

    utils.shareURL(
      path + "?startapp=" + user?.codeInvite,
      "Become a real SHARKS now. Join us!"
    );
  };
  const handleCopyLink = () => {
    const path = import.meta.env.VITE_INVITE_LINK;

    copy(path + "?startapp=" + user?.codeInvite || "");
  };
  return (
    <div className="fixed bottom-20 left-0 right-0 bg-[#090909] flex gap-4 justify-between py-2 text-center px-4">
      <Button className="cursor-pointer" onClick={handleInvite}>
        Invite
      </Button>
      <Button className="cursor-pointer capitalize" onClick={handleCopyLink}>
        {!isCopied ? "Copy invite link" : "Copied"}
      </Button>
    </div>
  );
};

export default InviteGroup;
