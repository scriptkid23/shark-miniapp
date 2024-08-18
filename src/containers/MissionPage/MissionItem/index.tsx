import HookIcon from '@/assets/icons/mission/hook.png';
import { useState } from 'react';
import TeleIcon from '@/assets/icons/mission/tele.png';
import TwitchIcon from '@/assets/icons/mission/twitter.png';
import FriendIcon from '@/assets/icons/mission/friend.png';

export enum MissionStatus {
  DONE = 'done',
  PENDING = 'pending',
  ACTIVE = 'active',
}

export const MissionIconType = {
  1: HookIcon,
  2: TeleIcon,
  3: TwitchIcon,
  4: FriendIcon,
};


type Mission = {
  id: number;
  description: string;
  value: number;
  iconId: keyof typeof MissionIconType;
  status: MissionStatus;
};

type Props = {
  mission: Mission;
};

const MissionItem = (props: Props) => {
  const { mission } = props;
  const [status, setStatus] = useState<MissionStatus>(mission.status);

  const statusText = {
    [MissionStatus.DONE]: 'Done',
    [MissionStatus.PENDING]: 'Pending',
    [MissionStatus.ACTIVE]: 'Active',
  };
  const isDisabled = status === MissionStatus.DONE || status === MissionStatus.PENDING;

  return (
    <div className="bg-[#282829] p-2 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="rounded-full w-[44px] h-[44px] flex items-center justify-center">
          <img className="object-cover" src={MissionIconType[mission.iconId]} alt="" />
        </div>
        <div className="flex-1 ml-[15px]">
          <p className="text-sm font-semibold mb-0.5">{mission.description}</p>
          <p className="text-xs font-normal">+{mission.value} BAITS</p>
        </div>
        <div>
          <button
            className="rounded-3xl px-[10px] py-[8px] text-xs font-medium bg-[#2B6DFD] disabled:bg-[#424242] disabled:text-[#282829] disabled:cursor-not-allowed "
            disabled={isDisabled}
          >
            {statusText[status]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionItem;
