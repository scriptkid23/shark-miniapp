import axiosInstance from '@/axiosConfig';

export const updateWalletUser = (wallet: string) => {
  return axiosInstance.post('/user/update-wallet-address', { wallet });
};

export const checkingTotalTransaction = (abortController: AbortController) => {
  return axiosInstance.get('/user/get-user-init-point', {
    signal: abortController.signal,
  });
};
