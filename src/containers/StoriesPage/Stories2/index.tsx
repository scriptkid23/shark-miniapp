import HookIcon from '@/assets/images/underwarter/hook.png';
import { numberWithCommas } from '@/utils';
import { WithSeeMore } from 'react-insta-stories';
import { Renderer } from 'react-insta-stories/dist/interfaces';
import CustomCollapsedComponent from '../CustomCollapsed';
import { useSharkStore } from '@/stores/shark_store';
import { useTonWallet } from '@tonconnect/ui-react';

const Stories_2: Renderer = ({ story, action }) => {
  const { user } = useSharkStore();
  const tonWallet = useTonWallet();
  const rawWallet = tonWallet?.account?.address;
  const objUserWalletParsed = JSON.parse(user?.wallet || '{}');
  const transaction = objUserWalletParsed[rawWallet || ''];
  return (
    <WithSeeMore story={story} action={action} customCollapsed={CustomCollapsedComponent}>
      <div className="h-full w-full pt-10 px-[10px] text-center">
        <h1 className="text-[44px] font-syneTactile">You are amazing!</h1>
        <p className="font-medium text-[#A7A7A8] text-lg">Here is your BAIT rewards</p>
        <div className="w-[125px] h-[193px] m-auto mt-[48px]">
          <img className="w-full h-full" src={HookIcon} alt="animal" />
        </div>
        <h3 className="font-rubik text-5xl mt-[64px]">{numberWithCommas(transaction.point || 0)}</h3>
        <p className="font-medium text-[#A7A7A8] text-lg">Thanks for your time on Ton network 🤝</p>
      </div>
    </WithSeeMore>
  );
};

export default Stories_2;
