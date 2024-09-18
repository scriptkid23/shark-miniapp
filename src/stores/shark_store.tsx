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
            id: 5,
            name: 'Become a realShark',
            description: null,
            icon_id: 2,
            type: 0,
            point: 120000,
            claimed: 'FAIL',
          },
          {
            id: 4,
            name: 'Daily Checkin',
            description: null,
            icon_id: 2,
            type: 0,
            point: 10000,
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
            description: 'https://x.com/realshark_ton/status/1834077174510375158?s=46&t=n-ZKtu3DiwlYBhmIZ3UBvA\n\n',
            icon_id: 1,
            type: 1,
            point: 300,
          },
          {
            id: 1,
            name: 'Retweet a post',
            description: 'https://x.com/realshark_ton/status/1834077174510375158?s=46&t=n-ZKtu3DiwlYBhmIZ3UBvA',
            icon_id: 1,
            type: 1,
            point: 200,
          },
        ],
      },
      shark_loyalty: {
        visible: true,
        name: 'Shark Loyalty',
        type: 2,
        missions: [
          {
            id: 31,
            name: 'React this post',
            description: 'https://t.me/realsharks_ton/22',
            icon_id: 3,
            type: 2,
            point: 1000,
            claimed: 'DONE',
          },
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
            id: 15,
            name: 'Play USDspin',
            description: 'https://t.me/USDspin_bot/claim?startapp=C3003',
            icon_id: 8,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 16,
            name: 'Play Mainkan Uang Gratis',
            description: 'https://t.me/UangGratiBot/IDR?startapp=C_3003',
            icon_id: 8,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 10,
            name: 'Follow DogX',
            description: 'https://x.com/realDogX',
            icon_id: 5,
            type: 3,
            point: 500,
            claimed: 'DONE',
          },
          {
            id: 11,
            name: 'Join DogX Community',
            description: 'https://t.me/RealDogX_Bot',
            icon_id: 5,
            type: 3,
            point: 500,
            claimed: 'DONE',
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
            id: 17,
            name: 'Join SecretPadBot',
            description: 'https://t.me/SecretPadBot/app?startapp=r432963868_sRealShark',
            icon_id: 9,
            type: 3,
            point: 500,
            claimed: 'DONE',
          },
          {
            id: 18,
            name: 'Follow SecretPadBot',
            description: 'https://x.com/SecretPadBot',
            icon_id: 9,
            type: 3,
            point: 500,
            claimed: 'DONE',
          },
          {
            id: 19,
            name: 'Join Pirate Frenzy',
            description: 'https://t.me/pirate_frenzy_bot/piratefrenzy?startapp=SHARKS',
            icon_id: 10,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 20,
            name: 'Follow Pirate Frenzy',
            description: 'https://x.com/PirateClash_HQ',
            icon_id: 10,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 21,
            name: 'Play Pirate Frenzy',
            description: 'https://t.me/pirate_frenzy_bot/piratefrenzy?startapp=Qgv6ST7phJ',
            icon_id: 10,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 22,
            name: 'Play Potus Click',
            description: 'https://t.me/potusclick_bot/app?startapp=r5409729546',
            icon_id: 11,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 23,
            name: 'Follow PixelHeroesAdventure',
            description: 'https://x.com/PixelHeroesMMO',
            icon_id: 12,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 24,
            name: 'Join TapAdventure channel',
            description: 'https://t.me/tapadventure',
            icon_id: 12,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 25,
            name: 'Play Game',
            description: 'https://t.me/pixelheroes_io_bot',
            icon_id: 12,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 26,
            name: 'Join TON Cook',
            description: 'https://t.me/toncookbot/earnton?startapp=LKTNS',
            icon_id: 13,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 27,
            name: 'Join TON Cook Announcement',
            description: 'https://t.me/TONCook_Announcements',
            icon_id: 13,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 28,
            name: 'Join BeeVerse Bot',
            description: 'https://t.me/bee_verse_bot',
            icon_id: 14,
            type: 3,
            point: 500,
            claimed: 'DONE',
          },
          {
            id: 29,
            name: 'Join BeeVerse Channel EN',
            description: 'https://t.me/nctr_ann',
            icon_id: 14,
            type: 3,
            point: 500,
            claimed: 'DONE',
          },
          {
            id: 30,
            name: 'Join BeeVerse Channel CIS',
            description: 'https://t.me/nctr_ann_cis',
            icon_id: 14,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 35,
            name: 'Follow Twitter',
            description: 'https://x.com/PoolAM_hub',
            icon_id: 17,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 36,
            name: 'Join Telegram channel',
            description: 'https://t.me/PoolAM_hub',
            icon_id: 17,
            type: 3,
            point: 500,
            claimed: 'FAIL',
          },
          {
            id: 37,
            name: 'Join PoolAM',
            description: 'https://t.me/poolam_bot/app?startapp=zi1dbYz2HE',
            icon_id: 17,
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
    const partnersConfig = [
      { type: 'dogx', name: 'DogX', icon_id: 5 },
      { type: 'aylab', name: 'Aylab', icon_id: 6 },
      { type: 'tappyTap', name: 'Tappy Tap', icon_id: 7 },
      { type: 'wcoin', name: 'Wcoin', icon_id: 8 },
      { type: 'scecretPad', name: 'ScecretPadBot', icon_id: 9 },
      { type: 'pirateFrenzy', name: 'Pirate Frenzy', icon_id: 10 },
      { type: 'potusClick', name: 'Potus Click', icon_id: 11 },
      { type: 'tapAdventure', name: 'TapAdventure', icon_id: 12 },
      { type: 'tonCook', name: 'Ton Cook', icon_id: 13 },
      { type: 'beeVerse', name: 'BeeVerse', icon_id: 14 },
      { type: 'scrooG', name: 'Scroo-G', icon_id: 15 },
      { type: 'clockieChaos', name: 'Clockie Chaos', icon_id: 16 },
      { type: 'poolAM', name: 'PoolAM', icon_id: 17 },
      { type: 'paniee', name: 'Paniee', icon_id: 18 },
    ];

    const partnerMissionsMap: { [key: string]: MissionItem[] } = {};

    partnersConfig.forEach((partner) => {
      partnerMissionsMap[partner.type] = [];
    });

    for (const items of shark_alliance.missions) {
      const mission: MissionItem = {
        id: items.id,
        title: items.name,
        description: items.description,
        value: items.point || 0,
        iconId: items.icon_id,
        status: parseStatus(items.claimed),
      };

      const partner = partnersConfig.find((p) => p.icon_id === items.icon_id);
      if (partner) {
        partnerMissionsMap[partner.type].push(mission);
      }
    }

    partnersConfig.forEach((partner) => {
      partnerMissions.push({
        type: partner.type,
        name: partner.name,
        missions: partnerMissionsMap[partner.type],
      });
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
    set({ isFirstLogin: data?.user?.isFirstLogin });
  },

  getMissions: async () => {
    set({ missions: undefined });
    const { data } = await axiosInstance.get('/user/get-mission');
    // const data = mockFetchMissions();
    const missions = parseMissions(data);
    set({
      missions: missions.missions,
      partnerMissions: missions.partnerMissions,
    });
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
