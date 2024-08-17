import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSharkStore } from 'stores/shark_store';

type Props = {};

const LoadingInitLayout = (props: Props) => {
  const { isInitFinished, initStore } = useSharkStore((state) => state);

  useEffect(() => {
    initStore();
  }, []);

  return isInitFinished ? <Outlet /> : <div>Loading</div>;
};
export default LoadingInitLayout;
