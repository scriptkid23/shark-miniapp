import SmileFaceIcon from '@/assets/icons/smile.png';
import { numberWithCommas } from '@/utils';
import Medal1 from '@/assets/icons/1st_medal.png';
import Medal2 from '@/assets/icons/2nd_medal.png';
import Medal3 from '@/assets/icons/3rd_medal.png';
import { useSharkStore } from '@/stores/shark_store';
import { useInitDataRaw } from '@telegram-apps/sdk-react';

type Props = {};

const getMedal = (index: number) => {
  if (index === 0) return Medal1;
  if (index === 1) return Medal2;
  if (index === 2) return Medal3;
};

const MOCK_LEADERBOARD = [
  {
    name: 'victor',
    balance: 1000,
    avatar: SmileFaceIcon,
  },
  {
    name: 'david',
    balance: 1000,
    avatar: SmileFaceIcon,
  },
  {
    name: 'kevin',
    balance: 1000,
  },
  {
    name: 'tom',
    balance: 1000,
  },
  {
    name: '123abc',
    balance: 1000,
  },
  {
    name: '123abc',
    balance: 1000,
  },
  {
    name: '123abc',
    balance: 1000,
  },
  {
    name: '123abc',
    balance: 1000,
  },
  {
    name: '123abc',
    balance: 1000,
  },
];

const LeaderboardPage = (props: Props) => {
  const { user } = useSharkStore();
  const data = useInitDataRaw();
  return (
    <div className="w-full h-full m-auto py-9 px-4 overflow-y-auto">
      <h1 className="text-white text-2xl font-medium text-center">Rank</h1>
      <div className="flex items-center justify-between bg-[#0E2454] p-4 rounded-[18px] mt-6">
        <div className="flex items-center justify-center">
          <div className="w-[46px] h-[46px]">
            <img className="w-full h-full" src={data.result?.user?.photoUrl} alt="smile-face" />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium">{user?.userName}</p>
            <p className="text-base font-semibold">{numberWithCommas(1000)} BAITS</p>
          </div>
        </div>
        <div>
          <p className="text-sm">#176616</p>
        </div>
      </div>
      <div className="mt-9 h-auto overflow-y-auto">
        <h3 className="text-lg font-semibold mb-6">{numberWithCommas(user?.point || 0)} holders</h3>
        <div className="overflow-y-auto">
          {MOCK_LEADERBOARD.map((item, index) => {
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
                  <p className="text-sm">{item.name}</p>
                  <p className="text-base font-semibold">{numberWithCommas(item.balance)} BAITS</p>
                </div>
                <div>
                  {!!getMedal(index) ? (
                    <img width={46} height={46} src={getMedal(index)} alt="medal" />
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
