import GameBannerImage from '@/assets/images/game-banner.png';
import VaultIcon from '@/assets/icons/vault.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const MIN_CLICK_TIME = 10;
const GameContainer = () => {
  const navigate = useNavigate();
  const [numberClicked, setNumberClicked] = useState(0);

  const handleOpenGame = () => {
    setNumberClicked(numberClicked + 1);
    if (numberClicked < MIN_CLICK_TIME) {
      return;
    }
    navigate('/shark-game', { state: { from: '/shark-game' } });
  };
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
            <p onClick={handleOpenGame}>Earn infinite $TON with Shark</p>

            <button
              className="flex justify-center items-center px-3 py-2 rounded-lg bg-[#245BD3]"
              onClick={() => {
                console.log('coming soon');
              }}
              // onClick={() => navigate("/shark-game", { state: { from: "/shark-game" } })}
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
