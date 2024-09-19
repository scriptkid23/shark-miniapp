import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useUnityContext } from "react-unity-webgl";
import { Address, beginCell, toNano } from "@ton/core";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { GameEvents, UnityClassName } from "@/constant";
import { useTonConnect } from "@/hooks/useTonConnect";
import { ReactUnityEventParameter } from "react-unity-webgl/distribution/types/react-unity-event-parameters";
import { useTonConnectModal } from "@tonconnect/ui-react";
import Loading from "@/components/Loading";
import { useTonClient } from "@/hooks/useTonClient";

type UnityBridgeContextType = {
  unityProvider: any;
  isLoaded: boolean;
  sendMessage: (gameObject: string, methodName: string, value?: any) => void;
  addEventListener: (
    eventName: string,
    callback: (...args: any[]) => void
  ) => void;
  removeEventListener: (
    eventName: string,
    callback: (...args: any[]) => void
  ) => void;
};

const UnityBridgeContext = createContext<UnityBridgeContextType | null>(null);

type Props = {
  loaderUrl: string;
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  children: React.ReactNode;
};

export default function UnityBridgeProvider({
  loaderUrl,
  dataUrl,
  frameworkUrl,
  codeUrl,
  children,
}: Props) {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: loaderUrl,
    dataUrl: dataUrl,
    frameworkUrl: frameworkUrl,
    codeUrl: codeUrl,
  });
  const { open } = useTonConnectModal();

  const { initDataRaw } = retrieveLaunchParams();

  const { sender, connected, wallet } = useTonConnect();

  const { client } = useTonClient();

  const onHandleUnityMessage = useCallback(
    (...parameters: ReactUnityEventParameter[]) => {
      try {
        if (!connected) {
          open();
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    if (isLoaded && wallet) {
      handleWalletConnected();
    }
  }, [wallet, isLoaded]);

  const handleWalletConnected = async () => {
    sendMessage(UnityClassName, GameEvents.WALLET_CONNECTED);
  };

  const handleStartGame = async () => {
    console.log("trigger handleStartGame");
    sendMessage(
      UnityClassName,
      GameEvents.START_GAME,
      JSON.stringify({ token: initDataRaw })
    );
  };

  useEffect(() => {
    if (isLoaded) {
      handleStartGame();
    }
  }, [isLoaded]);

  console.log(wallet);

  const onHandleFireAndForget = useCallback(() => {}, []);

  const onGetPlayerDataFromJS = useCallback(() => {}, []);

  console.log(isLoaded);
  useEffect(() => {
    if (!isLoaded) return;

    addEventListener(
      GameEvents.REQUEST_WALLET_CONNECTION,
      onHandleUnityMessage
    );
    addEventListener(GameEvents.HANDLE_UNITY_MESSAGE, onHandleUnityMessage);
    addEventListener(GameEvents.HANDLE_FIRE_AND_FORGET, onHandleFireAndForget);
    addEventListener(GameEvents.GET_PLAYER_DATA_FROM_JS, onGetPlayerDataFromJS);

    return () => {
      removeEventListener(GameEvents.HANDLE_UNITY_MESSAGE, () => {});
      removeEventListener(GameEvents.HANDLE_FIRE_AND_FORGET, () => {});
      removeEventListener(GameEvents.GET_PLAYER_DATA_FROM_JS, () => {});
    };
  }, [isLoaded, removeEventListener, addEventListener]);

  const sendTransaction = async (
    to: string,
    amount: string,
    message: string
  ) => {
    try {
      const payload = beginCell()
        .storeUint(0, 32)
        .storeBuffer(Buffer.from(message))
        .endCell();

      await sender.send({
        to: Address.parse(to),
        value: toNano(amount),
        body: payload,
      });
    } catch (error) {
      console.error("Error sending transaction:", error);
      alert("Failed to send transaction.");
    }
  };

  // console.log(initDataRaw);

  return (
    <UnityBridgeContext.Provider
      value={{
        isLoaded,
        unityProvider,

        sendMessage,
        addEventListener,
        removeEventListener,
      }}
    >
      {!isLoaded && <Loading progress={loadingProgression} />}
      {children}
    </UnityBridgeContext.Provider>
  );
}

export const useUnityBridge = () => {
  const context = useContext(UnityBridgeContext);
  if (!context) {
    throw new Error("useUnityBridge must be used within a UnityBridgeProvider");
  }
  return context;
};
