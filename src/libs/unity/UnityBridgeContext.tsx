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
import { to } from "@/config";

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

  console.log({ seller: import.meta.env.VITE_SELLER_ADDRESS });
  useEffect(() => {
    if (isLoaded && wallet) {
      handleWalletConnected();
    }
  }, [wallet, isLoaded]);

  const handleWalletConnected = async () => {
    sendMessage(UnityClassName, GameEvents.WALLET_CONNECTED);
  };

  const handleStartGame = async () => {
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

  const onHandleFireAndForget = useCallback(() => {}, []);

  const onGetPlayerDataFromJS = useCallback(() => {}, []);

  const onPurchaseItemRequest = useCallback(
    (...parameters: ReactUnityEventParameter[]) => {
      console.log(parameters);
      try {
        const {
          values: [{ txhash, price }], // Default txHash to null and price to 0.1 if not provided
        } = JSON.parse(parameters[0] as string);
        console.log(price, txhash, to);
        sendTransaction(to, price.toString(), txhash);
      } catch (error) {
        console.error("Failed to parse values", error);
      }
    },
    []
  );

  useEffect(() => {
    if (!isLoaded) return;

    addEventListener(
      GameEvents.REQUEST_WALLET_CONNECTION,
      onHandleUnityMessage
    );

    addEventListener(GameEvents.PURCHASE_ITEM_REQUEST, onPurchaseItemRequest);

    return () => {};
  }, [isLoaded, removeEventListener, addEventListener]);

  const sendTransaction = async (
    to: string,
    amount: string,
    message: string
  ) => {
    try {
      const payload = beginCell()
        .storeUint(0, 32)
        .storeStringTail(message)
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
