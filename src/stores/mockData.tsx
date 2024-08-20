import { MissionStatus } from '@/containers/MissionPage/MissionItem';
import { Missions, User } from './shark_store';

export const userMock: User = {
  id: 1,
  userName: 'MockUser',
  // wallet: '0x1234567890abcdef1234567890abcdef12345678',
  codeInvite: 'MOCK123',
  point: 1000,
  isPremium: false,
  invitedById: 0,
  createdAt: new Date().toISOString(),
  rank: 100,
  transaction: {
    total: 0,
    point: -1,
  },
};
const MockMission: Missions[] = [
  {
    type: 'ton-native',
    name: 'TON Native',
    missions: [
      {
        id: 1,
        title: 'Make a transaction',
        description: 'Make a transaction',
        value: 1000,
        iconId: 1,
        status: MissionStatus.PENDING,
      },
      {
        id: 2,
        title: 'Become a realShark',
        description: 'Become a realShark',
        value: 120000,
        iconId: 2,
        status: MissionStatus.ACTIVE,
      },
    ],
  },
  {
    type: 'loyalty',
    name: 'SHARK Loyalty',
    missions: [
      {
        id: 3,
        title: 'Follow twitter SHARKS',
        description: 'Follow twitter SHARKS',
        value: 1000,
        iconId: 3,
        status: MissionStatus.DONE,
      },
      {
        id: 4,
        title: 'Join SHARKS Telegram channel',
        description: 'Join SHARKS Telegram channel',
        value: 1000,
        iconId: 4,
        status: MissionStatus.ACTIVE,
      },
    ],
  },
  {
    type: 'daily',
    name: 'SHARK DAILY',
    missions: [
      {
        id: 5,
        title: 'Invite a friend',
        description: 'Invite a friend',
        value: 500,
        iconId: 3,
        status: MissionStatus.ACTIVE,
      },
    ],
  },
];
