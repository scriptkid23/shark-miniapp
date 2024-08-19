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
      <div className="w-full h-[37px] rounded-lg bg-[#0E2454] flex items-center justify-center gap-2">
        <p className="text-[#2B6DFD] text-[14px] font-medium">Please wait...</p>
      </div>
    );
  }

  return !!wallet ? (
    <WalletConnected />
  ) : (
    <button className="w-full h-[37px] rounded-lg bg-[#0E2454] flex items-center justify-center gap-2" onClick={open}>
      <p className="text-[#2B6DFD] text-[14px] font-medium">{isRestored ? 'Connect Wallet' : 'Trying to reconnect'} </p>
    </button>
  );
};

type Props = {
  className?: string;
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

const WalletButton = ({ className }: Props) => {
  // const [tonConnectUI] = useTonConnectUI();
  // const disconnect = () => tonConnectUI.disconnect();

  // const handleMakeTx = async () => {
  //   const store: TonCash = {
  //     $$type: 'TonCash',
  //     settleDuration: BigInt(10),
  //     sender: address('0QBFDKvzPUlxDhCIgUWZQVDxTBqtifKlRSYLQVpI1KDcshGJ'),
  //   };
  //   const transaction: SendTransactionRequest = {
  //     validUntil: Math.floor(Date.now() / 1000) + 360,
  //     messages: [
  //       {
  //         address: '0QBFDKvzPUlxDhCIgUWZQVDxTBqtifKlRSYLQVpI1KDcshGJ',
  //         amount: '10000000',
  //         payload: beginCell().store(storeTonCash(store)).endCell().toBoc().toString('base64'),
  //       },
  //     ],
  //   };

  //   tonConnectUI.sendTransaction(transaction);
  // };
  return (
    <div className={className}>
      <ConnecWallet />
    </div>
  );
};

export default WalletButton;
