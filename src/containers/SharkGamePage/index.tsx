import GameArena from "@/components/GameArena";
import UnityBridgeProvider from "@/libs/unity/UnityBridgeContext";

export default function SharkGamePage() {
  return (
    <UnityBridgeProvider
      dataUrl={import.meta.env.VITE_UNITY_DATA_URL}
      codeUrl={import.meta.env.VITE_UNITY_CODE_URL}
      frameworkUrl={import.meta.env.VITE_UNITY_FRAMEWORK_URL}
      loaderUrl={import.meta.env.VITE_UNITY_LOADER_URL}
    >
      <GameArena />
    </UnityBridgeProvider>
  );
}
