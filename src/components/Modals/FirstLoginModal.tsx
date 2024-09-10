'use client';

import { useSharkStore } from '@/stores/shark_store';
import { Dialog } from '@radix-ui/themes';
import { useState } from 'react';
import WarningLogin from '@/assets/images/warning-login.png';

export const FirstLoginModal = () => {
  const { isFirstLogin, setIsFirstLogin } = useSharkStore((state) => state);
  return (
    <Dialog.Root open={isFirstLogin} onOpenChange={(state) => setIsFirstLogin(state)}>
      <Dialog.Content
        maxWidth="300px"
        className="bg-[#FFCC00] rounded-3xl border-[#0E2454] shadow-none border-[8px] p-0"
      >
        <Dialog.Title className="text-center font-rubikBold mt-1 text-[#0E2454] text-[40px] font-bold uppercase">
          Warning!
        </Dialog.Title>
        <Dialog.Description size="2" m="2">
          <div className="flex justify-center items-center">
            <img src={WarningLogin} alt="warning-login" />
          </div>
          <p className="font-rubikBold text-center mt-4 text-[#0E2454] text-[28px] font-bold uppercase leading-tight">
            A Hungry Shark
            <br />
            In The Arena
          </p>
          <p className="font-rubik text-xl font-bold text-center text-[#0E2454] leading-5 uppercase">
            Seize 5000 $BAITS and start the wild hunt
          </p>
          <div className="flex justify-center items-center">
            <button
              className="w-[234px] font-interSemiBold mx-auto bg-[#0E2454] text-[#FFCC00] text-sm font-medium py-3 rounded-xl mt-4"
              onClick={() => setIsFirstLogin(false)}
            >
              Claim
            </button>
          </div>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
};
