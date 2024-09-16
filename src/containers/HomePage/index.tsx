import SharkIcon from "@/assets/icons/shark-icons.svg";
import HomeBannerImg from "@/assets/images/home-banner.png";
import WalletButton from "@/components/WalletButton";
import { useSharkStore } from "@/stores/shark_store";
import { numberWithCommas } from "@/utils";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import RewardContainer from "./RewardContainer";
import GameContainer from "./GameContainer";
import { codeUrl, dataUrl, frameworkUrl, loaderUrl } from "@/config";
import { useEffect } from "react";

export const Wallet = () => {
  const wallet = useTonWallet();
  return (
    wallet && (
      <div>
        <div className="bg-blue-900 text-blue-400 flex items-center justify-between px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-blue-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <span className="font-semibold">0x12345...78911</span>
          </div>
          <svg
            className="w-4 h-4 text-blue-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>{" "}
      </div>
    )
  );
};

const CheckingTotalTxButton = () => {
  const navigate = useNavigate();
  const wallet = useTonWallet();
  const handleTx = async () => {
    try {
      navigate("/loading-transaction");
      // await checkingTotalTransaction();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      disabled={!wallet}
      onClick={handleTx}
      className="w-full py-3 px-4 bg-[linear-gradient(204deg,_#2B6DFD_13.83%,_#091633_109.1%)] rounded-lg mt-4 disabled:bg-none disabled:bg-[#282829] disabled:text-[#666666] disabled:cursor-not-allowed"
    >
      <span className="text-sm">Reward for TON OG</span>
    </button>
  );
};

const HeadBanner = () => {
  const { user } = useSharkStore();

  const tonWallet = useTonWallet();
  const rawWallet = tonWallet?.account?.address;

  const navigate = useNavigate();
  const objUserWalletParsed = JSON.parse(user?.wallet || "{}");
  const handleNavigate = (path: string) => navigate(path);

  const isCheckedTx = !!rawWallet && !!objUserWalletParsed[rawWallet];
  return (
    <div className="relative w-full m-auto">
      <div className=" w-full p-4 bg-[#111] rounded-lg m-auto">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[32px] font-medium font-rubik leading-none">
              {numberWithCommas(user?.point || 0)}
            </span>
            <span className="block text-[18px] font-normal text-[#424242]">
              $BAITS
            </span>
          </div>
          <div
            className={`items-start self-start cursor-pointer ${
              isCheckedTx ? "opacity-100" : "opacity-20"
            }`}
            onClick={() => handleNavigate("/stories")}
          >
            <img src={SharkIcon} alt="banner"></img>
          </div>
        </div>
        <WalletButton className="mt-6" />
        {!isCheckedTx && <CheckingTotalTxButton />}
      </div>
    </div>
  );
};

const HomePage = () => {
  const loadResourcesInBackground = async () => {
    try {
      await Promise.all([
        fetch(loaderUrl),
        fetch(dataUrl),
        fetch(frameworkUrl),
        fetch(codeUrl),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadResourcesInBackground();
  }, []);

  return (
    <div className="w-full h-full m-auto overflow-y-auto relative">
      <div className="w-full absolute top-0 left-0">
        <img
          className="w-full object-contain"
          src={HomeBannerImg}
          alt="banner"
        ></img>
      </div>

      <div className="min-w-0 mx-auto pt-[28vh] transform px-4 h-full ">
        <HeadBanner />
        <GameContainer />
        <RewardContainer />
      </div>
    </div>
  );
};

export default HomePage;
