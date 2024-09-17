import React from "react";
import SharkLogo from "@/assets/icons/shark_icon.svg";

type LoadingProps = {
  progress: number;
};

function Loading({ progress }: LoadingProps) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <img src={SharkLogo} alt="Loading" />
      <div className="mt-4 text-white">
        Loading... {Math.round(progress * 100)}%
      </div>
    </div>
  );
}

export default Loading;
