import DropdownIcon from '@/assets/icons/arrow-down-gray.svg';
import AddrowDownIcon from '@/assets/icons/arrow-down-active.png';
import WalletGrayIcon from '@/assets/icons/wallet-gray.png';
import WalletActiveIcon from '@/assets/icons/wallet-3.png';
import { useSharkStore } from '@/stores/shark_store';
import { stripVal } from '@/utils';
import { Address } from '@ton/ton';
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { useEffect } from 'react';
import { updateWalletUser } from '@/apis';

const WalletConnected = () => {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const disconnect = () => tonConnectUI.disconnect();
  const { user } = useSharkStore();

  const isCheckedTotalTx = user?.transaction?.total && user?.transaction?.total > -1;
  return (
    <div
      className={`flex items-center justify-between py-2 px-4 bg-[${
        isCheckedTotalTx ? '#0E2454' : '#282829'
      }] rounded-lg`}
      onClick={disconnect}
    >
      <div className="flex">
        <img src={isCheckedTotalTx ? WalletActiveIcon : WalletGrayIcon} alt="gray" />
        <p className={`ml-2 ${isCheckedTotalTx && 'text-[#2B6DFD]'}`}>{stripVal(address)}</p>
      </div>
      <div>
        <img src={isCheckedTotalTx ? AddrowDownIcon : DropdownIcon} alt="dropdown" />
      </div>
    </div>
  );
};

const ConnecWallet = () => {
  const { open } = useTonConnectModal();
  const isRestored = useIsConnectionRestored();
  const wallet = useTonWallet();

  if (!isRestored) {
    return (
      <div className="w-full h-[44px] rounded-lg bg-[#0E2454] flex items-center justify-center gap-2">
        <p className="text-[#2B6DFD] text-[14px] font-medium">Please wait...</p>
      </div>
    );
  }

  return !!wallet ? (
    <WalletConnected />
  ) : (
    <button className="w-full h-[44px] rounded-lg bg-[#0E2454] flex items-center justify-center gap-2" onClick={open}>
      <p className="text-[#2B6DFD] text-[14px] font-medium">{isRestored ? 'Connect Wallet' : 'Trying to reconnect'} </p>
    </button>
  );
};

type Props = {
  className?: string;
};



const WalletButton = ({ className }: Props) => {
  // const [tonConnectUI] = useTonConnectUI();
  // const disconnect = () => tonConnectUI.disconnect();

  return (
    <div className={className}>
      <ConnecWallet />
    </div>
  );
};

export default WalletButton;
