import { useSharkStore } from '@/stores/shark_store';
import { getLevel, numberWithCommas } from '@/utils';
import { useTonWallet } from '@tonconnect/ui-react';
import { WithSeeMore } from 'react-insta-stories';
import { Renderer } from 'react-insta-stories/dist/interfaces';
import { QRCode } from 'react-qrcode-logo';
import Fish from '@/assets/images/underwarter/fish.gif';
import Whale from '@/assets/images/underwarter/whale.gif';
import Squid from '@/assets/images/underwarter/squid.gif';

export const UnderwarterLevel: Record<number, { name: string; imagePath: string }> = {
  1: {
    name: 'Fish',
    imagePath: Fish,
  },
  2: {
    name: 'Squid',
    imagePath: Squid,
  },
  3: {
    name: 'Shark',
    imagePath:
      'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Shark.png',
  },
  4: {
    name: 'Whale',
    imagePath: Whale,
  },
};



const invite_link = import.meta.env.VITE_INVITE_LINK;
const Stories_1: Renderer = ({ story, action }) => {
  const { user } = useSharkStore();
  const tonWallet = useTonWallet();
  const rawWallet = tonWallet?.account?.address;
  const objUserWalletParsed = JSON.parse(user?.wallet || '{}');
  const transaction = objUserWalletParsed[rawWallet || ''];

  const inviteLink = `${invite_link}?startapp=${user?.codeInvite}`;

  const level = getLevel(transaction?.totalTransaction || 0);

  const UnderwarterLevelData = UnderwarterLevel[level];

  return (
    <WithSeeMore story={story} action={action} customCollapsed={() => <></>}>
      <div className=" w-full pt-10 px-[10px] text-center h-screen">
        <h1 className="text-5xl font-syneTactile">Ton {UnderwarterLevelData.name}</h1>
        <p className="font-medium text-[#A7A7A8] text-lg">You've joined Ton network</p>
        <div className="w-[120px] h-[120px] m-auto">
          <img className="w-full h-full" src={UnderwarterLevelData.imagePath} alt="animal" />
        </div>
        <h3 className="text-[64px] font-medium font-rubik inline-block text-transparent bg-clip-text bg-[linear-gradient(186deg,_#2B6DFD_20.1%,_#091633_86.53%)] leading-tight">
          {numberWithCommas(transaction?.totalTransaction || 0)}
        </h3>
        <p className="text-[18px]">Transactions</p>
        <div className="mt-[16px] bg-gradient-to-b from-[rgba(17,41,64,0.60)] via-[rgba(0,17,33,0.60)] to-[rgba(0,17,33,0.60)] m-auto w-fit border-[#10435C] border-[0.43px] rounded-[10px]">
          <QRCode
            ecLevel="L"
            quietZone={8}
            size={112}
            value={inviteLink}
            bgColor="transparent"
            fgColor="white"
            eyeRadius={8}
          />
        </div>
        <p className="mt-[16px] font-chakrapetch font-bold text-xs opacity-40">
          Wanna play with your friends?
          <br /> Give the QR code to them
        </p>
      </div>
    </WithSeeMore>
  );
};

export default Stories_1;
