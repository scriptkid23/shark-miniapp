import HookIcon from "@/assets/icons/mission/hook.png";
import { useState } from "react";
import TeleIcon from "@/assets/icons/mission/tele.png";
import Twitter from "@/assets/icons/mission/twitter.png";
import FriendIcon from "@/assets/icons/mission/friend.png";
import DogxIcon from "@/assets/icons/mission/dogx.png";
import AylabIcon from "@/assets/icons/mission/aylab.png";
import TappyTapIcon from "@/assets/icons/mission/tappytap.png";
import WcoinIcon from "@/assets/icons/mission/wcoin.png";
import SecretPadIcon from "@/assets/icons/mission/secretpad.png";
import PirateFrenzyIcon from "@/assets/icons/mission/pfrenzy.png";
import PotusClickIcon from "@/assets/icons/mission/potus-click.png";
import TapAdventureIcon from "@/assets/icons/mission/tap-adventure.png";
import TonCookIcon from "@/assets/icons/mission/ton-cook.png";
import BeeVerseIcon from "@/assets/icons/mission/bee-verse.png";
import ScrooGIcon from "@/assets/icons/mission/scroo-g.png";
import ClockieChaosIcon from "@/assets/icons/mission/clockie-chaos.png";
import PoolAMIcon from "@/assets/icons/mission/poolam.png";
import PanieeIcon from "@/assets/icons/mission/paniee.png";
import { checkMission } from "@/apis";
import { address, Address, beginCell } from "@ton/core";
import {
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { numberWithCommas, sleep } from "@/utils";
import useConnectWalletNotificationStore from "@/stores/useConnectWalletNotificationStore";
import { useNavigate } from "react-router-dom";
import { useSharkStore } from "@/stores/shark_store";
import { initUtils } from "@telegram-apps/sdk";

const utils = initUtils();
export enum MissionStatus {
  DONE = "done",
  PENDING = "pending",
  ACTIVE = "active",
}

export const MissionIconType = {
  1: Twitter,
  2: HookIcon,
  3: TeleIcon,
  4: FriendIcon,
  5: DogxIcon,
  6: AylabIcon,
  7: TappyTapIcon,
  8: WcoinIcon,
  9: SecretPadIcon,
  10: PirateFrenzyIcon,
  11: PotusClickIcon,
  12: TapAdventureIcon,
  13: TonCookIcon,
  14: BeeVerseIcon,
  15: ScrooGIcon,
  16: ClockieChaosIcon,
  17: PoolAMIcon,
  18: PanieeIcon,
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
  $$type: "TonCash";
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
const makeTxOnTonId = 4;
const realSharkId = 5;
const inviteTask = 3;

const isTaskOnTon = (missionId: number) => {
  return missionId === makeTxOnTonId || missionId === realSharkId;
};

const MissionItem = (props: Props) => {
  const { openModal } = useConnectWalletNotificationStore();
  const { mission } = props;
  const [status, setStatus] = useState<MissionStatus>(mission.status);
  const [tonConnectUI] = useTonConnectUI();
  const tonAddress = useTonAddress();
  const navigate = useNavigate();
  const { setPoint } = useSharkStore();

  const statusText = () => {
    if (isTaskOnTon(mission.id)) {
      return {
        [MissionStatus.DONE]: "Guaranteed",
        [MissionStatus.PENDING]: "Pending",
        [MissionStatus.ACTIVE]: "Active",
      };
    }
    return {
      [MissionStatus.DONE]: "Done",
      [MissionStatus.PENDING]: "Pending",
      [MissionStatus.ACTIVE]: "Active",
    };
  };

  const handleMakeTx = async (amount: string) => {
    try {
      const { promise } = sleep(15000);
      const walletAddress = import.meta.env.VITE_ADDRESS;
      const store: TonCash = {
        $$type: "TonCash",
        settleDuration: BigInt(10),
        sender: address(walletAddress),
      };
      const transaction: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: walletAddress,
            amount: amount,
            payload: beginCell()
              .store(storeTonCash(store))
              .endCell()
              .toBoc()
              .toString("base64"),
          },
        ],
      };

      const tx = await tonConnectUI.sendTransaction(transaction);
      await promise;
      return tx.boc;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleInviteMission = async (mission: Mission) => {
    const { promise } = sleep(5000);

    // Regex to check if the description starts with 'https://t.me'
    const telegramLinkPattern = /^https:\/\/t\.me/;

    if (telegramLinkPattern.test(mission.description)) {
      utils.openTelegramLink(mission.description);
    } else {
      utils.openLink(mission.description);
    }

    await promise;
  };

  const getMissionFunction = async (mission: Mission) => {
    const missionId = mission.id;
    const tonDecimals = 9;
    let amount = "";

    const isTaskOnTon =
      missionId === makeTxOnTonId || missionId === realSharkId;

    if (isTaskOnTon && !tonAddress) {
      openModal();
      throw new Error("Please connect wallet");
    }

    if (missionId === inviteTask) {
      navigate("/friends");
      throw new Error("Please invite friends");
    }

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
      let tx = "";
      const boc = await getMissionFunction(mission);
      if (boc) {
        tx = boc;
      }
      const { data } = await checkMission(mission.id, tx, tonAddress);
      setPoint(data?.data?.point);
      setStatus(MissionStatus.DONE);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.error;
      console.log(error?.response?.data?.error);
      if (errorMsg === "CLAIM PENDING" || errorMsg === "PENDING") {
        setStatus(MissionStatus.PENDING);
      } else {
        setStatus(MissionStatus.ACTIVE);
      }
    }
  };

  const isDisabled =
    status === MissionStatus.DONE || status === MissionStatus.PENDING;

  return (
    <div className="bg-[#282829] p-2 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="rounded-full w-[44px] h-[44px] flex items-center justify-center">
          <img
            className="object-cover"
            src={MissionIconType[mission.iconId]}
            alt=""
          />
        </div>
        <div className="flex-1 ml-[15px]">
          <p className="text-sm font-semibold mb-0.5">{mission.title}</p>
          <p className="text-xs font-normal">
            +{numberWithCommas(mission.value)} BAITS
          </p>
        </div>
        <div>
          <button
            className="rounded-3xl px-[10px] py-[8px] text-xs font-medium bg-[#2B6DFD] disabled:bg-[#424242] disabled:text-[#282829] disabled:cursor-not-allowed "
            disabled={isDisabled}
            onClick={() => handleMission(mission)}
          >
            {statusText()[status]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionItem;
