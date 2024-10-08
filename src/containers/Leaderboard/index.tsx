import SmileFaceIcon from '@/assets/icons/smile.png';
import { getInitials, getRandomColor, numberWithCommas } from '@/utils';

import { useSharkStore } from '@/stores/shark_store';
import { useInitDataRaw } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import axiosInstance from '@/axiosConfig';
import { Avatar } from '@nextui-org/react';
import Medal1 from '@/assets/icons/1st_medal.png';
import Medal2 from '@/assets/icons/2nd_medal.png';
import Medal3 from '@/assets/icons/3rd_medal.png';

type Props = {};

const getMedal = (index: number) => {
  if (index === 0) return Medal1;
  if (index === 1) return Medal2;
  if (index === 2) return Medal3;
};

const LeaderboardPage = (props: Props) => {
  const { user } = useSharkStore();
  const data = useInitDataRaw();

  const [leaderboard, setLeaderboard] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance.get('/leader-board');
      setLeaderboard(data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full m-auto py-9 px-4 overflow-y-auto hidden-scrollbar">
      <h1 className="text-white text-2xl font-medium text-center">Rank</h1>
      <div className="flex items-center justify-between bg-[#0E2454] p-4 rounded-[18px] mt-6">
        <div className="flex items-center justify-center">
          <div className="w-[46px] h-[46px]">
            <Avatar
              src={leaderboard?.avt}
              classNames={{
                name: `font-medium`,
              }}
              color={getRandomColor(parseInt(user?.id + '' || '0'))}
              showFallback
              name={getInitials(user?.userName || '')}
              imgProps={{
                width: 34,
                height: 34,
              }}
            />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium">{user?.userName}</p>
            <p className="text-base font-semibold">{numberWithCommas(leaderboard?.score || 0)} BAITS</p>
          </div>
        </div>
        <div>
          <p className="text-sm">#{leaderboard?.rank}</p>
        </div>
      </div>
      <div className="mt-9 h-auto overflow-y-auto">
        <p className="text-lg font-semibold mb-6">{numberWithCommas(leaderboard?.total || 0)} holders</p>
        <div className="overflow-y-auto">
          {leaderboard?.leaderBoard &&
            leaderboard?.leaderBoard.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-[18px] gap-3 ${index !== 0 ? 'mt-7' : ''}`}
                >
                  <Avatar
                    src={item.avt}
                    classNames={{
                      name: `font-medium`,
                    }}
                    color={getRandomColor(parseInt(item.playerId, 10))}
                    showFallback
                    name={getInitials(item.playerName)}
                    imgProps={{
                      width: 34,
                      height: 34,
                    }}
                  />
                  <div className="flex flex-col flex-1">
                    <p className="text-sm">{item.playerName || ''}</p>
                    <p className="text-base font-semibold">{numberWithCommas(item.score || 0)} BAITS</p>
                  </div>
                  <div>
                    {!!getMedal(index) ? (
                      <div className="w-[30px] h-[30px] ">
                        <img className="object-fill" src={getMedal(index)} alt="medal" />
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
