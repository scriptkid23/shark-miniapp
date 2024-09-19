import { useEffect, useState } from 'react';
import { Unity } from 'react-unity-webgl';
import { isBrowser, isMobile } from 'react-device-detect';
import { useUnityBridge } from '@/libs/unity/UnityBridgeContext';
import { on } from '@telegram-apps/sdk';
import { useSharkStore } from '@/stores/shark_store';

export default function GameArena() {
  const { unityProvider } = useUnityBridge();
  const { initStore } = useSharkStore((state) => state);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio);
  useEffect(() => {
    const handleBackButtonClick = async () => {
      console.log('Back button pressed');
      await initStore();
    };

    on('back_button_pressed', handleBackButtonClick);
  }, []);

  useEffect(() => {
    const updateDevicePixelRatio = () => {
      setDevicePixelRatio(window.devicePixelRatio);
    };

    const updateDimensions = () => {
      if (isBrowser) {
        setDimensions({
          width: 375,
          height: 667,
        });
      } else if (isMobile) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      } else {
        setDimensions({
          width: 375,
          height: 667,
        });
      }
    };

    const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`);
    mediaMatcher.addEventListener('change', updateDevicePixelRatio);

    return () => {
      mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [devicePixelRatio, isMobile]);

  return (
    <div>
      <Unity
        unityProvider={unityProvider}
        style={{ width: dimensions.width, height: dimensions.height }}
        devicePixelRatio={devicePixelRatio}
      />
      {/* <TonConnectButton /> */}
    </div>
  );
}
