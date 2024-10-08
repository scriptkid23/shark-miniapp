import { Sender, SenderArguments } from "@ton/core";
import { CHAIN } from "@tonconnect/protocol";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
  network: CHAIN | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  console.log(wallet);
  return {
    sender: {
      send: async (args: SenderArguments) => {
        try {
          await tonConnectUI.sendTransaction({
            messages: [
              {
                address: args.to.toString({ bounceable: false }),
                amount: args.value.toString(),
                payload: args.body?.toBoc().toString("base64") || "",
              },
            ],
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
          });
        } catch (error) {
          throw new Error(`Failed to send transaction`);
        }
      },
    },
    connected: !!wallet?.account.address,
    wallet: wallet?.account.address ?? null,
    network: wallet?.account.chain ?? null,
  };
}
