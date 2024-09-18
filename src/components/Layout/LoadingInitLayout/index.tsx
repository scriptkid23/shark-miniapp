import SharkLogo from '@/assets/icons/shark_icon.svg';
import { useSharkStore } from '@/stores/shark_store';
import { on } from '@telegram-apps/sdk';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
type Props = {};

const LoadingInitLayout = (props: Props) => {
  const { isInitFinished, initStore } = useSharkStore((state) => state);

  useEffect(() => {
    initStore();
  }, []);

  return isInitFinished ? (
    <Outlet />
  ) : (
    <div className="h-screen w-full flex justify-center items-center">
      <img src={SharkLogo} />
    </div>
  );
};
export default LoadingInitLayout;
