import { User } from './shark_store';

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
    total: 450,
    point: 100000,
  },
};
