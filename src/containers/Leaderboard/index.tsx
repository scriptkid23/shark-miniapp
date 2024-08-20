import SmileFaceIcon from '@/assets/icons/smile.png';
import { numberWithCommas } from '@/utils';
import Medal1 from '@/assets/icons/1st_medal.png';
import Medal2 from '@/assets/icons/2nd_medal.png';
import Medal3 from '@/assets/icons/3rd_medal.png';
import { useSharkStore } from '@/stores/shark_store';
import { useInitDataRaw } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import axiosInstance from '@/axiosConfig';

type Props = {};

const getMedal = (index: number) => {
  if (index === 0) return Medal1;
  if (index === 1) return Medal2;
  if (index === 2) return Medal3;
};

const MOCK_LEADERBOARD = [
  {
    playerName: 'victor',
    score: 1000,
    avatar: SmileFaceIcon,
  },
  {
    playerName: 'david',
    score: 1000,
    avatar: SmileFaceIcon,
  },
  {
    playerName: 'kevin',
    score: 1000,
  },
  {
    playerName: 'tom',
    score: 1000,
  },
  {
    playerName: '123abc',
    score: 1000,
  },
  {
    playerName: '123abc',
    score: 1000,
  },
  {
    playerName: '123abc',
    score: 1000,
  },
  {
    playerName: '123abc',
    score: 1000,
  },
  {
    playerName: '123abc',
    score: 1000,
  },
];

const LeaderboardPage = (props: Props) => {
  const { user } = useSharkStore();
  const data = useInitDataRaw();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get('/leader-board');
      setLeaderboard(data.data.leaderBoard);
    };
    fetchData();
  }, []);
  console.log(leaderboard, 'thangpham123123');
  return (
    <div className="w-full h-full m-auto py-9 px-4 overflow-y-auto">
      <h1 className="text-white text-2xl font-medium text-center">Rank</h1>
      <div className="flex items-center justify-between bg-[#0E2454] p-4 rounded-[18px] mt-6">
        <div className="flex items-center justify-center">
          <div className="w-[46px] h-[46px]">
            <img className="w-full h-full" src={data.result?.user?.photoUrl || SmileFaceIcon} alt="smile-face" />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium">{user?.userName}</p>
            <p className="text-base font-semibold">{numberWithCommas(1000)} BAITS</p>
          </div>
        </div>
        <div>
          <p className="text-sm">#{user?.rank}</p>
        </div>
      </div>
      <div className="mt-9 h-auto overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6">{numberWithCommas(leaderboard.length || 0)} holders</h3>
        <div className="overflow-y-auto">
          {leaderboard.map((item, index) => {
            const isHaveAvatar = !!item.avatar;
            return (
              <div
                key={index}
                className={`flex items-center justify-between rounded-[18px] ${index !== 0 ? 'mt-7' : ''}`}
              >
                <div
                  className={`w-[46px] h-[46px] rounded-full mr-5 ${isHaveAvatar ? 'bg-transparent' : 'bg-slate-400'}`}
                >
                  {isHaveAvatar && (
                    <img className="w-full h-full object-fill rounded-full" src={item.avatar} alt="smile-face" />
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-sm">{item.playerName || 'Victor Hugo'}</p>
                  <p className="text-base font-semibold">{numberWithCommas(item.score || 0)} BAITS</p>
                </div>
                <div>
                  {!!getMedal(index) ? (
                    <div className="w-[46px] h-[46px]">
                      <img className="w-full h-full object-cover" src={getMedal(index)} alt="medal" />
                    </div>
                  ) : (
                    <p className="text-sm">{'#' + (index + 1)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
