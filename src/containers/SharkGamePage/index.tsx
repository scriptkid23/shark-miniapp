import GameArena from "@/components/GameArena";
import { codeUrl, dataUrl, frameworkUrl, loaderUrl } from "@/config";
import UnityBridgeProvider from "@/libs/unity/UnityBridgeContext";

export default function SharkGamePage() {
  return (
    <UnityBridgeProvider
      dataUrl={dataUrl}
      codeUrl={codeUrl}
      frameworkUrl={frameworkUrl}
      loaderUrl={loaderUrl}
    >
      <GameArena />
    </UnityBridgeProvider>
  );
}
