import React, { createContext, useContext, useEffect } from "react";
import { useUnityContext } from "react-unity-webgl";
import { Address, beginCell, toNano } from "@ton/core";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { GameEvents } from "@/constant";
import { useTonConnect } from "@/hooks/useTonConnect";

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

  const onRequestWalletConnection = () => {};

  const onPurchaseItemRequest = () => {};

  const onRequestBackToHomePage = () => {};

  useEffect(() => {
    addEventListener(
      GameEvents.REQUEST_WALLET_CONNECTION,
      onRequestWalletConnection
    );

    addEventListener(
      GameEvents.REQUEST_BACK_TO_HOMEPAGE,
      onRequestBackToHomePage
    );

    addEventListener(GameEvents.PURCHASE_ITEM_REQUEST, onPurchaseItemRequest);

    return () => {
      removeEventListener("GameOver", () => {});
    };
  }, [removeEventListener, addEventListener]);

  const { sender, connected } = useTonConnect();

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

  const { initDataRaw } = retrieveLaunchParams();
  console.log(initDataRaw);

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
