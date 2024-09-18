import GameBannerImage from "@/assets/images/game-banner.png";
import VaultIcon from "@/assets/icons/vault.png";
import { useNavigate } from "react-router-dom";
const GameContainer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 mt-6 flex items-center">
        <img src={VaultIcon} alt="vault" className="w-6 h-6 mr-1" />
        Fishing Frenzy
      </h2>
      <div className="max-w-[374px] max-h-[216px] m-auto relative">
        <img src={GameBannerImage} alt="game" className="w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <div className="text-white text-center text-xs font-medium font-rubik flex items-end justify-between pb-4 px-4">
            <p>Earn infinite $TON with Shark</p>

            <button
              className="flex justify-center items-center px-3 py-2 rounded-lg bg-[#245BD3]"
              onClick={() => navigate("/shark-game", { state: { from: "/shark-game" } })}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
