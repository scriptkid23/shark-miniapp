import HomeActiveIcon from '@/assets/icons/navbar/home-active.png';
import HomeIcon from '@/assets/icons/navbar/home.png';
import LeaderboardActiveIcon from '@/assets/icons/navbar/leaderboard-active.png';
import LeaderboardIcon from '@/assets/icons/navbar/leaderboard.png';
import MissionsActiveIcon from '@/assets/icons/navbar/mission-active.png';
import MissionsIcon from '@/assets/icons/navbar/mission.png';
import FriendsActiveIcon from '@/assets/icons/navbar/refer-active.png';
import FriendsIcon from '@/assets/icons/navbar/refer.png';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_LIST = [
  {
    title: 'Home',
    path: '/',
    icon: HomeIcon,
    activeIcon: HomeActiveIcon,
  },
  {
    title: 'Rank',
    path: '/leaderboard',
    icon: LeaderboardIcon,
    activeIcon: LeaderboardActiveIcon,
  },
  {
    title: 'Missions',
    path: '/missions',
    icon: MissionsIcon,
    activeIcon: MissionsActiveIcon,
  },
  {
    title: 'Friends',
    path: '/friends',
    icon: FriendsIcon,
    activeIcon: FriendsActiveIcon,
  },
];

const NavbarRedirect = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => pathname === path;

  const handleNavigate = (path: string) => navigate(path);

  return (
   
      <div className="bg-[#111111] px-9 py-3 rounded-2xl grid grid-cols-[auto_auto_auto_auto] gap-x-4">
        {NAV_LIST.map((item) => (
          <div key={item.path} className="w-fit m-auto" onClick={() => handleNavigate(item.path)}>
            {isActive(item.path) ? (
              <div className="flex items-center justify-center px-3 py-2 rounded-[60px] bg-[#0085FF] bg-opacity-15">
                <div className="w-[24px] h-[24px]">
                  <img className="w-full h-full" src={item.activeIcon} alt="icon" />
                </div>
                <p className="text-[#0085FF] text-xs font-bold ml-2">{item.title}</p>
              </div>
            ) : (
              <div className="w-[24px] h-[24px] cursor-pointer" >
                <img className="w-full h-full" src={item.icon} alt="icon" />
              </div>
            )}
          </div>
        ))}
      </div>
    
  );
};

export default NavbarRedirect;
