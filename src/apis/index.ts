import axiosInstance from '@/axiosConfig';

export const updateWalletUser = (wallet: string) => {
  return axiosInstance.post('/user/update-wallet-address', { wallet });
};

export const checkingTotalTransaction = (wallet: string, abortController: AbortController) => {
  return axiosInstance.post('/user/get-user-init-point?', {
    body: {
      wallet,
    },
    signal: abortController.signal,
  });
};

export const fetchMission = () => {
  return axiosInstance.get('/mission/get-mission');
};

export const checkMission = (missionId: number, boc?: string) => {
  return axiosInstance.post(`/user/claim-reward`, { mid: missionId, boc });
};
