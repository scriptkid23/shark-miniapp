import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarRedirect from './NavbarRedirect';
import { useSharkStore } from '@/stores/shark_store';
import { FirstLoginModal } from '@/components/Modals/FirstLoginModal';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { isFirstLogin } = useSharkStore((state) => state);
  return (
    <div className="relative bg-[#090909] max-w-md mx-auto">
      {children ?? (
        <div className="relative h-screen overflow-hidden pb-[80px]">
          <Outlet />
        </div>
      )}
      <div className="absolute bottom-3 left-0 right-0 w-full max-w-md mx-auto px-4">
        <NavbarRedirect />
      </div>
      <FirstLoginModal />
    </div>
  );
};

export default MainLayout;
