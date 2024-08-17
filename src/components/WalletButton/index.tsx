import { useIsConnectionRestored, useTonConnectModal, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import WalletGrayIcon from 'assets/icons/wallet-gray.png';
import DropdownIcon from 'assets/icons/arrow-down-gray.svg';

import { stripVal } from 'utils';

const WalletConnected = () => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const disconnect = () => tonConnectUI.disconnect();

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-[#282829] rounded-lg" onClick={disconnect}>
      <div className="flex">
        <img src={WalletGrayIcon} alt="gray" />
        <p className="ml-2">{stripVal(wallet?.account?.publicKey || '')}</p>
      </div>
      <div>
        <img src={DropdownIcon} alt="dropdown" />
      </div>
    </div>
  );
};

const ConnecWallet = () => {
  const { open } = useTonConnectModal();
  const isRestored = useIsConnectionRestored();
  const wallet = useTonWallet();

  const isConnected = !!wallet && isRestored;
  return isConnected ? (
    <WalletConnected />
  ) : (
    <button className="w-full h-[37px] rounded-lg bg-[#0E2454] flex items-center justify-center gap-2" onClick={open}>
      <p className="text-[#2B6DFD] text-[14px] font-medium">Connect Wallet</p>
    </button>
  );
};

type Props = {
  className?: string;
};

const WalletButton = ({ className }: Props) => {
  return (
    <div className={className}>
      <ConnecWallet />
    </div>
  );
};

export default WalletButton;
