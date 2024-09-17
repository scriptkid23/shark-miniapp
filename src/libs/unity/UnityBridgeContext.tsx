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
import { useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";

type UnityBridgeContextType = {
  unityProvider: any;
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
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: loaderUrl,
      dataUrl: dataUrl,
      frameworkUrl: frameworkUrl,
      codeUrl: codeUrl,
    });
  const { open, state } = useTonConnectModal();
  const wallet = useTonWallet();

  const { sender, connected } = useTonConnect();

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

  // Listen for the pending and connected status
  useEffect(() => {
    if (wallet) {
      handleWalletConnected();
    }
  }, [wallet]);

  const handleWalletConnected = () => {
    sendMessage(
      UnityClassName,
      GameEvents.WALLET_CONNECTED,
      JSON.stringify({ wallet })
    );
  };

  const onHandleFireAndForget = useCallback(() => {}, []);

  const onGetPlayerDataFromJS = useCallback(() => {}, []);

  useEffect(() => {
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
  }, [removeEventListener, addEventListener]);

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

  // const { initDataRaw } = retrieveLaunchParams();
  // console.log(initDataRaw);

  return (
    <UnityBridgeContext.Provider
      value={{
        unityProvider,
        sendMessage,
        addEventListener,
        removeEventListener,
      }}
    >
      {children}
      <button onClick={handleWalletConnected}>submit</button>
    </UnityBridgeContext.Provider>
  );
}

// Custom hook để truy cập context dễ dàng
export const useUnityBridge = () => {
  const context = useContext(UnityBridgeContext);
  if (!context) {
    throw new Error("useUnityBridge must be used within a UnityBridgeProvider");
  }
  return context;
};
