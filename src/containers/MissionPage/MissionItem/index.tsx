import HookIcon from '@/assets/icons/mission/hook.png';
import { useState } from 'react';
import TeleIcon from '@/assets/icons/mission/tele.png';
import Twitter from '@/assets/icons/mission/twitter.png';
import FriendIcon from '@/assets/icons/mission/friend.png';
import { checkMission } from '@/apis';
import { address, Address, beginCell } from '@ton/core';
import { SendTransactionRequest, useTonConnectUI } from '@tonconnect/ui-react';
import { numberWithCommas } from '@/utils';

export enum MissionStatus {
  DONE = 'done',
  PENDING = 'pending',
  ACTIVE = 'active',
}

export const MissionIconType = {
  1: Twitter,
  2: HookIcon,
  3: TeleIcon,
  4: FriendIcon,
};

type Mission = {
  id: number;
  title: string;
  description: string;
  value: number;
  iconId: keyof typeof MissionIconType;
  status: MissionStatus;
};

type Props = {
  mission: Mission;
};
export type TonCash = {
  $$type: 'TonCash';
  settleDuration: bigint;
  sender: Address;
};

export function storeTonCash(src: TonCash) {
  return (builder: any) => {
    let b_0 = builder;
    b_0.storeUint(680076828, 32);
    b_0.storeUint(src.settleDuration, 64);
    b_0.storeAddress(src.sender);
  };
}
const MissionItem = (props: Props) => {
  const { mission } = props;
  const [status, setStatus] = useState<MissionStatus>(mission.status);
  const [tonConnectUI] = useTonConnectUI();
  const statusText = {
    [MissionStatus.DONE]: 'Done',
    [MissionStatus.PENDING]: 'Pending',
    [MissionStatus.ACTIVE]: 'Active',
  };

  const handleMakeTx = async (amount: string) => {
    try {
      const walletAddress = import.meta.env.VITE_ADDRESS;
      const store: TonCash = {
        $$type: 'TonCash',
        settleDuration: BigInt(10),
        sender: address(walletAddress),
      };
      const transaction: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: walletAddress,
            amount: amount,
            payload: beginCell().store(storeTonCash(store)).endCell().toBoc().toString('base64'),
          },
        ],
      };

      const tx = await tonConnectUI.sendTransaction(transaction);
      return tx.boc;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleInviteMission = async (mission: Mission) => {
    window.open(mission.description, '_blank');
  };

  const getMissionFunction = async (mission: Mission) => {
    const makeTxOnTonId = 4;
    const realSharkId = 5;
    const missionId = mission.id;
    const tonDecimals = 9;
    let amount = '';
    if (missionId === makeTxOnTonId) {
      amount = (0.1 * 10 ** tonDecimals).toString();
      return handleMakeTx(amount);
    }
    if (missionId === realSharkId) {
      amount = (1 * 10 ** tonDecimals).toString();
      return handleMakeTx(amount);
    }
    return handleInviteMission(mission);
  };

  const handleMission = async (mission: Mission) => {
    try {
      setStatus(MissionStatus.PENDING);
      let tx = '';
      const boc = await getMissionFunction(mission);
      if (boc) {
        tx = boc;
      }
      await checkMission(mission.id, tx);
      setStatus(MissionStatus.DONE);
    } catch (error) {
      setStatus(MissionStatus.ACTIVE);
    }
  };

  const isDisabled = status === MissionStatus.DONE || status === MissionStatus.PENDING;

  return (
    <div className="bg-[#282829] p-2 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="rounded-full w-[44px] h-[44px] flex items-center justify-center">
          <img className="object-cover" src={MissionIconType[mission.iconId]} alt="" />
        </div>
        <div className="flex-1 ml-[15px]">
          <p className="text-sm font-semibold mb-0.5">{mission.title}</p>
          <p className="text-xs font-normal">+{numberWithCommas(mission.value)} BAITS</p>
        </div>
        <div>
          <button
            className="rounded-3xl px-[10px] py-[8px] text-xs font-medium bg-[#2B6DFD] disabled:bg-[#424242] disabled:text-[#282829] disabled:cursor-not-allowed "
            disabled={isDisabled}
            onClick={() => handleMission(mission)}
          >
            {statusText[status]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionItem;
