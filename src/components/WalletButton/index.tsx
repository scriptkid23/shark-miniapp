import { address, Address, beginCell, internal } from '@ton/ton';
import {
  CHAIN,
  SendTransactionRequest,
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import DropdownIcon from '@/assets/icons/arrow-down-gray.svg';
import WalletGrayIcon from '@/assets/icons/wallet-gray.png';
import { stripVal } from '@/utils';

const WalletConnected = () => {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const disconnect = () => tonConnectUI.disconnect();

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-[#282829] rounded-lg" onClick={disconnect}>
      <div className="flex">
        <img src={WalletGrayIcon} alt="gray" />
        <p className="ml-2">{stripVal(address || '')}</p>
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
      <p className="text-[#2B6DFD] text-[14px] font-medium">Connect Wallet </p>
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
  const [tonConnectUI] = useTonConnectUI();
  const rawAddress = useTonAddress(false);
  const disconnect = () => tonConnectUI.disconnect();

  const handleMakeTx = async () => {
    const store: TonCash = {
      $$type: 'TonCash',
      settleDuration: BigInt(10),
      sender: address('0QBFDKvzPUlxDhCIgUWZQVDxTBqtifKlRSYLQVpI1KDcshGJ'),
    };
    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: '0QBFDKvzPUlxDhCIgUWZQVDxTBqtifKlRSYLQVpI1KDcshGJ',
          amount: '10000000',
          payload: beginCell().store(storeTonCash(store)).endCell().toBoc().toString('base64'),
        },
      ],
    };

    tonConnectUI.sendTransaction(transaction);
  };
  return (
    <div className={className}>
      <ConnecWallet />
      <button onClick={disconnect}>disconnect</button>
      <button onClick={handleMakeTx}>make tx</button>
    </div>
  );
};

export default WalletButton;
