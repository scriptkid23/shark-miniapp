import axiosInstance from '@/axiosConfig';
import { MissionIconType, MissionStatus } from '@/containers/MissionPage/MissionItem';
import { initInitData, initMiniApp } from '@telegram-apps/sdk';
import { create } from 'zustand';

export type MissionItem = {
  id: number;
  title: string;
  description: string;
  value: number;
  iconId: keyof typeof MissionIconType;
  status: MissionStatus;
};

export type Missions = {
  type: string;
  name: string;
  missions: MissionItem[];
  missionWithChild?: Missions[];
};

const mockFetchMissions = () => {
  return {
    mission: {
      ton_native: {
        visible: true,
        name: 'Ton Native',
        type: 0,
        missions: [
          {
            id: 4,
            name: 'Make a transaction on TON',
            description: null,
            icon_id: 2,
            type: 0,
            point: 10000,
            claimed: 'FAIL',
          },
          {
            id: 5,
            name: 'Become a realShark',
            description: null,
            icon_id: 2,
            type: 0,
            point: 120000,
            claimed: 'FAIL',
          },
        ],
      },
      daily_mission: {
        visible: true,
        name: 'Daily Mission',
        type: 1,
        missions: [
          {
            id: 3,
            name: 'Invite a friend',
            description: null,
            icon_id: 3,
            type: 1,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 2,
            name: 'Drop $SHARKS in this post',
            description: 'https://x.com/RealShark_TON/status/1830536073551958283',
            icon_id: 1,
            type: 1,
            point: 300,
            claimed: 'FAIL',
          },
          {
            id: 1,
            name: 'Retweet a post',
            description: 'https://x.com/RealShark_TON/status/1830536073551958283',
            icon_id: 1,
            type: 1,
            point: 200,
            claimed: 'FAIL',
          },
        ],
      },
      shark_loyalty: {
        visible: true,
        name: 'Shark Loyalty',
        type: 2,
        missions: [
          {
            id: 6,
            name: 'Follow SHARKS',
            description: 'https://x.com/RealShark_TON',
            icon_id: 1,
            type: 2,
            point: 1000,
            claimed: 'FAIL',
          },
          {
            id: 7,
            name: 'Become a White Shark',
            description: 'https://forms.gle/3LxEUkMWBvTpRhSK6',
            icon_id: 1,
            type: 2,
            point: 20000,
            claimed: 'FAIL',
          },
          {
            id: 8,
            name: 'Join SHARKS Club',
            description: 'https://t.me/realsharks_ton',
            icon_id: 3,
            type: 2,
            point: 1000,
            claimed: 'FAIL',
          },
          {
            id: 9,
            name: 'Retweet about #SHARKS',
            description: 'https://x.com/RealShark_TON/status/1829066743408738420/photo/1',
            icon_id: 1,
            type: 2,
            point: 1000,
            claimed: 'FAIL',
          },
        ],
      },
      shark_alliance: {
        visible: true,
        name: 'Shark Allince',
        type: 3,
        missions: [
          {
            id: 10,
            name: 'Follow DogX',
            description: 'https://x.com/realDogX',
            icon_id: 5,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 11,
            name: 'Join DogX Community',
            description: 'https://t.me/RealDogX_Bot',
            icon_id: 5,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 12,
            name: 'Follow Aylab',
            description: 'https://x.com/aylab_io',
            icon_id: 6,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 13,
            name: 'Follow Tappy Tap',
            description: 'https://x.com/tappysocial',
            icon_id: 7,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 14,
            name: 'Join Tappy Tap',
            description: 'https://t.me/TappySocial_bot/Tappy',
            icon_id: 7,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 15,
            name: 'Play Wcoin',
            description: 'https://t.me/Whatsgamesbot/WCoin?startapp=C_SHARKS',
            icon_id: 8,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 16,
            name: 'Play WcoinIDR',
            description: 'https://t.me/Wcoingamebot/WcoinIDR?startapp=C_SHARKS',
            icon_id: 8,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
        ],
      },
    },
  };
};

export type User = {
  id: number;
  userName: string;
  wallet?: string;
  codeInvite: string;
  point: number;
  isPremium: boolean;
  invitedById: number;
  createdAt: string;
  rank: number;
  transaction: {
    total: number | null;
    point: number;
  };
};
interface SharkState {
  isInitFinished: boolean;
  user?: User;
  missions?: Missions[];
  partnerMissions?: Missions[];
  isFirstLogin: boolean;

  initStore: () => void;
  login: () => Promise<void>;
  getMissions: () => Promise<void>;
  setTransaction: (total: number, point: number) => void;
  setPoint: (point: number) => void;
  setWallet: (wallet: string) => void;
  setIsFirstLogin: (isFirstLogin: boolean) => void;
}

const parseStatus = (claimed: string) => {
  if (claimed === 'FAIL') {
    return MissionStatus.ACTIVE;
  }
  if (claimed === 'DONE') {
    return MissionStatus.DONE;
  }

  if (claimed === 'PENDING') {
    return MissionStatus.PENDING;
  }

  return MissionStatus.ACTIVE;
};

const parseMissions = (data: any) => {
  const { mission } = data;
  const result: Missions[] = [];
  const partnerMissions: Missions[] = [];
  const { shark_alliance, ...tempMission } = mission || {};

  for (const property in tempMission) {
    const missions = mission[property]?.missions;
    if (property !== 'shark_alliance') {
      result.push({
        type: property,
        name: mission[property].name,
        missions:
          missions && missions.length > 0
            ? missions.map((item: any) => ({
                id: item.id,
                title: item.name,
                description: item.description,
                value: item.point || 0,
                iconId: item.icon_id,
                status: parseStatus(item.claimed),
              }))
            : [],
      });
    }
  }

  if (shark_alliance) {
    const dogx = [];
    const dogx_icon_id = 5;
    const aylab = [];
    const aylab_icon_id = 6;
    const tappyTap = [];
    const tappyTap_icon_id = 7;
    const wcoin = [];
    const wcoin_icon_id = 8;
    const scecretPad = []; 
    const scecret_pad_icon_id = 9;
    // Pirate Frenzy
   const pirateFrenzy = [];
   const pirateFrenzy_icon_id = 10;
  
    for (const items of shark_alliance.missions) {
      const mission: MissionItem = {
        id: items.id,
        title: items.name,
        description: items.description,
        value: items.point || 0,
        iconId: items.icon_id,
        status: parseStatus(items.claimed),
      };
      if (items.icon_id === dogx_icon_id) {
        dogx.push(mission);
      }
      if (items.icon_id === aylab_icon_id) {
        aylab.push(mission);
      }
      if (items.icon_id === tappyTap_icon_id) {
        tappyTap.push(mission);
      }
      if (items.icon_id === wcoin_icon_id) {
        wcoin.push(mission);
      }
      if (items.icon_id === scecret_pad_icon_id) {
        scecretPad.push(mission);
      }
      if(items.icon_id === pirateFrenzy_icon_id) {
        pirateFrenzy.push(mission);
      }
    }
    
    partnerMissions.push({
      type: 'dogx',
      name: 'DogX',
      missions: dogx,
    });
    partnerMissions.push({
      type: 'aylab',
      name: 'Aylab',
      missions: aylab,
    });
    partnerMissions.push({
      type: 'tappyTap',
      name: 'Tappy Tap',
      missions: tappyTap,
    });
    partnerMissions.push({
      type: 'wcoin',
      name: 'Wcoin',
      missions: wcoin,
    });
    partnerMissions.push({ 
      type: 'scecretPad',
      name: 'ScecretPadBot',
      missions: scecretPad,
    });
    partnerMissions.push({
      type: 'pirateFrenzy',
      name: 'Pirate Frenzy',
      missions: pirateFrenzy,
    });
  }
  

  return { missions: result, partnerMissions };
};

export const useSharkStore = create<SharkState>()((set, get) => ({
  isInitFinished: false,
  isFirstLogin: false,
  initStore: async () => {
    const [isMiniApp] = initMiniApp();
    // console.log(isMiniApp);
    if (!isMiniApp.ready) {
      return;
    }

    try {
      const { login, getMissions } = get();
      await login();
      await Promise.all([getMissions()]);
      set({ isInitFinished: true });
    } catch (error) {
      console.log(error);
    }
  },

  login: async () => {
    const initData = initInitData();

    if (!initData?.user) {
      throw new Error('initData is not defined');
    }
    const { user, startParam } = initData;
    console.log(user);
    const body = {
      uid: user.id,
      username: user.username || user.lastName + ' ' + user.firstName,
      isPremium: !!user.isPremium,
      referralCode: startParam,
    };
    const { data } = await axiosInstance.post('/user/login', body);
    set({ user: data.user });
  },

  getMissions: async () => {
    set({ missions: undefined });
    const { data } = await axiosInstance.get('/user/get-mission');
    // const data = mockFetchMissions();
    const missions = parseMissions(data);
    set({ missions: missions.missions, partnerMissions: missions.partnerMissions });
  },

  getLeaderboard: async () => {
    const { data } = await axiosInstance.get('/user/get-leaderboard');
    console.log(data);
  },

  setTransaction: (total: number, point: number) => {
    const { user } = get();
    if (!user) {
      return;
    }
    set({ user: { ...user, transaction: { total, point } } });
  },

  setPoint: (point: number) => {
    const { user } = get();
    if (!user) {
      return;
    }
    set({ user: { ...user, point } });
  },
  setWallet: (wallet: string) => {
    const { user } = get();
    if (!user) {
      return;
    }
    set({ user: { ...user, wallet } });
  },
  setIsFirstLogin: (isFirstLogin: boolean) => {
    set({ isFirstLogin });
  },
}));
