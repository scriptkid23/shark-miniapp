import axiosInstance from '@/axiosConfig';
import { MissionIconType, MissionStatus } from '@/containers/MissionPage/MissionItem';
import { UnderwarterLevel } from '@/containers/StoriesPage/Stories1/Stories_1';
import { initInitData, initMiniApp } from '@telegram-apps/sdk';
import { create } from 'zustand';

export type Missions = {
  type: string;
  name: string;
  missions: {
    id: number;
    title: string;
    description: string;
    value: number;
    iconId: keyof typeof MissionIconType;
    status: MissionStatus;
  }[];
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

  initStore: () => void;
  login: () => Promise<void>;
  getMissions: () => Promise<void>;
  setTransaction: (total: number, point: number) => void;
}

const preloadBanner = () => {
  const img = new Image();
  img.src = '/assets/images/banner.png';
  img.onload = () => {
    console.log('loaded');
  };
};

const preloadAnimation = () => {
  const obj = { ...UnderwarterLevel } as any;
  for (const property in obj) {
    const img = new Image();
    img.src = obj[property].imagePath;
    img.onload = () => {
      console.log('loaded');
    };
  }
};
const parseStatus = (isClaimed: boolean) => {
  if (isClaimed) {
    return MissionStatus.DONE;
  }
  return MissionStatus.ACTIVE;
};

const parseMissions = (data: any): Missions[] => {
  const { mission } = data;
  const result: Missions[] = [];

  for (const property in mission) {
    const missions = mission[property]?.missions;
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
              status: parseStatus(item.is_claimed),
            }))
          : [],
    });
  }

  return result;
};

export const useSharkStore = create<SharkState>()((set, get) => ({
  isInitFinished: false,

  initStore: async () => {
    const [isMiniApp] = initMiniApp();
    if (!isMiniApp.ready) {
      return;
    }
    try {
      const { login, getMissions } = get();
      await Promise.all([login(), getMissions(), preloadAnimation(), preloadBanner()]);
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
    const { user } = initData;
    const body = {
      uid: user.id,
      username: user.username || user.lastName + ' ' + user.firstName,
      isPremium: !!user.isPremium,
    };
    const { data } = await axiosInstance.post('/user/login', body);
    set({ user: data });
    // set({ user: userMock });
  },

  getMissions: async () => {
    const { data } = await axiosInstance.get('/user/get-mission');
    console.log(data);
    const missions = parseMissions(data);
    set({ missions });
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
}));
