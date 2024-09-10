import axiosInstance from '@/axiosConfig';

export const updateWalletUser = (wallet: string) => {
  return axiosInstance.post('/user/update-wallet-address', { wallet });
};

export const checkingTotalTransaction = (wallet: string, abortController: AbortController) => {
  return axiosInstance.post(
    '/user/get-user-init-point',
    {
      address: wallet,
    },
    { signal: abortController.signal }
  );
};

export const fetchMission = () => {
  return axiosInstance.get('/mission/get-mission');
};

export const checkMission = (missionId: number, boc?: string, address?: string) => {
  return axiosInstance.post(`/user/claim-reward`, { mid: missionId, boc, address });
};

export const submitReferral = (referral: string) => {
  return axiosInstance.post('/user/submit-referral-code', { referralCode: referral });
};

export const fetchFriends = () => {
  return axiosInstance.get('/user/get-list-invite');
};

export const claimMission = (missionId: number, missionType: string) => {
  return axiosInstance.post('/mission/claim', { missionId, missionType });
}
