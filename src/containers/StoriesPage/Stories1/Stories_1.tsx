import fishIcon from 'assets/images/underwarter/fish.png';
import sharkIcon from 'assets/images/underwarter/shark.png';
import squidIcon from 'assets/images/underwarter/squid.png';
import whaleIcon from 'assets/images/underwarter/whale.png';
import { WithSeeMore } from 'react-insta-stories';
import { Renderer } from 'react-insta-stories/dist/interfaces';
import { QRCode } from 'react-qrcode-logo';
import CustomCollapsedComponent from '../CustomCollapsed';
const UnderwarterLevel = {
  1: {
    name: 'Fish',
    imagePath: fishIcon,
  },
  2: {
    name: 'Squid',
    imagePath: squidIcon,
  },
  3: {
    name: 'Shark',
    imagePath: sharkIcon,
  },
  4: {
    name: 'Whale',
    imagePath: whaleIcon,
  },
};


const Stories_1: Renderer = ({ story, action }) => {
  return (
    <WithSeeMore story={story} action={action} customCollapsed={CustomCollapsedComponent}>
      <div className="h-full w-full pt-10 px-[10px] text-center">
        <h1 className="text-5xl font-syneTactile">Ton Fish</h1>
        <p className="font-medium text-[#A7A7A8] text-lg">You’ve joined Ton network</p>
        <div className="w-[120px] h-[120px] m-auto">
          <img className="w-full h-full" src={UnderwarterLevel[1].imagePath} alt="animal" />
        </div>
        <h3 className="text-[64px] font-medium font-rubik inline-block text-transparent bg-clip-text bg-[linear-gradient(186deg,_#2B6DFD_20.1%,_#091633_86.53%)] leading-tight">
          10
        </h3>
        <p className="text-[18px]">Transactions</p>
        <div className="mt-[16px] bg-gradient-to-b from-[rgba(17,41,64,0.60)] via-[rgba(0,17,33,0.60)] to-[rgba(0,17,33,0.60)] m-auto w-fit border-[#10435C] border-[0.43px] rounded-[10px]">
          <QRCode
            ecLevel="Q"
            quietZone={8}
            size={112}
            qrStyle="fluid"
            value="https://www.google.com/"
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