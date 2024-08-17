import { initInitData, initMiniApp } from '@telegram-apps/sdk';
import axiosInstance from 'axiosConfig';
import { MissionIconType, MissionStatus } from 'containers/MissionPage/MissionItem';
import { create } from 'zustand';

export type Missions = {
  type: string;
  name: string;
  missions: {
    id: number;
    description: string;
    value: number;
    iconId: keyof typeof MissionIconType;
    status: MissionStatus;
  }[];
};

export type User = {
  id: number;
  userName: string;
  wallet: string;
  codeInvite: string;
  point: number;
  isPremium: boolean;
  invitedById: number;
  createdAt: string;
  rank: number;
};
interface SharkState {
  isInitFinished: boolean;
  user?: User;
  missions?: Missions[];

  initStore: () => void;
  test?: any;
  login: () => Promise<void>;
  getMissions: () => Promise<void>;
}

const parseMissions = (data: any): Missions[] => {
  const { mission } = data;
  const result: Missions[] = [];
  for (const property in mission) {
    result.push({
      type: property,
      name: property,
      missions: mission[property].map((mission: any) => ({
        id: mission.id,
        description: mission.description,
        value: mission.value,
        iconId: mission.iconId,
        status: mission.status,
      })),
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
      await Promise.all([login(), getMissions()]);
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
  },

  getMissions: async () => {
    const { data } = await axiosInstance.get('/user/get-mission');
    // parseMissions(data);
  },

  getLeaderboard: async () => {
    const { data } = await axiosInstance.get('/user/get-leaderboard');
    console.log(data);
  },
}));
